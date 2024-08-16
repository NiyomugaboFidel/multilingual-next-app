import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware';
import { getAllnotifications, markAllNotificationsAsRead, markNotificationsAsRead } from '../../controllers/notification.controller';
const router = express.Router();

router.get('/', authMiddleware, getAllnotifications) 
router.put('/', authMiddleware, markAllNotificationsAsRead) 
router.put('/:id', authMiddleware, markNotificationsAsRead) 


export default router