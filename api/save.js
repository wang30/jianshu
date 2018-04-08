const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'jianshu',
    user: 'root',
    password: '4512'
})

const router = express.Router()

router.use('/', (req, res) => {                               // 接口，保存文章
    if(req.body.title != '' || req.body.content != ''){
        req.body.content = req.body.content.replace(/\'/g, '\\\'')    // 将内容中的 ' 替换为 \'
        db.query(`update artical set title='${req.body.title}', content='${req.body.content}' where id=${req.body.id}`, (err) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log('success')
                res.end()
            }
        })    
    }
})

module.exports = router