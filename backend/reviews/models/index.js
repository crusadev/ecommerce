const mongoose=require('mongoose');

const Schema= mongoose.Schema;
const ReviewSchema= new Schema({
    user: {
        type:String,
        require: true,
        unique: true
    },
    stars: {
        type:Number,
        require: true
    },
    title:{
        type:String,
        require: true
    },
    body:{
        type:String,
        require: true,
        unique: true
    },
});
module.exports = mongoose.model('Review', ReviewSchema);