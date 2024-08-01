const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userName:{
        type:String,
        required:true,
        ref:"user"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7*24*60*60 // Token will automatically delete after 7 days
    }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
