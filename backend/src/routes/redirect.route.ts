import { Router } from 'express';
import { redirectToLongUrl } from '../controllers/redirect.controller';

const router = Router();

router.get('/:slug', redirectToLongUrl);

export default router;
