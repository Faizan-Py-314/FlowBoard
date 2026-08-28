from datetime import datetime, timedelta, UTC
from typing import Annotated

from fastapi import HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
import jwt
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer

from config import settings
import models
from database import get_db

password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer('/api/users/token')

def hash_password(password: str) -> str:
    return password_hash.hash(password)

def verify_password(plan_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plan_password, hashed_password)

def create_access_token(data: dict, expire_delta: timedelta) -> str:
    encode_to = data.copy()

    if expire_delta:
        expire = datetime.now(UTC) + expire_delta
    else:
        expire = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)

    encode_to.update({'exp': expire})
    encode_jwt = jwt.encode(
        encode_to,
        settings.secret_key.get_secret_value(),
        settings.algorithm
    )

    return encode_jwt

def verify_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(
            token,
            settings.secret_key.get_secret_value(),
            settings.algorithm,
            options={'require':['exp', 'sub']}
        )
    except jwt.InvalidTokenError:
        return None

    return payload.get('sub')

def get_current_user(db: Annotated[Session, Depends(get_db)], token: Annotated[str, Depends(oauth2_scheme)]):
    user_id = verify_access_token(token)

    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invailed or expired token", headers={'WWW-Authenticate':'Bearer'})

    try:
        user_id_int = int(user_id)
    except (ValueError, TypeError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invailed or expired token", headers={'WWW-Authenticate':'Bearer'})

    result = db.execute(select(models.User).where(models.User.id == user_id_int))
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invailed or expired token", headers={'WWW-Authenticate':'Bearer'})

    return user

CurrentUser = Annotated[models.User, Depends(get_current_user)]
