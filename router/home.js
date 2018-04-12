const express = require('express')
const ejs = require('ejs')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'jianshu',
    user: 'root',
    password: '4512'
})

const router = express.Router()

router.use('/', (req, res) => {                         // 首页
    db.query('select * from artical', (err, data)=>{
        if(err){
            res.send(err)
        }
        else {
            ejs.renderFile(__dirname + '/../template/index.ejs', {data: data, cookie: req.signedCookies}, (err, data)=>{
                if(err) {
                    console.log(err)
                    res.send(err)
                }
                else {
                    res.send(data)
                }
            })            
        }
    })
})

module.exports = router