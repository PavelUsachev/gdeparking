FROM python:3.10-slim-buster

RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /car_detect

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "car_detect.py"]