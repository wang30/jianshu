const express = require('express')
const mysql = require('mysql')

const router = express.Router()

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'jianshu',
    user: 'root',
    password: '4512'
})

router.use('/', (req, res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    
    // 校验

    db.query(`insert into user(name, email, password) values('${name}', '${email}', '${password}')`,(err)=>{
        if(err) {
            res.send('注册时插入数据失败' + err)
        }
        else {
            res.cookie('email', email, {signed: true})
            res.redirect('/')
        }
    })
})

module.exports = router