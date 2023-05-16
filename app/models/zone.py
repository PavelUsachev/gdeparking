from sqlalchemy import Boolean, Column, ForeignKey, Integer

from app.core.db import Base


class Zone(Base):
    camera_id = Column(Integer, ForeignKey('camera.id'))
    internal_id = Column(Integer, nullable=False)
    status = Column(Boolean, default=False)
