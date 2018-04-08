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

router.use('/:id', (req, res)=>{                           // 写文章
    db.query(`select * from artical where id='${req.params.id}'`, (err, data)=>{
        if(err) {
            console.log('获取文章失败-write')
        }
        else {
            if(data.length > 0) {
                const title =  data[0].title
                const content = data[0].content
                const id = data[0].id
    
                ejs.renderFile(__dirname + '/../write.ejs', {title: title, content: content, id: id}, (err, data)=>{
                    if(err) {
                        res.send('error')
                    }
                    else {
                        res.send(data)
                    }
                })            
            }
            else {
                res.send('not found')
            }
        }
    })
})

router.use('/', (req, res) => {                    // 写文章
    db.query(`insert into artical(title, content) values('', '')`, (err) => {
        if(err) {
            console.log('新建文章失败')
        }
        else {
            db.query(`select max(id) from artical`,(err, data) => {
                if(err) {
                    console.log('查询最大 ID 失败')
                }
                else {
                    const maxId = data[0]['max(id)']
                    res.redirect(`/write/${maxId}`)
                }
            })                
        }
    })    
})

module.exports = router