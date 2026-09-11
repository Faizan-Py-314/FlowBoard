from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict, EmailStr, Field

class UserBase(BaseModel):
    name: str = Field(min_length=1)
    username: str = Field(min_length=1)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(min_length=8)

class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class Token(BaseModel):
    access_token: str
    token_type: str

class Project(BaseModel):
    name: str = Field(min_length=1)
    description: str = Field(min_length=1)
    requirements: List[str]
    tags: List[str]

class ProjectResponse(Project):
    model_config = ConfigDict(from_attributes=True)
    id: int
    last_change: datetime
    created_at: datetime

class ProjectUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1)
    description: str | None = Field(default=None, min_length=1)
    requirements: List[str] | None = Field(default=None)
    tags: List[str] | None = Field(default=None)

class Feature(BaseModel):
    name: str = Field(min_length=1)
    description: str = Field(min_length=1)

class FeatureCreate(Feature):
    pass

class FeatureResponse(Feature):
    model_config = ConfigDict(from_attributes=True)
    id: int
    project_id: int
    isComplete: bool

class FeatureUpdate(BaseModel):
    name: str | None = Field(default=None)
    description: str | None = Field(default=None)

class SubTask(BaseModel):
    subTask: str
    inComplete: bool = Field(default=False)

class Task(BaseModel):
    task: str = Field(min_length=1)
    description: str | None = Field(default=None)
    subTasks: List[SubTask] = Field(default=list)

class TaskCreate(Task):
    pass

class TaskResponse(Task):
    model_config = ConfigDict(from_attributes=True)
    id: int
    feature_id: int
    isComplete: bool

class TaskUpdate(BaseModel):
    task: str | None = Field(default=None)
    description: str | None = Field(default=None)
    subTasks: List[SubTask] | None = Field(default=None)

