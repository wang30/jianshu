const static = require('express-static')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const server = express()

server.use(bodyParser.urlencoded({extended: false}))

server.use(cookieParser('jfnbcxgshenstywm'))

server.use('/api/save', require('./api/save.js'))
server.use('/api/sign_up', require('./api/sign_up.js'))

server.use('/p', require('./router/read.js'))

server.use('/write', require('./router/write.js'))

server.use('/sign_up', require('./router/sign_up.js'))
server.use('/sign_in', require('./router/sign_in.js'))
server.use('/sign_out', (req, res) => {
    res.clearCookie('email')
    res.redirect('/')
})

server.use('/static', static('./static'))

server.use('/', require('./router/home.js'))



server.listen(8087)