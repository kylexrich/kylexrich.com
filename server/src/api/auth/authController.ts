import { Request, Response } from "express";
import { registerUser, loginUser, getUser, logOutUser } from "./authService";
import { log } from "../../config/log4jsConfig";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { setTokenCookie, signToken } from "../token/tokenService";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await registerUser(email, password);
    const token = signToken(result.data.user?.id);
    setTokenCookie(res, token);
    res.status(result.status).send(result.data);
  } catch (error) {
    log.error(error);
    res.status(500).send({ error: "Error registering user" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    const token = signToken(result.data.user?.id);
    setTokenCookie(res, token);
    res.status(result.status).send(result.data);
  } catch (error) {
    log.error(error);
    res.status(500).send({ error: "Error logging in" });
  }
}

export async function me(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const id = req.user.id;
    const result = await getUser(id);
    res.status(result.status).send(result.data);
  } catch (error) {
    log.error(error);
    res.status(500).send({ error: "Error logging in with token" });
  }
}

export async function logout(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const result = await logOutUser();
    res.clearCookie("token");
    res.status(result.status).send(result.data);
  } catch (error) {
    log.error(error);
    res.status(500).send({ error: "Error logging out" });
  }
}
