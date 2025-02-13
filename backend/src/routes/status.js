import {Router} from 'express';
import { createStatus, getStatus, updateViews } from '../controllers/status.js';

const router = Router()

router.get('/',getStatus);

router.post('/',createStatus)

router.put('/',updateViews)

export default router