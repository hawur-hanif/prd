const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { body, validationResult} = require('express-validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('userLogin',userSchema)

router.get('/login', (req,res) => {
    if (!req.session.isLoggedIn)
        res.render('pages/login', {
            pageTitle: "Login",
            path: "login",
            errorMsg: "none"
    })
    else{
        res.redirect('/home')
    }
    ;
});

router.post('/login', async (req,res)=>{
    await User.findOne({email:req.body.email}).then(user =>{
        if(req.body.password == user.password){
            req.session.isLoggedIn = true
            req.session.user = user
            res.redirect('/home')
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