import { Router } from 'express';
import { getAllProducts } from '../controllers/product.controller';
import { getProductById } from '../controllers/product.controller';
import { createProduct } from '../controllers/product.controller';
import { updateProduct } from '../controllers/product.controller';
import { deleteProduct } from '../controllers/product.controller';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct); 
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct); 



export default router;