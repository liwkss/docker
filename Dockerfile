FROM python:3-alpine

RUN mkdir -p /app
WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

# Expose the Flask port
EXPOSE 5000

CMD [ "python", "./app.py" ]
