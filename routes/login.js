const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/login', (req,res) => {
    if (!req.session.isLoggedIn)
        res.render('pages/login', {
            pageTitle: "Login",
            path: "login",
            errorMsg: "none"
    })
    else{
        res.redirect('/homeload')
    }
    ;
});

router.post('/login', async (req,res)=>{
    await User.findOne({email:req.body.email}).then(user =>{
        if(req.body.password == user.password){
            req.session.isLoggedIn = true
            req.session.user = user.email
            res.redirect('/homeload')
        }else{
            res.render('pages/login', {
                pageTitle: "Login",
                path: "login",
                errorMsg: "Password salah"
            });    
        }
    })
    .catch(()=>{
        res.render('pages/login', {
            pageTitle: "Login",
            path: "login",
            errorMsg: "Email tidak terhubung dengan akun"
        });       
    })
})

module.exports = router