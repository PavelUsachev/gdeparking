from datetime import datetime
from typing import Union

from sqlalchemy.ext.asyncio import AsyncSession


class CRUDBase:

    def __init__(self, model):
        self.model = model

    async def get_all_objects(self, session: AsyncSession):
        pass

    async def get_by_attr(
            self,
            attr: str,
            attr_value: Union[str, int, bool, datetime],
            session: AsyncSession
    ):
        pass
