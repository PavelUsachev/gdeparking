from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Zone
from app.services.base import CRUDBase


class CRUDZone(CRUDBase):

    async def update_zones(
            self, camera_input,
            camera_id,
            session: AsyncSession
    ):
        data = camera_input.dict()
        input_zones = data['detection_result']
        zones_result = []
        for key, value in input_zones.items():
            zone_id = int(key.split('_')[-1])
            zone = await session.execute(
                select(self.model).where(
                    and_(
                        self.model.camera_id == camera_id,
                        self.model.internal_id == zone_id
                    )
                )
            )
            zone = zone.scalars().first()
            if zone:
                setattr(zone, 'status', value)
                session.add(zone)
                zones_result.append(zone)
            else:
                db_zone = self.model(
                    internal_id=zone_id,
                    status=value,
                    camera_id=camera_id
                )
                session.add(db_zone)
                zones_result.append(db_zone)
        await session.commit()
        return zones_result


zone_crud = CRUDZone(Zone)
