from fastapi import FastAPI , Request
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware
import os 
stage = os.getenv('STAGE',"devStage")
app = FastAPI()
origins = [
    "*",
    "http://localhost:4000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "from fastapi newww "}

@app.get("/app")
def read_main(request: Request):
    return {"message": "Hello World", "root_path": request.scope.get("root_path")}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

handler = Mangum(app, lifespan="off")