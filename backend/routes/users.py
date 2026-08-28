from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
import models
from schemas import UserCreate, UserResponse

router = APIRouter()

@router.post('', response_model=UserResponse)
def create_user(user: UserCreate, db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.User).where(models.User.username == user.username))
    user_exist = result.scalars().first()

    if user_exist:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username Already Exist")

    result = db.execute(select(models.User).where(models.User.email == user.email))
    email_exist = result.scalars().first()

    if email_exist:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exist")

    new_user = models.User(
        name = user.name,
        username = user.username,
        email = user.email,
        hash_password = user.hash_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get('/{user_id}', response_model=UserResponse)
def get_user(user_id: int, db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not Found")

    return user

