from fastapi import FastAPI
import uvicorn
import pickle
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
class MailMessage(BaseModel):
    message:str

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = pickle.load(open('model.pkl','rb'))
vectorizer = pickle.load(open('vectorizer.pkl','rb'))
@app.get('/')
def index():
    return {'message':'Hello,stranger'}

@app.get('/{name}')
def get_name(name:str):
    return {'welcome':f'{name}'}

@app.post('/predict')
def predict(data:MailMessage):
    data = data.dict()
    print(data)
    message = data['message']
    feature = vectorizer.transform([message])
    pred = model.predict(feature)
    if(pred[0]>0.5):
        pred = 1
    else:
        pred = 0
    return {
        'prediction':pred
    }


if __name__ == "__main__":
    uvicorn.run(app,host='127.0.0.1',port=8000)
    pass