from pydantic import BaseModel

class Client(BaseModel):
    name: str
    industry: str
    contact: str