const mongoose=require('mongoose');

const Schema= mongoose.Schema;
const UserSchema= new Schema({
    products: {
        type:String,
        require: true,
        unique: true
    },
    sum: {
        type:Number,
        require: true
    },
    stock:{
        type:Number,
        require: true
    },
    user:{
        type:String,
        require: true,
        unique: true
    },
});
module.exports = mongoose.model('User', UserSchema);