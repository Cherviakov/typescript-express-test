import fs from 'fs';
import path from 'path';
import { Router, Request, Response, } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../layers/domain/services';

const privateKeyPath = path.resolve(process.env.JWT_PRIVATE_KEY || '');
let privateKey = Buffer.from([]);
fs.readFile(privateKeyPath, (err, key) => {
  if (err) {
    console.error(err);
    throw new Error('cannot read jwt private key file');
  } else {
    privateKey = key;
  }
});
const router = Router();

router.post('/signin', async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send('unauthorized');
      return
    }
    const user = await UserService.findUserByPassword({ email, password }); 
    if (!user) {
      res.status(401).send('unauthorized');
    } else {
      const payload = { userId: user._id };
      const accessToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h',
        audience: 'website',
        issuer: 'server',
      });
      const userWithoutPassword = { ...user, password: '' };
      res.status(200).send({ user: userWithoutPassword, accessToken });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

router.post('/signup', async (req:Request, res:Response) => {
  try {
    const { email, password, repeatPassword } = req.body;
    if (![email, password, repeatPassword].every((i) => !!i)) {
      res.status(400).send('email, password and repeatPassword are required');
    } else if (password !== repeatPassword) {
      res.status(400).send('password and repeatPassword are not match');
    } else {
      const user = await UserService.signupUser({ email, password });
      const payload = { userId: user._id };
      const accessToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h',
        audience: 'website',
        issuer: 'server',
      });
      const userWithoutPassword = { ...user, password: '' };
      res.status(200).send({ user: userWithoutPassword, accessToken });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

export default router;
