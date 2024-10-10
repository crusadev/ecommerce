const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Products'
    }],
    total: {
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    }
});

module.exports = mongoose.model('Orders', OrderSchema);