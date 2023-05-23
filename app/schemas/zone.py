from pydantic import BaseModel, Extra


class ZoneToFront(BaseModel):
    internal_id: int
    status: int
    # FIXME! вот тут добавили полей, удалить при поломке
    long: float
    lat: float

    class Config:
        extra = Extra.ignore
