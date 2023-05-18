from fastapi import APIRouter, Depends, Request, Body
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.services.camera import camera_crud
from app.services.zone import zone_crud
from app.schemas.camera import CameraInput

router = APIRouter()


@router.post('/')
async def camera_input(
        camera: CameraInput,
        session: AsyncSession = Depends(get_async_session),
):
    existing_camera = await camera_crud.get_object(camera, session)
    if existing_camera:
        updated_camera = await camera_crud.update(
            camera, existing_camera, session
        )
        await zone_crud.update_zones(camera, updated_camera.id, session)
        return updated_camera
    new_camera = await camera_crud.create(camera, session)
    await zone_crud.update_zones(camera, new_camera.id, session)
    return new_camera


@router.get('/all')
async def get_all_cameras(session: AsyncSession = Depends(get_async_session)):
    return await camera_crud.get_all_objects_with_zones(session)


@router.get('/{camera_id}')
async def get_camera(
        camera_id: int,
        session: AsyncSession = Depends(get_async_session),
):
    return await camera_crud.get_by_id(camera_id, session)
