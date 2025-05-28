import express from 'express'
import { redirectToShortUrl } from '../controller/redirectToUrlController.js';

const router = express.Router();
router.get('/:short_url' , redirectToShortUrl);

export default router;