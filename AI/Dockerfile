FROM python:3.10
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE $PORT
CMD gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app