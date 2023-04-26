from fastapi import FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from schemas import Incident, UpdateRequest
import uvicorn
from typing import Optional
import requests

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def validate(header:str):
    token = header.split(' ')[1]
    r = requests.post('http://localhost:4002/validate/', json={
        "token":token,
        "role":"Administrador"
    })
    return r

@app.get('/incidents', status_code=status.HTTP_202_ACCEPTED)
def get_all():
    r = requests.get('http://localhost:4001/incidents/all')
    return r.json()
#ByField
@app.get('/incidents/byField/{field}/{payload}', status_code=status.HTTP_202_ACCEPTED)
def get_by_method(field:str, payload:str ):
    r = requests.get('http://localhost:4001/incidents/byField',json={"field":field,"payload":payload})
    return r.json()

@app.get('/incidents/{pk}', status_code=status.HTTP_202_ACCEPTED)
def get_by_pk(pk:str, Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    r = requests.get('http://localhost:4001/incidents/byPK',json={"pk_id_task":pk})
    return r.json()

@app.post('/incidents/create', status_code=status.HTTP_202_ACCEPTED)
def create_task(request:Incident, Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    r = requests.post('http://localhost:4001/incidents/default', json=request.dict())
    return r.json()

@app.patch('/incidents/update/{pk}', status_code=status.HTTP_202_ACCEPTED)
def update_task(request:UpdateRequest, pk:str, Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    data = {request.field:request.payload}

    r = requests.put('http://localhost:4001/incidents/default', json=dict(data,**{"pk_id_incidents":pk}))
    return r.json()

@app.delete('/tasks/delete/{pk}', status_code=status.HTTP_202_ACCEPTED)
def destroy_task(pk:str, Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    r = requests.delete('http://localhost:4001/incidents/default', json={"pk_id_incidents":pk})
    return r.json()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5001)