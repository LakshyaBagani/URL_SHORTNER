import express from 'express';
import { createshortUrl , redirectToShortUrl } from '../controller/urlController.js';
const router = express.Router();

router.post('/', createshortUrl);
router.get('/:short_url' , redirectToShortUrl);

export default router;