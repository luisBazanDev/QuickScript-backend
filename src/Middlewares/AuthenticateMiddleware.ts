import { Request, Response, NextFunction, request } from 'express';
import * as jose from 'jose';
import dotenv from 'dotenv';
import { decode } from 'jose/dist/types/util/base64url';

dotenv.config();

const JWT_SECRET = Buffer.from(process.env.APPLICATION_SECRET || '', 'base64');

const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['x-access-token'];
  
    if (!authHeader) {
      return res.status(403).json({ message: 'Token not provided.' });
    }
  
    try {
      const decoded = jose.jwtVerify(authHeader as string, JWT_SECRET, { algorithms: ['HS256'] });
      next();
    } catch (error) {
      res.status(401).json({ message: 'Wrong token.' });
    }
    next();
};

export default isAuthenticate;