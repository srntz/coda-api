import express from 'express';
import {AccessTokenController} from "./access-token/accessToken.controller.js";
const router = express.Router();

router.use(new AccessTokenController().getRouter());

export default router;
