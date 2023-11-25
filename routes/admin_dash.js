const express = require('express')
const router = express.Router()

const tokoProfile = require('../models/tokoProfile')

router.get('/admin-dash', (req,res)=>{
    if (req.session.user === undefined){
        res.render('pages/login', {
            pageTitle: "Login",
            path: "login",
            errorMsg: "none"
    })}else { tokoProfile.findOne({emailToko: req.session.user}).then( async (r)=>{
        if(r==null){
            res.render('pages/admin_profile', {
                pageTitle: "admin_profile",
                path: "admin_profile",
            })
        } else{
            res.render('pages/admin_dash', {
                pageTitle: "admin_dash",
                path: "admin_dash",
            })
        }
    })}
})


module.exports = router