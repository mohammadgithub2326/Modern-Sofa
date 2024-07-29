console.log("enterd app.js")
const express = require('express');
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


//user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/users', userRoutes);
// app.use(".api/v1/users",userRoutes)

//product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/v1/products', productRoutes,);

//wishlist routes
const wishlistRoutes = require('./routes/wishlistRoutes'); 
app.use('/api/v1/wishlist', wishlistRoutes);
// app.use('/api/wishlist', wishlistRoutes);

module.exports = app;
console.log("exited the app.js")
