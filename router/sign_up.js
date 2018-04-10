const express = require('express')
const ejs = require('ejs')

const router = express.Router()

router.use('/', (req, res) => {                  // 注册
    ejs.renderFile(__dirname + '/../template/sign_up.ejs', (err, data)=>{
        if(err) {
            res.send(err)
        }
        else {
            // res.cookie('liu', 'liu', {path: '/sign_in', maxAge: 30*24*3600*1000})
            req.secret = 'jfnbcxgshenstywm'

            res.cookie('user', 'danny', {signed: true})
            
            console.log(req.cookies)
            console.log(req.signedCookies)
            res.send(data)
        }
    })
})

module.exports = router