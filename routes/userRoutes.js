const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

console.log("route.js  entered ")

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser); 
console.log("arived at login route")

module.exports = router;
