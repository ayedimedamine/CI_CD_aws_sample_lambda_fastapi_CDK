from fastapi import APIRouter


router = APIRouter(tags=["exemple"])


@router.get("/")
def get_exemple():
    return {"message" : "good to see you!"}