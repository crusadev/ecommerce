const userModel = require('../users/models')
const jwt = require('jsonwebtoken')

//Middleware that passes the current user in the headers
const currentUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader?.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id).select('fullname email')
        req.headers['user'] = User
        if (!User) {
            throw Error("InvalidId");
        }
        next()
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { currentUser }