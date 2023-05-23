FROM python:3.9-slim
WORKDIR /src
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt --no-cache-dir
COPY app/ app/
COPY alembic/ alembic/
COPY alembic.ini .
COPY alembic.ini .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]