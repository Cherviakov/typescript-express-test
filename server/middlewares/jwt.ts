import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction }  from 'express';

const publicKeyPath = path.resolve(process.env.JWT_PUBLIC_KEY || '');
let publicKey = Buffer.from([]);
fs.readFile(publicKeyPath, (err, key) => {
  if (err) {
    console.error(err);
    throw new Error('cannot read jwt public key');
  } else {
    publicKey = key;
  }
});

export default (req:Request, res:Response, next:NextFunction) => {
  const [tokenType, token] = (req.get('Authorization') || '').split(' ');
  if (req.method === 'OPTIONS') {
    next();
  } else if (tokenType !== 'Bearer' || !token) {
    res.status(401).send('unauthorized');
  } else {
    try {
      const decoded = <{ userId: string }>jwt.verify(token, publicKey);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).send('unauthorized');
    }
  }
}
