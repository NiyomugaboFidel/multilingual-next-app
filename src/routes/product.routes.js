import express from'express';
import { 
    createNewProduct, 
    deleteProduct, 
    getAllProducts,
    getaProduct,
    retrievItems,
    searchProducts,
    uploadImages
 } from '../controllers/product.controllers';
import { authMiddleware, checkRole } from '../middlewares/authMiddleware';
import isSeller from '../middlewares/seller.Middleware';
import { productImageResize, uploadPhoto } from '../middlewares/uploadImage';
const router = express.Router();

router.post('/create',authMiddleware,checkRole(['admin','seller']) ,createNewProduct);

router.get('/item/:id' ,authMiddleware,checkRole(['admin','seller']) ,getaProduct);
router.get('/' ,authMiddleware,checkRole(['admin','seller']) ,getAllProducts);
router.get('/get-items' ,authMiddleware,checkRole(['admin','seller']) ,retrievItems);
router.get('/search' ,authMiddleware,checkRole(['admin','seller']) ,searchProducts);

router.delete('/delete/:id',authMiddleware,checkRole(['admin','seller']) ,deleteProduct);
router.put('/upload/:id',authMiddleware,checkRole(['admin','seller']),uploadPhoto.array('images', 10),
productImageResize,
uploadImages);

export default router