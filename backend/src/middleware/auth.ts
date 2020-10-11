import config from '../config/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface IUserAuthInfoRequest extends Request {
  user: any;
}

const authMiddleware = (req: IUserAuthInfoRequest, res: Response, next: any): void | Response => {
  const token = req.header('Authorization');

  if(!token) {
    return res.status(401).json({ message: 'No token, authorization denied '});
  }

  try {
    const decoded = jwt.verify(token, config.JWT_ENCRYPTION);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

export default authMiddleware;