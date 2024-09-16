import { Request, Response } from 'express';
import Users from '../Models/Users';
import bcrypt from 'bcrypt';

import * as jose from 'jose';

const JWT_SECRET = Buffer.from(process.env.APPLICATION_SECRET || '', 'base64');

export const login = async (req: Request, res: Response) => {
    const { type, username, password } = req.body;

    try {

        if(type == 'login'){

            const user = await Users.findOne({ where: { username: username } });

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
    
            const isValidPassword = await user.validPassword(password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Wrong password.' });
            }
    
            const token = await new jose.SignJWT({id: user.id, displayname: user.username})
            .setProtectedHeader({alg: 'HS256', b64: true})
            .setIssuedAt()
            .setIssuer('urn:quickscript:issuer')
            .setAudience('urn:quickUser:audience')
            .setExpirationTime('2h')
            .sign(JWT_SECRET);

            res.setHeader(
                'Content-Security-Policy',
                "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';"
              );
          
            return res.status(200).json({access_token: token, data: {user_id: user.id, username: username} });
        }
        else if(type == 'register'){
            const user = await Users.findOne({ where: { username: username } });

            if (user) {
                return res.status(400).json({ message: 'User already exists.' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = await Users.create({username: username, password: hashedPassword });
    
            const token = await new jose.SignJWT({id: newUser.id, displayname: newUser.username})
            .setProtectedHeader({alg: 'HS256', b64: true})
            .setIssuedAt()
            .setIssuer('urn:quickscript:issuer')
            .setAudience('urn:quickUser:audience')
            .setExpirationTime('2h')
            .sign(JWT_SECRET);

            res.setHeader(
                'Content-Security-Policy',
                "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';"
            );
          
            return res.status(200).json(
                {
                    access_token: token,
                    data: {
                        user_id: newUser.id,
                        username: user
                    }
                });
        }
        else{
            return res.status(400).json({ message: 'Endpoint type does not exist.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'A problem occurred on the server.' });
    }
};