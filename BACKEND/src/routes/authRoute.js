import express from "express";
import { Login, Logout, SignUp } from "../controller/authController";

const router = express.Router()
router.get('/login' , Login);
router.post('/signup' , SignUp);
router.post('/logout' , Logout)

export default router