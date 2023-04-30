from fastapi import APIRouter, status, HTTPException, Header
from typing import Optional
import requests
from schemas import Task

from schemas import UpdateRequest

router = APIRouter(
    tags=['AuthRequests']
)



@router.post('/tasks/create', status_code=status.HTTP_201_CREATED)
def create_task(request:Task):
    r = requests.post('http://localhost:4001/tasks/default', json=request.dict())
    return r.json()

@router.patch('/tasks/update/{pk}', status_code=status.HTTP_202_ACCEPTED)
def update_task(request:UpdateRequest, pk:str):
    data = {request.field:request.payload}
    r = requests.put('http://localhost:4001/tasks/default', json=dict(data,**{"pk_id_task":pk}))
    return r.json()

@router.delete('/tasks/delete/{pk}', status_code=status.HTTP_202_ACCEPTED)
def destroy_task(pk:str):
    r = requests.delete('http://localhost:4001/tasks/default', json={"pk_id_task":pk})
    return r.json()

@router.post('/test', status_code=status.HTTP_202_ACCEPTED)
def test():
    return 'no'