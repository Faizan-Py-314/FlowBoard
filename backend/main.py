from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import users, projects

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(users.router, prefix='/api/users', tags=['users'])
app.include_router(projects.router, prefix='/api/projects', tags=['Projects'])

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
