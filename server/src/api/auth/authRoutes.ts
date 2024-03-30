import express, { Router } from 'express';
import { verifyToken } from '../token/tokenService';
import { login, logout, me } from './authController';
import { AuthenticatedRequest } from '../../interfaces/AuthenticatedRequest';

const router: Router = express.Router({ mergeParams: true });

router.post('/login', login);
router.get('/me', verifyToken, (req, res) => me(req as AuthenticatedRequest, res));
router.post('/logout', verifyToken, (req, res) => logout(req as AuthenticatedRequest, res));

export default router;
