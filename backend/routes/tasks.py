from typing import Annotated

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
import models
from auth import CurrentUser
from schemas import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter()

def get_feature_or_403(project_id:int, feature_id:int, current_user:CurrentUser, db:Annotated[Session, Depends(get_db)]) -> models.Feature:
    result = db.execute(select(models.Project).where(models.Project.id == project_id))
    project = result.scalars().first()

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Access denied')

    if project.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Access denied')

    result = db.execute(select(models.Feature).where(models.Feature.id == feature_id))
    feature = result.scalars().first()

    if not feature or feature.project_id != project.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Feature Not Found')

    return feature

@router.post('/{project_id}/{feature_id}', response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate, feature: Annotated[models.Feature, Depends(get_feature_or_403)], db:Annotated[Session, Depends(get_db)]):

    new_task = models.Task(
        task = task.task,
        description = task.description,
        subTasks = [st.model_dump() for st in task.subTasks],
        feature_id = feature.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.get('/{project_id}/{feature_id}/{task_id}', response_model=TaskResponse)
def get_task(task_id:int, feature: Annotated[models.Feature, Depends(get_feature_or_403)], db:Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.Task).where(models.Task.id == task_id))
    task = result.scalars().first()

    if not task or task.feature_id != feature.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task Not Found.')

    return task

@router.patch('/{project_id}/{feature_id}/{task_id}', response_model=TaskResponse)
def update_task(task_id:int, task_data:TaskUpdate, feature: Annotated[models.Feature, Depends(get_feature_or_403)], db:Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.Task).where(models.Task.id == task_id))
    task = result.scalars().first()

    if not task or task.feature_id != feature.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task Not Found.')

    updated_data = task_data.model_dump(exclude_unset=True)
    for field, value in updated_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)

    return task


@router.get('/{project_id}/{feature_id}', response_model=list[TaskResponse])
def get_all_tasks(feature: Annotated[models.Feature, Depends(get_feature_or_403)]):
    return feature.tasks

