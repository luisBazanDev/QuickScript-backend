import { Request, Response } from 'express';
import * as jose from 'jose';

import Users from '../Models/Users';

import User_Statistics from '../Models/User_Statistics';

import Languages from '../Models/Languages';

const JWT_SECRET = Buffer.from(process.env.APPLICATION_SECRET || '', 'base64');

export const saveStats = async (req: Request, res: Response) => {

    const authHeader = req.headers['x-access-token'];

    const {wpm, avg_time, total_Words, avg_error, prefered_lang} = req.body;

    try
    {
        const { payload } = await jose.jwtVerify(authHeader as string, JWT_SECRET, { algorithms: ['HS256'] });

        const existUserId = await Users.findOne({where: {id: payload.id}});

        if(!existUserId){
            return res.status(401).json({ error: 'The user does not exist.' });
        }

        const existLanguage = await Languages.findOne({where: {id: prefered_lang}});

        if(!existLanguage){
            return res.status(404).json({ error: 'There is no language type.' });
        }

        const newStats = await User_Statistics.create({
            user_id: payload.id, 
            wpm: wpm, 
            avg_time: avg_time, 
            total_Words: total_Words, 
            avg_error: avg_error, 
            prefered_lang: prefered_lang
        });

        return res.status(200).json({
            message: "Statistics have been successfully saved.", 
            data: {
                wpm: newStats.wpm,
                avg_time: newStats.avg_time,
                total_Words: newStats.total_words,
                avg_error: newStats.avg_error,
                prefered_lang: newStats.prefered_lang
            }
        });
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).json({ error: 'A problem occurred on the server.' });
    }
};

export const getAllStats = async (req: Request, res: Response) => {

    const authHeader = req.headers['x-access-token'];

    try
    {
        const { payload } = await jose.jwtVerify(authHeader as string, JWT_SECRET, { algorithms: ['HS256'] });

        const existUserId = await Users.findOne({where: {id: payload.id}});

        if(!existUserId){
            return res.status(401).json({ error: 'The user does not exist.' });
        }

        const UserStats = await User_Statistics.findAll({where: {user_id: payload.id}});

        return res.status(200).json({data: {UserStats}});
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).json({ error: 'A problem occurred on the server.' });
    }
}