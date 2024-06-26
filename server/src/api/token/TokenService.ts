import jwt, {JwtPayload} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {ResponseHandler} from '../../util/helper/ResponseHandler.js';
import {AuthenticatedRequest, isAuthenticatedRequest} from '../../util/types/AuthenticatedRequest.js';

export class TokenService {
    private readonly responseHandler: ResponseHandler;
    private readonly expiresInSeconds: number;
    private readonly jwtSecret: string;
    private readonly isProd: boolean;

    constructor(responseHandler: ResponseHandler) {
        this.responseHandler = responseHandler;
        this.jwtSecret = process.env.JWT_SECRET!;
        if (!this.jwtSecret) {
            throw new Error('.env JWT_SECRET is not set');
        }
        this.isProd = process.env.NODE_ENV === 'production';
        const expireInDays = this.isProd ? 5 : 1;
        this.expiresInSeconds = expireInDays * 24 * 60 * 60;
    }

    public signToken(userId: string): string {
        const payload = {user: {id: userId}};
        return jwt.sign(payload, this.jwtSecret, {expiresIn: this.expiresInSeconds});
    }

    public verifyToken(req: Request, res: Response, next: NextFunction): void {
        const token: string = req.cookies.token as string;

        if (!token) {
            this.responseHandler.sendErrorResponse(res, 401, 'No token provided', null);
            return;
        }

        jwt.verify(token, this.jwtSecret, (err: unknown, decodedToken: unknown) => {
            if (err) {
                this.responseHandler.sendErrorResponse(res, 403, 'Invalid token', null);
                return;
            }
            const authReq = req as AuthenticatedRequest;
            authReq.authenticatedUser =  {id: (decodedToken as JwtPayload).user.id as string};
            if (isAuthenticatedRequest(req)) {
                next();
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Failed to authenticate request', null);
            }
        });
    }

    public setTokenCookie(res: Response, token: string): void {
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: this.expiresInSeconds * 1000,
            secure: this.isProd,
            sameSite: this.isProd ? 'strict' : 'lax'
        });
    }

    public clearToken(res: Response): void {
        res.clearCookie('token', {
            httpOnly: true,
            secure: this.isProd,
            sameSite: this.isProd ? 'strict' : 'lax'
        });
    }
}
