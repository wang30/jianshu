const express = require('express')
const ejs = require('ejs')

const router = express.Router()

router.use('/', (req, res) => {                  // 登录
    ejs.renderFile(__dirname + '/../sign_in.ejs', (err, data)=>{
        if(err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
})

module.exports = router