import path from 'node:path';
import { Router } from 'express';
import { createCategory } from './app/useCases/categories/createCategory';
import multer from 'multer'; // accept multipart upload image
import { listCategories } from './app/useCases/categories/listCategories';
import { listProducts } from './app/useCases/products/listProdcts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get('/categories', listCategories);

// Create category 
router.post('/category', createCategory);

// List Products 
router.get('/products', listProducts);

// Create products 
router.post('/product', upload.single('image'), createProduct);

// Get products by category 
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);
// Create order 
router.post('/orders', createOrder);

// Change order status 
router.patch('/orders/:orderId', (req, res) => {
  res.send('ok');
});

// Delete/Cancel Order 
router.delete('/orders/:orderId', (req, res) => {
  res.send('OK');
});
