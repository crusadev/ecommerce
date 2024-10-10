const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        require: true
    },
    stars: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Review', ReviewSchema);