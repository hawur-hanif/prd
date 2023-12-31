const express = require('express')
const router = express.Router()
const tokoTransaksi = require('../models/tokoTransaksi')
const tokoProfile = require('../models/tokoProfile')

router.get('/admin-ongoing', (req,res)=>{
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
            tokoTransaksi.find({emailPenjual: req.session.user, selesai: false}).then((on)=>{
                res.render('pages/admin_ongoing', {
                    pageTitle: "Admin-ongoing",
                    path: "admin_ongoing",
                    errorMsg: "none",
                    ongoing: on
            })
           })
        }
    })}
})
router.post('/admin-ongoing', async (req,res)=>{
    await tokoTransaksi.find({idJual: req.body.idItem}).then( async(id) =>{
        if(id){
            console.log(req.body.idItem)
        }
        const updatetokotransaksi = tokoTransaksi.updateOne({
            idJual: req.body.idItem
        }, {
            $set: {
            status: "selesai",
            selesai: "true"
        }
        })
        await updatetokotransaksi.updateOne()

        tokoTransaksi.find({emailPenjual: req.session.user, selesai: false}).then((on)=>{
            res.render('pages/admin_ongoing', {
                pageTitle: "Admin-ongoing",
                path: "admin_ongoing",
                errorMsg: "none",
                ongoing: on
        })
       })
    })
    
})

module.exports = router