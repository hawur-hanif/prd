const express = require('express')
const router = express.Router()
const tokoProfile = require('../models/tokoProfile')

router.get('/admin-toko',async (req,res)=>{
    if (req.session.user === undefined){
        res.render('pages/login', {
            pageTitle: "Login",
            path: "login",
            errorMsg: "none"
    })}else{
        await tokoProfile.findOne({emailToko: req.session.user}).then((profil)=>{
            if(profil==null){
                 tokoProfile.find({emailToko: "defaultprop"}).then((prf)=>{
                    res.render('pages/admin_profile', {
                        pageTitle: "Admin-Profile",
                        path: "admin_profile",
                        errorMsg: "none",
                        tokoprf: prf
                })
               })
            }else{
                tokoProfile.find({emailToko: req.session.user}).then((profil)=>{
                res.render('pages/admin_profile', {
                    pageTitle: "Admin-Profile",
                    path: "admin_profile",
                    errorMsg: "none",
                    tokoprf: profil
                })
            })
            }
            
        })
    }
})

router.post('/admin-toko', async (req,res)=>{
    await tokoProfile.findOne({emailToko: req.session.user}).then( async (r)=>{
        if(r==null){
            const tokoprofile = new tokoProfile({
                emailToko: req.session.user,
                tokoImg: req.body.imgToko,
                tokoNama: req.body.tokoNama, 
                tokoDeskripsi: req.body.tokoDeskripsi,
                tokoKategori: req.body.referrer,
                tokoNamaPemilik: req.body.namaPemilik,
                tokoRekening: req.body.tokoRekening,
                tokoAlamat: {
                    alamatLengkap: req.body.alamatLengkap,
                    kota: req.body.kota,
                    provinsi: req.body.provinsi 
                }
            })
            await tokoprofile.save()
            res.render('pages/admin_profile', {
                pageTitle: "admin_profile",
                path: "admin_profile"
            })
        } else{
            const updatetokoProfile = tokoProfile.updateOne({
                emailToko: req.session.user
            }, {
                $set: {
                    tokoImg: req.body.imgToko,
                    tokoNama: req.body.tokoNama, 
                    tokoDeskripsi: req.body.tokoDeskripsi,
                    tokoKategori: req.body.referrer,
                    tokoNamaPemilik: req.body.namaPemilik,
                    tokoRekening: req.body.tokoRekening,
                    tokoAlamat: {
                        alamatLengkap: req.body.alamatLengkap, 
                        kota: req.body.kota,
                        provinsi: req.body.provinsi 
                    }
                }
            })
            await updatetokoProfile.updateOne()
            res.render('pages/admin_profile', {
                pageTitle: "admin_profile",
                path: "admin_profile",
            })
        }
    })
})
module.exports = router
