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
    const email = req.body.email
    const password = req.body.password
    
    // 后端数据校验

    db.query(`select * from user where email='${email}'`,(err, data)=>{
        if(err) {
            res.send('登录时查找数据出错' + err)
        }
        else {
            if(data.length > 0) {
                if(password === data[0].password) {
                    res.cookie('email', email, {signed: true})
                    res.send({
                        code: 0,
                        msg: ''
                    }) 
                }
                else {
                    res.send({
                        code: 1,
                        msg: '密码错误'
                    })
                }
            }
            else {
                res.send({
                    code: 1,
                    msg: '此用户未注册'
                })
            }
        }
    })
})

module.exports = router