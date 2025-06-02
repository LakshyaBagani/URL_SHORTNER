import express from 'express';
import { createshortUrl , redirectToShortUrl , getAllUrls} from '../controllers/urlController.js';
const router = express.Router();

router.post('/create', createshortUrl);
router.get('/:short_url' , redirectToShortUrl);
router.get('/getallurls'  , getAllUrls)


export default router;