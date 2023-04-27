from fastapi import FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from schemas import Task, UpdateRequest
from typing import Optional
import uvicorn
import requests

app=FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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


@app.get('/tasks', status_code=status.HTTP_202_ACCEPTED)
def get_all():
    r = requests.get('http://localhost:4001/tasks/all')
    return r.json()
#ByField
@app.get('/tasks/byField', status_code=status.HTTP_202_ACCEPTED)
def get_by_method(field:str, payload:str ):
    r = requests.get('http://localhost:4001/tasks/byField',json={"field":field,"payload":payload})
    return r.json()

@app.get('/tasks/{pk}', status_code=status.HTTP_202_ACCEPTED)
def get_by_pk(pk:str):
    r = requests.get('http://localhost:4001/tasks/byPK',json={"pk_id_task":pk})
    return r.json()

@app.get('/tasks/allByFk/{payload}', status_code=status.HTTP_202_ACCEPTED)
def get_by_method( payload:str ):
    r = requests.get('http://localhost:4001/tasks/allByFk',json={"field":"fk_id_user","payload":payload})
    return r.json()

@app.post('/tasks/create', status_code=status.HTTP_201_CREATED)
def create_task(request:Task, auth: Optional[str]=Header(None),     Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    r = requests.post('http://localhost:4001/tasks/default', json=request.dict())
    return r.json()

@app.patch('/tasks/update/{pk}', status_code=status.HTTP_202_ACCEPTED)
def update_task(request:UpdateRequest, pk:str, Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    data = {request.field:request.payload}

    r = requests.put('http://localhost:4001/tasks/default', json=dict(data,**{"pk_id_task":pk}))
    return r.json()

@app.delete('/tasks/delete/{pk}', status_code=status.HTTP_202_ACCEPTED)
def destroy_task(pk:str,Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    r = requests.delete('http://localhost:4001/tasks/default', json={"pk_id_task":pk})
    return r.json()

@app.post('/test', status_code=status.HTTP_202_ACCEPTED)
def test(Authorization:Optional[str]=Header(None)):
    result = validate(Authorization)
    if not result.json():
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Token vencido')
    return 'no'

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)