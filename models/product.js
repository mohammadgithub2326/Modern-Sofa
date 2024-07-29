const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    images: {
        type: [String],
        // required: true,
        validate: [arrayLimit, 'Exceeds the limit of 4 images']
    },
    productDescription: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        enum: [
           " Recliner sofa Manual,RRR,Motorized",
            'L shape sofa set',
            'Launcher sofa',
            'Cum bed sofa',
            '3+1+1 sofa',
            'Wing chair',
            'T pie and stool',
            'Bed dashboards',
            'Dining set table and chairs',
            'Bed cushions'
        ],
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
});

function arrayLimit(val) {
    return val.length <= 4;
}

module.exports = mongoose.model('Product', productSchema);
