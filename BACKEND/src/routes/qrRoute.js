import express from 'express'
import { generateQR } from '../controller/qrController.js';

const router = express.Router();
router.post('/qr' , generateQR)

export default router;