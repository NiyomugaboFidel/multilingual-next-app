import express from'express';
import { 
    createNewProduct, 
    getAllProducts
 } from '../controllers/product.controllers';
import { authMiddleware, checkRole } from '../middlewares/authMiddleware';
import isSeller from '../middlewares/seller.Middleware';
const router = express.Router();

router.post('/create',authMiddleware,checkRole(['admin','seller']) ,createNewProduct)
router.get('/' ,authMiddleware,checkRole(['admin','seller']) ,getAllProducts)

export default router