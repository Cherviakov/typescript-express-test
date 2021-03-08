### Typescript express server

This is implementation of todo express server with typescript

### Tech stack

* NodeJS
* Typescript
* Webpack
* MongoDB
* Mongoose
* JWT
* ESLint

### Installation

You need to have latest stable nodeJS and
mongodb running. Then run following command:
```sh
npm i
```
packages will be installed and pair of keys will be
generated for jwt. Specify following env variables in
.env.yaml file:
```sh
PORT: 3000
DB_PROTOCOL: mongodb
DB_HOST: 127.0.0.1
DB_PORT: 27017
DB_NAME: "ts-todos"
BASIC_AUTH: '{
  "ping":{
    "Name": "hello",
    "Pass":"world"
  }
}'
JWT_PRIVATE_KEY: server-jwt 
JWT_PUBLIC_KEY: server-jwt.pub 
```
Then run
```sh
npm run build
npm start
```
to start server.

### Production

Not yet implemented

### Testing

Not yet implemented
