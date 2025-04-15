from pydantic import BaseModel
from typing import List
from .deal import Deal
from .client import Client

class Sales(BaseModel):
    id: int
    name: str
    role: str
    region: str
    skills: List[str]
    deals: List[Deal]
    clients: List[Client]