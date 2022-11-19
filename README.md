# nodejs-beer-api

Technology: NodeJS with ExpressJS  \
Database: MySQL  \
ORM: typeorm

1) create an .env file inside the folder server with this code:
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
2) run the code:
- docker (test automatically): docker-compose up
- to test it: npm test
- to run api server: npm start