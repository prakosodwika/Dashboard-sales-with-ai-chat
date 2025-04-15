from pydantic import BaseModel
from enums import DealStatus

class Deal(BaseModel):
    client: str
    value: int
    status: DealStatus