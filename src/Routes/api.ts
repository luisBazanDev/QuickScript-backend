import express from 'express';

import { getData, login } from '../Controllers/AuthenticateController';

import { saveSession, saveRegistro, saveErrorKeys } from '../Controllers/UserController';

import isAuthenticate from '../Middlewares/AuthenticateMiddleware';

import { saveStats } from '../Controllers/GameController';

var router = express.Router();

router.post('/authenticate', login);

router.get('/data/get', isAuthenticate, getData);

router.post('/session/save', isAuthenticate, saveSession);

router.post('/record/save', isAuthenticate, saveRegistro);

router.post('/error/save', isAuthenticate, saveErrorKeys);

router.post('/stats/save', isAuthenticate, saveStats);

export default router;