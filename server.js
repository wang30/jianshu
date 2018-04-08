const static = require('express-static')
const express = require('express')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.urlencoded({}))



server.use('/api/save', require('./api/save.js'))

server.use('/p', require('./router/read.js'))

server.use('/write', require('./router/write.js'))

server.use('/sign_up', require('./router/sign_up.js'))
server.use('/sign_in', require('./router/sign_in.js'))

server.use('/static', static('./static'))

server.use('/', require('./router/home.js'))



server.listen(8087)