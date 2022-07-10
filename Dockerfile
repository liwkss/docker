
FROM python:3.7-alpine 

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt 

## test with non-root user cause heroku ... 
## deploys with non-root user
## for ubuntu (non-alpine) to run app as other user- non-root
# RUN adduser -m appuser
## for alpine to run app as other user- non-root
RUN adduser -D appuser
USER appuser

# EXPOSE 5000

# ENV PORT 5000

# ENTRYPOINT gunicorn run:app --bind :$PORT
CMD gunicorn run:app --bind 0.0.0.0:$PORT
# CMD python run.py
