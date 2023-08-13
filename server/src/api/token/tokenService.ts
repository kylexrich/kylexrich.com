import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { AuthenticatedRequest, isAuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";

export function signToken(userId: string | null) {
  if (!userId) {
    throw "No user id provided";
  }
  const payload = { user: { id: userId } };
  const isProduction = process.env.NODE_ENV === "production";
  const expireInDays = isProduction ? 5 : 1;
  const expireInS = expireInDays * 24 * 60 * 60;

  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: expireInS });
}

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send({ error: "No token provided" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: unknown, decodedToken: unknown) => {
    if (err) {
      res.status(403).send({ error: "Invalid token" });
      return;
    }
    (req as AuthenticatedRequest).user = { id: (decodedToken as any).user.id };
    if (isAuthenticatedRequest(req)) {
      next();
    } else {
      res.status(500).send({ error: "Failed to authenticate request" });
    }
  });
}

export function setTokenCookie(res: Response, token: string): void {
  const isProduction = process.env.NODE_ENV === "production";
  const expireInDays = isProduction ? 5 : 1;
  const expireInMs = expireInDays * 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: expireInMs,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
  });
}
