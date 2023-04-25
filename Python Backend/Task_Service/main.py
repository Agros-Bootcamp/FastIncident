from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from schemas import Task, UpdateRequest
import uvicorn
import requests

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/tasks')
def get_all():
    r = requests.get('http://localhost:4001/tasks/all')
    return r.json()
#ByField
@app.get('/tasks/byField/{field}/{payload}')
def get_by_method(field:str, payload:str ):
    r = requests.get('http://localhost:4001/tasks/byField',json={"field":field,"payload":payload})
    return r.json()

@app.get('/tasks/{pk}')
def get_by_pk(pk:str):
    r = requests.get('http://localhost:4001/tasks/byPK',json={"pk_id_task":pk})
    return r.json()

@app.post('/tasks/create')
def create_task(request:Task):
    r = requests.post('http://localhost:4001/tasks/default', json=request.dict())
    return r.json()

@app.patch('/tasks/update/{pk}')
def update_task(request:UpdateRequest, pk:str):
    
    data = {request.field:request.payload}

    r = requests.put('http://localhost:4001/tasks/default', json=dict(data,**{"pk_id_task":pk}))
    return r.json()

@app.delete('/tasks/delete/{pk}')
def destroy_task(pk:str):
    r = requests.delete('http://localhost:4001/tasks/default', json={"pk_id_task":pk})
    return r.json()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)