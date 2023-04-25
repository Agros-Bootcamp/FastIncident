from typing import List
from pydantic import BaseModel

class Task(BaseModel):
    fk_id_user:str
    title_task:str
    description_task:str
    status_task:str
    start_date_task:str
    end_date_task:str
    priority_task:str
    development_HH:int
    reward_task:int
    limit_incidents:int

class UpdateRequest(BaseModel):
    field:str
    payload:str

class Method(BaseModel):
    all:str
    byPK:str
    byField:str
