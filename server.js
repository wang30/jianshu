const fs = require('fs')
const static = require('express-static')
const ejs = require('ejs')
const express = require('express')
const mysql = require('mysql')
const showdown = require('showdown')
const bodyParser = require('body-parser')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'jianshu',
    user: 'root',
    password: '4512'
})

const server = express()

server.use(bodyParser.urlencoded({}))



server.use('/api/save', require('./api/save.js'))

server.use('/p', require('./router/read.js'))

server.use('/write', require('./router/write.js'))

server.use('/sign_up', require('./router/sign_up.js'))
server.use('/sign_in', require('./router/sign_in.js'))

server.use('/static', static('./static'))

server.use('/', (req, res) => {                         // 首页
    db.query('select * from artical', (err, data)=>{
        if(err){
            res.send(err)
        }
        else {
            ejs.renderFile('index.ejs', {data: data}, (err, data)=>{
                if(err) {
                    res.send('error')
                }
                else {
                    res.send(data)
                }
            })            
        }
    })
})



server.listen(8087)