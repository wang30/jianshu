const express = require('express')
const ejs = require('ejs')
const mysql = require('mysql')
const showdown = require('showdown')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'jianshu',
    user: 'root',
    password: '4512'
})

const router = express.Router()

router.use('/:id', (req, res)=>{                          // 读文章
    db.query(`select * from artical where id='${req.params.id}'`, (err, data)=>{
        if(err) {
            console.log('获取文章失败-read')
        }
        else {
            const converter = new showdown.Converter()

            const title =  data[0].title
            const content = converter.makeHtml(data[0].content)

            ejs.renderFile(__dirname + '/../read.ejs', {title: title, content: content}, (err, data)=>{
                if(err) {
                    res.send('渲染文章失败')
                }
                else {
                    res.send(data)                    
                }
            })                        
        }
    })
})

module.exports = router