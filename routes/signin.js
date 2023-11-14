const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/signin',(req,res)=>{
    res.render('pages/signin', {
        pageTitle: "Sign In",
        path: "login",
        errorMsg: "none"
    })
})

router.post('/signin', async (req,res)=>{
    await User.findOne({email:req.body.email}).then( async (r)=>{
        if(r==null){
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            await user.save()
            req.session.isLoggedIn = true
            req.session.user = req.body.email
            res.redirect('/home')
        }else{
            res.render('pages/signin', {
                pageTitle: "Sign In",
                path: "login",
                errorMsg: "Email has already been used for another account"
            })
        }        
    })
})

module.exports = router