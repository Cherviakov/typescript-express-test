import { Application } from 'express';
import { basic, jwt } from '../middlewares';
import ping from './ping';
import auth from './auth';
import todo from './todo';

export default (app:Application):void => {
  app.use('/ping', basic.ping, ping);
  app.use('/auth', auth);
  app.use('/todo', jwt, todo); 
}
