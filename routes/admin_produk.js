const express = require('express')
const router = express.Router()
const tokoProduk = require('../models/tokoProduk')
const tokoProfile = require('../models/tokoProfile')

router.get('/admin-produk', (req,res)=>{
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
            tokoProduk.find({emailPenjual: req.session.user}).then((produk)=>{
                res.render('pages/admin_produk', {
                    pageTitle: "Admin-Produk",
                    path: "admin_produk",
                    errorMsg: "none",
                    produks: produk
            })
           })
        }
    })}
})

router.post('/admin-produk', async (req,res)=>{ 
    await tokoProduk.findOne({produk: req.body.produk}).then( async (r)=>{
        if(r==null){
            const tokoproduk = new tokoProduk({
                emailPenjual: req.session.user,
                produk: req.body.produk,
                deskripsi: req.body.deskripsi,
                stok: req.body.stok,
                harga: req.body.harga,
                rating: 0,
                terjual:0
            })
            await tokoproduk.save()
            tokoProduk.find({emailPenjual: req.session.user}).then((produk)=>{
                res.render('pages/admin_produk', {
                    pageTitle: "Admin-Produk",
                    path: "admin_produk",
                    errorMsg: "none",
                    produks: produk
            })
           })
        } else{
            const updatetokoProduk = tokoProduk.updateOne({
                produk: req.body.produk, emailPenjual: req.session.user
            }, {
                $set: {
                    deskripsi: req.body.deskripsi,
                    stok: req.body.stok,
                    harga: req.body.harga,
                }
            })
            await updatetokoProduk.updateOne()
            tokoProduk.find({emailPenjual: req.session.user}).then((produk)=>{
                res.render('pages/admin_produk', {
                    pageTitle: "Admin-Produk",
                    path: "admin_produk",
                    errorMsg: "none",
                    produks: produk
            })
           })
        }
    })
})
module.exports = router
