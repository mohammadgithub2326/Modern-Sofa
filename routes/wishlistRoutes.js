const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.post('/addtowishlist', wishlistController.addProductToWishlist);

router.post('/getanddownload', wishlistController.getWishlist);

router.post('/removefromwishlist', wishlistController.removeProductFromWishlist); 

module.exports = router;
