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

    db.query(`select * from user where email='${email}'`, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            if(data.length > 0) {
                res.send({
                    code: 1,
                    msg: '该用户已注册'
                })
            }
            else {
                const head_url = '/static/head/default-head.jpg'
                db.query(`insert into user(name, email, password, head) values('${name}', '${email}', '${password}', '${head_url}')`,(err)=>{
                    if(err) {
                        res.send('注册时插入数据失败' + err)
                    }
                    else {
                        res.cookie('email', email, {signed: true})
                        res.send({
                            code: 0,
                            msg: 'ok'
                        })
                    }
                })
            }
        }
    })
})

module.exports = router