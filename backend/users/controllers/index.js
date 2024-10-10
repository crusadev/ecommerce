const userModel = require('../models')
const jwt = require('jsonwebtoken')

/*  The access token is sent in the cookies on log in, it expires every 5 minutes or
    when the user signs out, and it's refreshed with the refresh token through the 
    'verifyAccessToken' middleware  */
const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' })
}
/*  The refresh token is also sent in the cookies on log in, expiration date depends
    on the app, for e-commerce I will leave it at 1 month, but until production I will
    leave it at 15 minutes for testing. When it expires the user is signed out and cannot
    access any protected route by the 'verifyAccessToken' middleware   */
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '15m' })
}

//Cookies options
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

        res.status(200).json(User)
        //res.status(200).json('Account created')
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

module.exports = { postUser, logUser, createAccessToken }