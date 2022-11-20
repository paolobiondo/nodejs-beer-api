# nodejs-beer-api

Technology: NodeJS with ExpressJS  \
Database: MySQL  \
ORM: typeorm

1) create an .env file inside the folder /server with this code:
```
PORT = 3000
DB_HOST = 127.0.0.1
DB_PORT = 8889
DB_USER = beer
DB_PASSWORD = beer
DB_NAME = beer
DB_DOCKER_PORT=3306
DB_LOCAL_PORT=3307
DB_DOCKER_USER=root
DB_DOCKER_PASSWORD=beer
DB_DOCKER_NAME=beer
```
3) go to /server folder 
4) run the following code: npm install
2) run the APIs:
- docker (test automatically): docker-compose up
- to test it: npm test
- to run api server: npm start

## Run APIs
- Add beer 
```
curl -X POST -d 'name=bionda' localhost:3000/api/v1/beer/add
```
- Add prodution
```
curl -X POST -d 'name=bionda' -d 'liters=4' -d 'day=2022-11-20' localhost:3000/api/v1/production/add
```
- Get prodution results
```
curl -X GET "localhost:3000/api/v1/production/results?type=bionda&startDay=2022-11-18&endDay=2022-11-21"

```
- Get best production days
```
curl -X GET "localhost:3000/api/v1/production/best-days?type=bionda&startDay=2022-11-18&endDay=2022-11-21"

```
