import express from 'express'
import { addWishList, getWishedPerProduct, getWishedProducts } from '../../controllers/productWishList';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', authMiddleware, addWishList) 
router.get('/', authMiddleware, getWishedProducts) 
router.get('/:id', authMiddleware, getWishedPerProduct) 

export default router