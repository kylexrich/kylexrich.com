import express, { Router } from 'express';
import { fetchWebsiteGithubPullRequests } from './githubController';

const router: Router = express.Router({ mergeParams: true });

router.get('/pull-requests', fetchWebsiteGithubPullRequests);

export default router;
