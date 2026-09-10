from typing import Annotated

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
import models
from auth import CurrentUser
from schemas import FeatureCreate, FeatureResponse

router = APIRouter()

def get_project_or_403(project_id: int, current_user: CurrentUser, db: Annotated[Session, Depends(get_db)]) -> models.Project:
    result = db.execute(select(models.Project).where(models.Project.id == project_id))
    project = result.scalars().first()

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Project Not Found')

    if project.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not allow to create feature in this Project')

    return project


@router.post('/{project_id}', response_model=FeatureResponse, status_code=status.HTTP_201_CREATED)
def create_feature(feature: FeatureCreate, project: Annotated[models.Project, Depends(get_project_or_403)], db: Annotated[Session, Depends(get_db)]):

    new_feature = models.Feature(
        name = feature.name,
        description = feature.description,
        project_id = project.id
    )

    db.add(new_feature)
    db.commit()
    db.refresh(new_feature)

    return new_feature

@router.get('/{project_id}/{feature_id}', response_model=FeatureResponse)
def get_feature(feature_id: int, project: Annotated[models.Project, Depends(get_project_or_403)], db:Annotated[Session, Depends(get_db)]):

    result = db.execute(select(models.Feature).where(models.Feature.id == feature_id))
    feature = result.scalars().first()

    if not feature or feature.project_id != project.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Feature Not Found')

    return feature


@router.get('/{project_id}', response_model=list[FeatureResponse])
def get_all_features(project: Annotated[models.Project, Depends(get_project_or_403)]):
    return project.features

