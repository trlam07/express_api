const jwt = require('jsonwebtoken');
const { handleResponseError } = require('../utils/response.js');

const sampleRefreshTokens = [];

const SECRET_KEY_ACCESS_TOKEN = 'abc';

const SECRET_KEY_REFRESH_TOKEN = '123';

const generateAccessToken = (email, password, role) => {
    return jwt.sign({
        email, 
        password,
        role
    },
    SECRET_KEY_ACCESS_TOKEN, {expiresIn: '30m'}
)
}

const generateRefreshToken = (email, password, role) => {
    return jwt.sign({
        email, 
        password,
        role
    },
    SECRET_KEY_REFRESH_TOKEN, {expiresIn: '10d'})
}

const checkAccessToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        res.writeHead(401, {'Content-Type': 'text/plain'})
        res.end('Invalid token')
        return;
    }
    const accessToken = authorizationHeader.split(' ')[1]
    jwt.verify(accessToken, SECRET_KEY_ACCESS_TOKEN, (err, decoded) => {
        if(err) {
            res.writeHead(401, {'Content-Type': 'text/plain'})
            res.end('Invalid token')
            return;
        }
        next()
    })
}

const checkRefreshToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        handleResponseError(res, 401, 'Invalid Refresh Token')
        return;
    }
    const refreshToken = authorizationHeader.split(' ')[1]
    if(!refreshToken || !sampleRefreshTokens.includes(refreshToken)) {
        handleResponseError(res, 401, 'Invalid Refresh Token')
        return;
    }
    jwt.verify(refreshToken, SECRET_KEY_REFRESH_TOKEN, (err, decoded) => {
        if(err) {
            handleResponseError(res, 401, 'Invalid Refresh Token')
            return;
        }
        next()
    })
}

const checkAuthorizationAdmin = (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    const accessToken = authorizationHeader.split(' ')[1]
    jwt.verify(accessToken, SECRET_KEY_ACCESS_TOKEN, (err, decoded) => {
        if(decoded.role !== 'admin') {
            res.writeHead(403, {'Content-Type': 'text/plain'})
            res.end('Forbidden')
            return;
        }
        next()
    })
}

module.exports = {
    SECRET_KEY_REFRESH_TOKEN,
    sampleRefreshTokens,
    generateAccessToken,
    generateRefreshToken,
    checkAccessToken,
    checkRefreshToken,
    checkAuthorizationAdmin
}

