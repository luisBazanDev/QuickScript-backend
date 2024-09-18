import express from 'express';

import { getData, login } from '../Controllers/AuthenticateController';

import { saveSession, saveRegistro, saveErrorKeys, getAllSessions, getAllRecords, getAllErrorKeys } from '../Controllers/UserController';

import isAuthenticate from '../Middlewares/AuthenticateMiddleware';

import { saveStats, getAllStats } from '../Controllers/GameController';

var router = express.Router();

router.post('/authenticate', login);

router.get('/data/get', isAuthenticate, getData);

router.post('/session/save', isAuthenticate, saveSession);

router.get('/session/getAll', isAuthenticate, getAllSessions);

router.post('/record/save', isAuthenticate, saveRegistro);

router.post('/record/get', isAuthenticate, getAllRecords);

router.post('/error/save', isAuthenticate, saveErrorKeys);

router.get('/error/get', isAuthenticate, getAllErrorKeys);

router.post('/stats/save', isAuthenticate, saveStats);

router.get('/stats/getAll', isAuthenticate, getAllStats);

export default router;