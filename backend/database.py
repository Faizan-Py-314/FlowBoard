from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy import create_engine

SQLALCHEMY_BASE_URL = 'sqlite:///./database.db'

engine = create_engine(SQLALCHEMY_BASE_URL, connect_args={'check_same_thread': False})
SessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    with SessionLocal() as session:
        yield session
