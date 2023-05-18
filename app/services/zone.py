from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Zone
from app.services.base import CRUDBase


def split(key):
    return int(key.split('_')[-1])


class CRUDZone(CRUDBase):

    async def update_zones(
            self, camera_input,
            camera_id,
            session: AsyncSession
    ):
        data = camera_input.dict()
        input_zones = data['detection_result']
        zones_internal_ids = list(map(split, input_zones.keys()))
        existing_zones = await session.execute(
            select(self.model).where(
                self.model.camera_id == camera_id
            )
        )
        existing_zones = existing_zones.scalars().all()
        for zone in existing_zones:
            if zone.id in zones_internal_ids:
                id_index = zones_internal_ids.index(zone.id)
                input_id = 'zone_' + str(zones_internal_ids.pop(id_index))
                setattr(zone, 'status', input_zones[input_id])
                session.add(zone)
            else:
                await session.delete(zone)
        for zone_id in zones_internal_ids:
            input_id = 'zone_' + str(zones_internal_ids.pop(zone_id))
            db_zone = self.model(
                internal_id=id,
                status=input_zones[input_id],
                camera_id=camera_id
            )
            session.add(db_zone)
        await session.commit()


zone_crud = CRUDZone(Zone)
