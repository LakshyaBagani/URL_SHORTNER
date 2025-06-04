import express from 'express';
import { createshortUrl , redirectToShortUrl , getAllUrls} from '../controllers/urlController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/create', createshortUrl);
router.get('/getallurls' , authMiddleware , getAllUrls);
router.get('/:short_url' , redirectToShortUrl);


export default router;