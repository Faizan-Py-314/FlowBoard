from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import users

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(users.router, prefix='/api/users', tags=['users'])

origins = [
    'http://localhost:5173',
    'https://localhost:5173',
    'http://192.168.100.31:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=['*'],
    allow_methods=['*']
)
