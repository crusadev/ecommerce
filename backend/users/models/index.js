const mongoose=require('mongoose');

const Schema= mongoose.Schema;
const UserSchema= new Schema({
    fullname: {
        type:String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    adress:{
        type:String,
        require: true
    },
    orders:{
        
    },
});
module.exports = mongoose.model('User', UserSchema);