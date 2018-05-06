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
  db.query('select * from artical', (err, data) => {    // 拿到所有文章
    if (err) { res.send(err) }
    else {
      db.query(`select * from user where email='${req.signedCookies.email}'`, (err, userInfo) => {  // 拿到用户信息
        if (err) { res.send(err) }
        else {
          ejs.renderFile(__dirname + '/../template/index.ejs', { data, userInfo, cookie: req.signedCookies }, (err, data) => {
            if (err) { res.send(err) }
            else {
              res.send(data)
            }
          })
        }
      })
    }
  })
})

module.exports = router