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

