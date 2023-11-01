const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cors())

const {connect} = require('./db/connect')

const apiRouter = require('./routers/api')

app.use('/v1', apiRouter)

connect()

module.exports = app