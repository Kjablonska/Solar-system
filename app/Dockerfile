FROM python:3.7
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]

# FROM mongo:latest
# RUN apt-get update && apt-get install -y python3 python3-pip
# RUN pip3 install pymongo
# EXPOSE 27017