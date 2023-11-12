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

router.get('/login',(req,res) => {
    res.render('pages/login', {
        pageTitle: "Login",
        path: "login"
    });
});

router.post('/login', 
    body('email').isEmail(), 
    body('password').custom(async value=>{

    }),
    async (req,res)=>{
        const valResult = validationResult(req)
        if (valResult.isEmpty()){
            res.redirect('/home');
        }
        else{
            // res.render('pages/login', {
            //     pageTitle: "Login",
            //     path: "login",
            //     errorMsg: "Email tidak terhubung dengan akun"
            // });
            // console.log(valResult)


        
    }
    const user = await User.findOne({email:"bruh"})
    console.log(user.email,user.password)
})

module.exports = router