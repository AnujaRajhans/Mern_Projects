const express = require('express');
const productController= require('../controllers/productController');
const router = express.Router();
const auth = require('../middleware/auth');
router.post('/addProduct',productController.addProduct);
router.get('/getAllProducts',auth,productController.getAllProducts);
router.get('/getProduct/:id', productController.getProductId);
router.put('/updateProduct/:id',productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteproduct);


module.exports = router;
