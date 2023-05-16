from fastapi import APIRouter

from app.api.endpoints import camera_router


main_router = APIRouter()
main_router.include_router(
    camera_router,
    prefix='/camera',
    tags=['CameraInput']
)
