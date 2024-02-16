import express from 'express';
import { CreateAccount, loginAccount } from './Auth_controlls.js';



const auth_router = express.Router();

auth_router.post("/register", CreateAccount)
auth_router.post("/login", loginAccount)



export default auth_router;