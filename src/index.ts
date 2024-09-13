import { sequelize } from './Connection/database';
import dotenv from 'dotenv';
import express from 'express';
import Users from './Models/Users';
import Sessions from './Models/Sessions';
import User_Statistics from './Models/User_Statistics';
import Registros from './Models/Registros';
import Error_Keys from './Models/Error_Keys';
import Languages from './Models/Languages';

import { login } from './Controllers/AuthenticateController';

import { saveSession, saveRegistro } from './Controllers/UserController';

import isAuthenticate from './Middlewares/AuthenticateMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/v1/authenticate', login);

app.post('/api/v1/session/save', isAuthenticate, saveSession);

app.post('/api/v1/record/save', isAuthenticate, saveRegistro);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
    await sequelize.sync({ force: true });
    console.log('Tablas sincronizadas con la base de datos.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error conectándose a la base de datos:', error);
  }
};

startServer();