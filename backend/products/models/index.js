const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: [{
        public_id: String,
        url: String
    }],
    stock: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        require: true
    }
});

module.exports = mongoose.model('Products', ProductSchema);