const express = require('express')
const router = express.Router()

router.get('/login',(req,res) => {
    res.render('pages/login', {
        pageTitle: "Login",
        path: "login"
    });
});

router.post('/login',(req,res)=>{
    // req.body validate
    res.redirect('/home')
})

module.exports = router