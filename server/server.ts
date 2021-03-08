import http from 'http';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import logger from 'morgan';
import DBContext from './layers/dataAccess/DBContext';
import routes from './routes';

const { 
  NODE_ENV, 
  PORT = 3000, 
  DB_PROTOCOL = 'mongodb',
  DB_HOST = '127.0.0.1',
  DB_PORT = 27017,
  DB_NAME
} = process.env;

DBContext.connect(`${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .catch(console.error);

const isProd = NODE_ENV === 'production';
const port = PORT;

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (isProd) {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

routes(app);

const server = http.createServer(app);
server.listen(port, () => {
  console.log('server listening on port', port);
});
