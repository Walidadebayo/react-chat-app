import { Router } from 'express';
import { GetMessages, SendMessage } from '../controllers/MessageController';

const router = Router();

router.post('/', SendMessage);
router.get('/:id', GetMessages);

export default router;