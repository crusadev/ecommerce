const userModel = require('../users/models')
const jwt = require('jsonwebtoken')

const currentUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader?.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id).select('fullname email')
        return User
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { currentUser }