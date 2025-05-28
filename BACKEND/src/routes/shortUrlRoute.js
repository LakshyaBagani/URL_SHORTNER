import express from 'express';
import { createshortUrl } from '../controller/createShortUrlController.js';
const router = express.Router();

router.post('/', createshortUrl);

export default router;