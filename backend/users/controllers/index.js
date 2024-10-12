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

const getCurrentUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader?.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id).select('fullname email')
        if (!User) {
            return res.status(404).json({ error: "InvalidId" });
        }
        /*  If the 'return' header is true, then I want to use this controller
            as a function in other controllers. And I want it to just return the
            value, not respond   */
        return req.headers['return'] !== true ? res.status(200).json(User) : User
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const User = await userModel.findByIdAndDelete(id);
        if (!User) {
            return res.status(404).json({ error: "InvalidId" });
        }
        res.status(200).json("User deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { postUser, logUser, createAccessToken, signoutUser, getCurrentUser, deleteUser }