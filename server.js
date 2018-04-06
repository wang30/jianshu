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

server.use('/api/save', (req, res) => {                               // 接口，保存文章
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

server.use('/p/:id', (req, res)=>{                          // 读文章
    db.query(`select * from artical where id='${req.params.id}'`, (err, data)=>{
        if(err) {
            console.log('获取文章失败-read')
        }
        else {
            const converter = new showdown.Converter()

            const title =  data[0].title
            const content = converter.makeHtml(data[0].content)

            ejs.renderFile('read.ejs', {title: title, content: content}, (err, data)=>{
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

server.use('/write/:id', (req, res)=>{                           // 写文章
    db.query(`select * from artical where id='${req.params.id}'`, (err, data)=>{
        if(err) {
            console.log('获取文章失败-write')
        }
        else {
            if(data.length > 0) {
                const title =  data[0].title
                const content = data[0].content
                const id = data[0].id
    
                ejs.renderFile('write.ejs', {title: title, content: content, id: id}, (err, data)=>{
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

server.use('/write', (req, res) => {                    // 写文章
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