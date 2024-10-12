const userModel = require('../models')
const jwt = require('jsonwebtoken')
const { createAccessToken, createRefreshToken } = require('../../functions/createTokens');
const { currentUser } = require('../../functions/currentUser')

//Cookies options (in production -> secure:true)
const refreshOptions = {
    httpOnly: true,
    maxAge: 60000 * 15,
    sameSite: "none",
    secure: false,
};
const accessOptions = {
    httpOnly: true,
    maxAge: 60000 * 5,
    sameSite: "none",
    secure: false,
};


const postUser = async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        const User = await userModel.signup(email, password, fullname)

        //Send token cookies
        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)
        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const logUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await userModel.login(email, password)

        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)
        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account logged')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const signoutUser = async (req, res) => {
    res.cookie('refreshToken', '', { maxAge: 1, httpOnly: true, sameSite: 'none', secure: true })
    res.cookie('accessToken', '', { maxAge: 1, httpOnly: true, sameSite: 'none', secure: true })
    res.status(200).json('Signed out')
}

const getAllUsers = async (req, res) => {
    // in production -> only admins
    try {
        const Users = await userModel.find()
        res.status(200).json(Users)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const User = await currentUser(req, res)
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }
        res.status(200).json(User)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        //Check current user
        const User = await currentUser(req, res)
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }
        //Check user authorization
        if (User._id.toString() !== id && User.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden" });
        }
        await userModel.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    postUser,
    logUser,
    createAccessToken,
    signoutUser,
    getCurrentUser,
    deleteUser,
    getAllUsers
}