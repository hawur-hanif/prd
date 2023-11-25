const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/profile', async (req,res)=>{
    if(!req.session.isLoggedIn){
        res.render('pages/profile', {
            pageTitle: "Profile",
            path: "profile", 
            errMsg: "You are not Logged in"
        })
    }else{
        await User.find({email:req.session.user}).then((user)=>{
            res.render('pages/profile', {
                pageTitle: "Profile",
                path: "profile", 
                errMsg: 'none',
                user: user
            })
        })  
    }
})

module.exports = router