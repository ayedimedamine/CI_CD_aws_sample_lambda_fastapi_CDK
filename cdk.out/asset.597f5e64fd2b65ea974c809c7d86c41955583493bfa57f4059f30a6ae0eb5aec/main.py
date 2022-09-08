from fastapi import FastAPI
from fastapi.responses import JSONResponse
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware
import os 
from routes import exemple
stage = os.getenv('STAGE',"")
app = FastAPI(openapi_prefix=f"/{stage}",description="Fast API Test application on aws", title="Serverless backend On AWS" )
origins = [
    "*",
    "http://localhost:4000",
]
app.include_router(exemple.router, prefix="/exemple")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=['MAIN'], response_class=JSONResponse)
async def root():
    return {"message": f"test API for {stage}"}


handler = Mangum(app, lifespan="off")