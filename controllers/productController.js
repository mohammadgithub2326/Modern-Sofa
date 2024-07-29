const Product = require('../models/product');
const User = require('../models/user');
console.log("entered the product controller ")

exports.addProduct = async (req, res) => {
    console.log("addMethod entered")
    const { images, productDescription, categories, addedBy } = await req.body;
    console.log(req.body)

    try {
        const user = await User.findById(addedBy);

        if (!user || user.type !== 'admin') {
            return res.status(403).json({ status: 'fail', message: 'Only admin can add products' });
        }

        const newProduct = new Product({ images, productDescription, categories, addedBy });

        await newProduct.save();

        res.status(201).json({ status: 'success', message: 'Product successfully added' });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: 'Server error', error });
        console.log(error)
    }
};
exports.updateProduct = async (req, res) => {
    const { productId, images, productDescription, categories, updatedBy } = req.body;

    try {
        const user = await User.findById(updatedBy);

        if (!user || user.type !== 'admin') {
            return res.status(403).json({ status: 'fail', message: 'Only admin can update products' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }

        // Update only provided fields
        if (images) product.images = images;
        if (productDescription) product.productDescription = productDescription;
        if (categories) product.categories = categories;

        await product.save();

        res.status(200).json({ status: 'success', message: 'Product successfully updated' });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: 'Server error', error });
    }
};

exports.deleteProduct = async (req, res) => {
    console.log("entered delete method")
    const { productId, deletedBy } = req.body;

    try {
        const user = await User.findById(deletedBy);

        if (!user || user.type !== 'admin') {
            return res.status(403).json({ status: 'fail', message: 'Only admin can delete products' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }

        // Confirm deletion
        const confirmation = req.body.confirmation;
        if (!confirmation || confirmation.toLowerCase() !== 'yes') {
            return res.status(400).json({ status: 'fail', message: 'Deletion not confirmed' });
        }

        await product.deleteOne();

        res.status(200).json({ status: 'success', message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: 'Server error', error });
        console.log(error.message)
    }
};
exports.getAllProducts = async (req, res) => {
    console.log("entered getall products method")
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            message: 'Products successfully fetched',
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ status: 'fail', message: 'Server error', error: error.message });
    }
};
