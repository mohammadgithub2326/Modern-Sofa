const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require("../utils/authMiddleWear")

router.post('/add', verifyToken, productController.addProduct);
router.put('/update', verifyToken, productController.updateProduct);
router.delete('/delete',verifyToken, productController.deleteProduct); 
router.post('/getproduct', productController.getProductById);
router.get('/getallproducts', productController.getAllProducts); 

module.exports = router;
