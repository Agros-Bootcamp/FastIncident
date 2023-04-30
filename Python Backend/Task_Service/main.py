from fastapi import FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import authRequests, getRequest
from typing import Optional
import requests
from starlette.requests import Request

from typing import Annotated

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

app.include_router(getRequest.router)

@app.middleware("http")
async def validate_user( request:Request,call_next):
    response = await call_next(request)
    try:
        x = request.headers["Authorization"]
        result = validate(x)
        print(result)
        return response
    except:
        print('error')
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN)

app.include_router(authRequests.router)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)