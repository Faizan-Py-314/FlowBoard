from datetime import datetime, UTC
from zoneinfo import ZoneInfo
from typing import List, Optional
from sqlalchemy import Integer, String, Boolean, Text, JSON, ForeignKey, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    username: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    hash_password: Mapped[str] = mapped_column(String(200), nullable=False)

    projects: Mapped[List[Project]] = relationship(back_populates='owner', cascade='all, delete-orphan')

class Project(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
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
    features: Mapped[List['Feature']] = relationship(back_populates='project', cascade='all, delete-orphan')

class Feature(Base):
    __tablename__ = 'features'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    isComplete: Mapped[bool] = mapped_column(Boolean, default=False)

    project_id: Mapped[int] = mapped_column(
        ForeignKey('projects.id', ondelete='CASCADE'),
        nullable=False,
    )

    __table_args__ = (
        Index('ix_feature_project_complete', 'project_id', 'isComplete'),
    )

    project: Mapped[Project] = relationship(back_populates='features')
    tasks: Mapped[List['Task']] = relationship(back_populates='feature', cascade='all, delete-orphan')

    

class Task(Base):
    __tablename__ = 'tasks'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    task: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True, default=None)
    isComplete: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    subTasks: Mapped[List[dict]] = mapped_column(JSON, nullable=False, default=list)

    feature_id: Mapped[int] = mapped_column(
        ForeignKey('features.id', ondelete='CASCADE'),
        nullable=False,
    )

    __table_args__ = (
        Index('ix_task_feature_complete', 'feature_id', 'isComplete'),
    )

    feature: Mapped[Feature] = relationship(back_populates='tasks')