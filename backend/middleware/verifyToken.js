const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('../users/models')
const express = require('express');
const { createAccessToken } = require('../users/controllers')

const app = express();
app.use(cookieParser())

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    //Check if there is any access token
    if (!accessToken) {
        if (verifyRefreshToken(res, req)) {
            next()
        }
    } else {
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            //Errors:
            if (err) {
                //Error - expired token
                if (err.name === 'TokenExpiredError') {
                    if (verifyRefreshToken(res, req)) {
                        next()
                    }
                    //Any other error
                } else {
                    res.status(401).json(`JWT Verify Access error: ${err.name}`)
                }
                //Give access if there are no errors
            } else {
                const User = userModel.findById(decoded.id)
                if (User) {
                    next()
                } else {
                    res.status(401).json('Invalid Token')
                }
            }
        })
    }
}

const verifyRefreshToken = (res, req) => {
    const refreshToken = req.cookies.refreshToken
    let accessTokenCreated = false

    //Check if there is a refresh token cookie
    if (!refreshToken) {
        res.status(403).json({ error: "ExpiredRefreshToken" })
    } else {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                //Check if the token is expired
                if (err.name === 'TokenExpiredError') {
                    res.status(403).json({ error: "ExpiredRefreshToken" })
                //Any other error
                } else {
                    res.status(401).json(`JWT Verify Refresh error: ${err.name}`)
                }
            } else {
                //Create new access token
                const User = userModel.findById(decoded.id)
                if (User) {
                    const accessToken = createAccessToken(decoded.id)
                    res.cookie('accessToken', accessToken, { maxAge: 60000 * 15 })
                    accessTokenCreated = true
                    req.headers['authorization'] = `Bearer ${accessToken}`;
                } else {
                    res.status(401).json('Invalid Token')
                }
            }
        })
    }
    return accessTokenCreated
}

module.exports = verifyAccessToken