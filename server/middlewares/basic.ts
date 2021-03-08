import basic from 'basic-auth';
import { Request, Response, NextFunction } from 'express';

type BasicAuthCredentials = {
  [index:string]: {
    Name:string,
    Pass:string,
  }
}

type BasicAuthHandler = {
  [index:string]: (req:Request, res:Response, next:NextFunction) => void
}

export default Object.entries(<BasicAuthCredentials>JSON.parse(process.env.BASIC_AUTH || '{}'))
  .reduce((result:BasicAuthHandler, [key, { Name, Pass }]) => {
    result[key] = (req:Request, res:Response, next:NextFunction) => {
      if (req.method === 'OPTIONS') {
        next();
      } else {
        const { name, pass } = basic(req) || {};
        if (!name || !pass || name !== Name || pass !== Pass) {
          res.status(401).send('unauthorized');
        } else {
          next();
        }
      }
    }
    return result;
  }, <BasicAuthHandler>{});
