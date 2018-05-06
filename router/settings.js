const express = require('express')
const ejs = require('ejs')

const router = express.Router()

router.use('/', (req, res) => {
    ejs.renderFile(__dirname + '/../template/settings.ejs', (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.send(data)
        }        
    })
})

module.exports = router