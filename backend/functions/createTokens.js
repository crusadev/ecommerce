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

module.exports = { createAccessToken, createRefreshToken }