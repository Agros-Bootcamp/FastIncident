from pydantic import BaseModel

class Incident(BaseModel):
    title_incident:str
    description_incident:str
    start_date_incident:str
    end_date_incident:str
    status_incident:str
    fk_id_type_incident:str
    fk_id_task:str
    
class UpdateRequest(BaseModel):
    field:str
    payload:str