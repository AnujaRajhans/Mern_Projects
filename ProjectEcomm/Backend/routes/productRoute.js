// const express = require('express');
// const productController= require('../controllers/productController');
// const router = express.Router();
// const auth = require('../middleware/auth');
// router.post('/addProduct',productController.addProduct);
// router.get('/getAllProducts',auth,productController.getAllProducts);
// router.get('/getProduct/:id', productController.getProductId);
// router.put('/updateProduct/:id',productController.updateProduct);
// router.delete('/deleteProduct/:id', productController.deleteproduct);
// module.exports = router;


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { auth, admin } = require('../middleware/auth');

router.get('/', productController.getProducts);
router.post('/', auth, admin, productController.addProduct);

module.exports = router;
