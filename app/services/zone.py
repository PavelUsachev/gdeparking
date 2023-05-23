from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.data.coordiantes import COORDINATES
from app.models import Zone
from app.services.base import CRUDBase
from app.services.utils import split


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
            if zone.internal_id in zones_internal_ids:
                id_index = zones_internal_ids.index(zone.internal_id)
                input_id = 'zone_' + str(zones_internal_ids.pop(id_index))
                setattr(zone, 'status', input_zones[input_id])
                #FIXME! вот тут вызвали метод, удалить при поломке
                zone = self._enrich_with_coords(zone, session)
                session.add(zone)
            else:
                await session.delete(zone)
        for zone_id in zones_internal_ids:
            input_id = 'zone_' + str(zone_id)
            db_zone = self.model(
                internal_id=zone_id,
                status=bool(input_zones[input_id]),
                camera_id=camera_id
            )
            # FIXME! вот тут вызвали метод, удалить при поломке
            session.add(self._enrich_with_coords(db_zone, session))
            # session.add(db_zone)
        await session.commit()

    async def _enrich_with_coords(self, zone, session):
        if zone.long != 0 and zone.lat != 0:
            return zone
        coord_camera = COORDINATES.get(zone.camera_id)
        if coord_camera is None:
            return zone
        coord_zone = coord_camera.get(zone.id)
        if coord_zone:
            zone.long = coord_zone.get('long', 0)
            zone.lat = coord_zone.get('lat', 0)
            session.add(zone)
            await session.commit()
            await session.refrest(zone)
        return zone




zone_crud = CRUDZone(Zone)
