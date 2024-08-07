import express from 'express'
import { addWishList } from '../../controllers/productWishList';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', authMiddleware, addWishList) 

export default router