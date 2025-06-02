import express from "express";
import { Login , SignUp , Logout} from "../controllers/authController.js";

const router = express.Router()
router.post('/login' , Login);
router.post('/signup' , SignUp);
router.post('/logout' , Logout)

export default router