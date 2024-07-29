const Wishlist = require('../models/wishlist');
const Product = require('../models/product');
const User = require('../models/user');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.addProductToWishlist = async (req, res) => {
    const { productId, userId } = req.body;

    try {
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
            }
        }

        await wishlist.save();

        res.status(200).json({ status: 'success', message: 'Product successfully added to wishlist' });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ status: 'fail', message: 'Server error', error: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

        if (!wishlist) {
            return res.status(404).json({ status: 'fail', message: 'Wishlist not found' });
        }

        // Generate PDF
        const doc = new PDFDocument();

        // Set response headers for file download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="wishlist_${userId}.pdf"`);

        // Pipe the document to the response
        doc.pipe(res);

        doc.fontSize(25).text('Wishlist', {
            align: 'center'
        });

        wishlist.products.forEach(product => {
            doc.fontSize(20).text(`Product: ${product.productDescription}`, {
                align: 'left'
            });
            doc.fontSize(15).text(`Category: ${product.categories}`, {
                align: 'left'
            });
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ status: 'fail', message: 'Server error', error: error.message });
    }
};

exports.removeProductFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ status: 'fail', message: 'Wishlist not found' });
        }

        const productIndex = wishlist.products.indexOf(productId);
        if (productIndex > -1) {
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();
            return res.status(200).json({ status: 'success', message: 'Product successfully removed from wishlist' });
        } else {
            return res.status(404).json({ status: 'fail', message: 'Product not found in wishlist' });
        }
    } catch (error) {
        console.error('Error removing product from wishlist:', error);
        res.status(500).json({ status: 'fail', message: 'Server error', error: error.message });
    }
};