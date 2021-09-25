FROM python:3.7-slim

ENV PYTHONUNBUFFERED 1
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN apt-get update -y && apt-get install gcc git -y

RUN pip install poetry

RUN mkdir /code
ADD . /code/
WORKDIR /code

RUN poetry config virtualenvs.create false 
RUN poetry install

EXPOSE 8000