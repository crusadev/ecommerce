const mongoose=require('mongoose');

const Schema= mongoose.Schema;
const UserSchema= new Schema({
    name: {
        type:String,
        require: true,
        unique: true
    },
    description: {
        type:String,
        require: true
    },
    images:{
        
    },
    stock:{
        type:String,
        require: true
    },
    price:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        require: true
    },
    brand:{
        type:String,
        require: true
    },
    category:{
        type:String,
        require: true
    },
});
module.exports = mongoose.model('User', UserSchema);