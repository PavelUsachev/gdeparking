from pydantic import BaseModel, Extra


class ZoneToFront(BaseModel):
    internal_id: int
    status: int

    class Config:
        extra = Extra.ignore
