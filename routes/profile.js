const express = require('express')
const router = express.Router()
const userProfile = require('../models/userProfile')

router.get('/profile', (req,res)=>{
    res.render('pages/profile', {
        pageTitle: "Profile",
        path: "profile"
    })
})

module.exports = router