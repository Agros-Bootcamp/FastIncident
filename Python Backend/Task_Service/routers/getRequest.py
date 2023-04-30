from fastapi import APIRouter, status
import requests

router = APIRouter(
    tags=['GET']
)

@router.get('/tasks', status_code=status.HTTP_202_ACCEPTED)
def get_all():
    r = requests.get('http://localhost:4001/tasks/all')
    return r.json()
#ByField
@router.get('/tasks/byField', status_code=status.HTTP_202_ACCEPTED)
def get_by_method(field:str, payload:str ):
    r = requests.get('http://localhost:4001/tasks/byField',json={"field":field,"payload":payload})
    return r.json()

@router.get('/tasks/{pk}', status_code=status.HTTP_202_ACCEPTED)
def get_by_pk(pk:str):
    r = requests.get('http://localhost:4001/tasks/byPK',json={"pk_id_task":pk})
    return r.json()

@router.get('/tasks/allByFk/{payload}', status_code=status.HTTP_202_ACCEPTED)
def get_by_method( payload:str ):
    r = requests.get('http://localhost:4001/tasks/allByFk',json={"field":"fk_id_user","payload":payload})
    return r.json()

