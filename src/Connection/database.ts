import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_TYPE } = process.env;

console.log(DATABASE_PASSWORD);

export const sequelize = new Sequelize(DATABASE_NAME as string, DATABASE_USER as string, DATABASE_PASSWORD as string, {
  host: DATABASE_HOST as string,
  dialect: DATABASE_TYPE as any,
});