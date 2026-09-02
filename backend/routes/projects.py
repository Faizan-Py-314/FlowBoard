from typing import Annotated

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
import models
from auth import CurrentUser
from schemas import Project, ProjectResponse

router = APIRouter()

@router.post('', response_model=ProjectResponse)
def create_project(project: Project, current_user: CurrentUser, db: Annotated[Session, Depends(get_db)]):

    new_project = models.Project(
        name = project.name,
        description = project.description,
        requirements = project.requirements,
        tags = project.tags,
        user_id = current_user.id
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project

@router.get('', response_model=list[ProjectResponse])
def get_projects(current_user: CurrentUser, db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.Project).where(models.Project.user_id == current_user.id))
    projects = result.scalars().all()

    if not projects:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Projects Not Found")

    return projects

@router.get('/{project_id}', response_model=ProjectResponse)
def get_project(curren_user: CurrentUser, project_id: int, db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.User).where(models.User.id == curren_user.id))
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User Not Found')

    result = db.execute(select(models.Project).where(models.Project.id == project_id))
    project = result.scalars().first()

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project Not Found")

    return project
    
