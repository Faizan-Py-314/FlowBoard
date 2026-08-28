from fastapi import FastAPI
from database import engine, Base
from routes import users

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router, prefix='/api/users', tags=['users'])
