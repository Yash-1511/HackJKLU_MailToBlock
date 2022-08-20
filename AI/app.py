from fastapi import FastAPI
import uvicorn
import pickle
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from pydantic import BaseModel
from tensorflow.keras.preprocessing.sequence import pad_sequences
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

model = tf.keras.models.load_model('model.h5')
tokenizer = pickle.load(open('tokenizer.pkl','rb'))
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
    token_message =  tokenizer.texts_to_sequences(message)
    sms_pad = pad_sequences(token_message,maxlen=20,padding='post')
    pred = model.predict(sms_pad)
    if(pred[0]>0.5):
        pred = 1
    else:
        pred = 0
    return {
        'prediction':pred
    }


if __name__ == "__main__":
    # uvicorn.run(app,host='127.0.0.1',port=8000)
    pass