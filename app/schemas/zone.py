from pydantic import BaseModel, Extra


class ZoneToFront(BaseModel):
    internal_id: int
    status: int
    # FIXME! вот тут добавили полей, удалить при поломке
    long: float = None
    lat: float = None

    class Config:
        extra = Extra.ignore
