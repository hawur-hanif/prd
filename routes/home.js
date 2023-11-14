const express = require('express')
const router = express.Router()

router.get('/home',(req,res)=>{
    res.render('pages/home', {
        pageTitle: "Home",
        path: "home",
        errorMsg: "none"
    })
})

module.exports = router