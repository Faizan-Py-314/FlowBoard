from datetime import datetime, UTC
from zoneinfo import ZoneInfo
from typing import List
from sqlalchemy import Integer, String, Text, JSON, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    username: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    hash_password: Mapped[str] = mapped_column(String(200), nullable=False)

    projects: Mapped[List[Project]] = relationship(back_populates='owner', cascade='all, delete-orphan')

class Project(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, unique=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    requirements: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    tags: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=[])
    last_change: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC).astimezone(ZoneInfo("Asia/Karachi")))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC).astimezone(ZoneInfo("Asia/Karachi")))

    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )

    owner: Mapped[User] = relationship(back_populates='projects')
