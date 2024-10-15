const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    fullname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Products'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Products'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Orders'
    }]
});

//Signup Method
UserSchema.statics.signup = async function (email, password, fullname) {

    if (!email || !password || !fullname) {
        throw Error('All fields must be completed')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid') //Checks if the email has a valid form
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const account = await this.findOne({ email }) //Mongo search for any user already created with this email
    if (account) {
        throw Error('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(password, 10) //Password encryption with the Blowfish cipher algorithm
    const User = await this.create({ email, password: hashedPassword, fullname })

    return User
}

//Login Method
UserSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be completed')
    }

    const account = await this.findOne({ email }) //Searches for the user in mongo
    if (!account) {
        throw Error('Incorrect credentials')
    }

    const passwordMatch = await bcrypt.compare(password, account.password) //Compares the frontend password with the stored encrypted password
    if (!passwordMatch) {
        throw Error('Incorrect credentials')
    }

    return account
}

module.exports = mongoose.model('Users', UserSchema);