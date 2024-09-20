import { Request, Response } from "express";
import Sessions from "../Models/Sessions";
import Languages from "../Models/Languages";

import Registros from "../Models/Registros";

import Error_Keys from "../Models/Error_Keys";

import Users from "../Models/Users";

import * as jose from "jose";

const JWT_SECRET = Buffer.from(process.env.APPLICATION_SECRET || "", "base64");

export const saveSession = async (req: Request, res: Response) => {
  const authHeader = req.headers["x-access-token"];

  const {
    average_wpm,
    language,
    precision,
    min_wpm,
    max_wpm,
    start_time,
    end_time,
    errors,
    registers,
  } = req.body;

  console.log(errors);

  try {
    const { payload } = await jose.jwtVerify(authHeader as string, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    const language_id = await Languages.findOne({ where: { name: language } });

    if (!language_id) {
      return res.status(404).json({ message: "There is no language type." });
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
        end_time: end_time,
        Registros: registers,
        Error_Keys: errors,
      },
      {
        include: ["Registros", "Error_Keys"],
      }
    );

    return res.status(200).json({
      message: "the session was saved satisfactorily.",
      data: { newSession },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "A problem occurred on the server." });
  }
};

export const getAllSessions = async (req: Request, res: Response) => {
  const authHeader = req.headers["x-access-token"];

  try {
    const { payload } = await jose.jwtVerify(authHeader as string, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    const existUserId = await Users.findOne({ where: { id: payload.id } });

    if (!existUserId) {
      return res.status(401).json({ error: "The user does not exist." });
    }

    const allSessions = await Sessions.findAll({
      where: { user_id: payload.id },
      include: [Registros, Error_Keys],
    });

    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';"
    );

    return res.status(200).json({
      data: { allSessions },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "A problem occurred on the server." });
  }
};
