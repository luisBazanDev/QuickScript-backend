import express from 'express';

import { getData, login } from '../Controllers/AuthenticateController';

import { saveSession, getAllSessions } from '../Controllers/UserController';

import isAuthenticate from '../Middlewares/AuthenticateMiddleware';

import { saveStats, getAllStats } from '../Controllers/GameController';

var router = express.Router();

router.post('/authenticate', login);

router.get('/data/get', isAuthenticate, getData);

router.post('/session/save', isAuthenticate, saveSession);

router.get('/session/getAll', isAuthenticate, getAllSessions);

router.post('/stats/save', isAuthenticate, saveStats); // falto terminar estas apis

router.get('/stats/getAll', isAuthenticate, getAllStats);  // falto terminar estas apis

export default router;