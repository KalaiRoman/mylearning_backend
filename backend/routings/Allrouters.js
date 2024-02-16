import express from 'express';
import auth_router from '../controlls/Auth/index.js';


const router = express.Router();

router.use("/auth", auth_router);

export default router;