const express = require('express')
const ejs = require('ejs')

const router = express.Router()

router.use('/', (req, res) => {                  // 注册
    ejs.renderFile(__dirname + '/../template/sign_up.ejs', (err, data)=>{
        if(err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
})

module.exports = router