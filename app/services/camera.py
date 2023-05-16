from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Camera
from app.services.base import CRUDBase
from app.services.utils import input_to_model_converter


class CRUDCamera(CRUDBase):

    async def get_object(self, input_obj, session: AsyncSession):
        data = input_obj.dict()
        obj = await session.execute(
            select(self.model).where(
                self.model.id == data['metadata']['cam_id']
            )
        )
        obj = obj.scalars().first()
        return obj

    async def create(self, input_obj, session: AsyncSession):
        data = input_obj.dict()
        new_obj = input_to_model_converter(data)
        db_save = self.model(**new_obj)
        session.add(db_save)
        await session.commit()
        await session.refresh(db_save)
        return db_save

    async def update(self, input_obj, exist_obj, session: AsyncSession):
        new_data = input_obj.dict()
        db_obj = jsonable_encoder(exist_obj)

        new_obj = input_to_model_converter(new_data)

        for field in db_obj:
            if field in new_obj:
                setattr(exist_obj, field, new_obj[field])
        session.add(exist_obj)
        await session.commit()
        await session.refresh(exist_obj)
        return exist_obj


camera_crud = CRUDCamera(Camera)
