from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer

from app.core.db import Base


class Zone(Base):
    camera_id = Column(Integer, ForeignKey('camera.id'))
    internal_id = Column(Integer, nullable=False)
    status = Column(Boolean, default=False)
    # FIXME! вот тут добавили поля, удалить при поломке
    long = Column(Float, default=0)
    lat = Column(Float, default=0)
