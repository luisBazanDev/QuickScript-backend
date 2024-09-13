import { Request, Response } from 'express';
import Sessions from '../Models/Sessions';
import Languages from '../Models/Languages';

import Registros from '../Models/Registros';

import * as jose from 'jose';

const JWT_SECRET = Buffer.from(process.env.APPLICATION_SECRET || '', 'base64');

export const saveSession = async (req: Request, res: Response) => {

    const authHeader = req.headers['x-access-token'];

    const { average_wpm, language, precision, min_wpm, max_wpm, start_time, end_time} = req.body;

    try
    {
        const { payload } = await jose.jwtVerify(authHeader as string, JWT_SECRET, { algorithms: ['HS256'] });

        const language_id = await Languages.findOne({where: {name: language}});

        if(!language_id)
        {
            return res.status(404).json({ error: 'There is no language type.' });
        }

        const newSession = await Sessions.create(
            {
                user_id: payload.id, 
                average_wpm: average_wpm, 
                language: language_id.id, 
                precision: precision, 
                min_wpm: min_wpm, 
                max_wpm: max_wpm, 
                start_time: start_time, 
                end_time: end_time
            });

        return res.status(200).json({
            message: 'the session was saved satisfactorily.', 
            data: {
                id: newSession.id,
                average_wpm: newSession.average_wpm,
                precision: newSession.precision, 
                min_wpm: newSession.min_wpm, 
                max_wpm: newSession.max_wpm, 
                start_time: newSession.start_time, 
                end_time: newSession.end_time
            }
            });
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).json({ error: 'A problem occurred on the server.' });
    }
};

export const saveRegistro = async (req: Request, res: Response) => {
    const authHeader = req.headers['x-access-token'];

    const { session_id, wpm, time, totalWords} = req.body;

    try
    {
        const { payload } = await jose.jwtVerify(authHeader as string, JWT_SECRET, { algorithms: ['HS256'] });

        

        const newRegistro = await Registros.create(
            {
                session_id: session_id,
                wpm: wpm,
                time: time,
                total_words: totalWords
            });

        return res.status(200).json({
            message: 'the record was saved satisfactorily.', 
            data: {
                wpm: newRegistro.wpm,
                time: newRegistro.time,
                totalWords: newRegistro.total_words
            }
            });
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).json({ error: 'A problem occurred on the server.' });
    }
};