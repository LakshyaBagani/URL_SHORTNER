import express from 'express';
import { createshortUrl , getAllUrls, redirectToShortUrl } from '../controller/urlController.js';
const router = express.Router();

router.post('/create', createshortUrl);
router.get('/:shorturl' , redirectToShortUrl);
router.get('/getallurls' , getAllUrls)

export default router;