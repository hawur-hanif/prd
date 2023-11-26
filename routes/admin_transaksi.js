const express = require('express')
const router = express.Router()
const tokoTransaksi = require('../models/tokoTransaksi')
const tokoProfile = require('../models/tokoProfile')

router.get('/admin-transaksi', (req,res)=>{
    if (req.session.user === undefined){
        res.render('pages/login', {
            pageTitle: "Login",
            path: "login",
            errorMsg: "none"
    })}else { tokoProfile.findOne({emailToko: req.session.user}).then( async (r)=>{
        if(r==null){
            tokoProfile.find({emailToko: "defaultprop"}).then((prf)=>{
                res.render('pages/admin_profile', {
                    pageTitle: "Admin-Profile",
                    path: "admin_profile",
                    errorMsg: "none",
                    tokoprf: prf
            })
           })
        } else{
            tokoTransaksi.find({emailPenjual: req.session.user}).then((trnsks)=>{
                res.render('pages/admin_transaksi', {
                    pageTitle: "Admin-transaksi",
                    path: "admin_transaksi",
                    errorMsg: "none",
                    transaksi: trnsks
                })
            })
        }
    })}
})


module.exports = router