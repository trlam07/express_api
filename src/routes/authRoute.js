const express = require('express')
const authRoute = express.Router()

const {register, login, refreshToken, changePassword, forgotPassword, logout} = require('../controller/authController')
const { checkRefreshToken, checkAccessToken } = require('../middleware/auth');

authRoute.post('/register', register);
authRoute.post('/login', login);
// middleware verify refresh token
authRoute.get('/refresh-token', checkRefreshToken, refreshToken)
// middle verify accessToken
authRoute.put('/change-password', checkAccessToken, changePassword)

authRoute.put('/forgot-password', forgotPassword)

authRoute.post('/logout', checkAccessToken, logout)

module.exports = authRoute


