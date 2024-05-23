const express = require('express')
const rootRoute = express.Router()

const authRoute = require('./authRoute')
const itemRoute = require('./itemRoute')

rootRoute.use('/auth', authRoute)
rootRoute.use('/items', itemRoute)
module.exports = rootRoute


