from time import sleep
from fastapi import FastAPI , Request, BackgroundTasks
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware
import os 

stage = os.getenv('STAGE',"devStage")
app = FastAPI(openapi_url=f"/{stage}/openapi.json")
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
def slp(time:int):
    sleep(time)
    print("done")
@app.get("/")
async def read_root(tasks : BackgroundTasks):
    tasks.add_task(slp,3)
    return {"Hello": "from fastapi newww "}
@app.get("/a")
def read_root2():
    return {"Hello": "from fastapi newww "}
@app.get("/app")
async def read_main(request: Request):
    return {"message": "Hello World", "root_path": request.scope.get("root_path")}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

handler = Mangum(app, lifespan="off")