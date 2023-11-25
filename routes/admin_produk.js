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
            res.render('pages/admin_produk', {
                pageTitle: "admin_produk",
                path: "admin_produk",
            })
        }
    })}
})

router.post('/admin-produk', async (req,res)=>{ 
    await tokoProduk.findOne({produk: req.body.produk}).then( async (r)=>{
        if(r==null){
            const tokoproduk = new tokoProduk({
                idProdukJual: req.session.user,
                produk: req.body.produk,
                referrer: req.body.referrer,
                stok: req.body.stok,
                harga: req.body.harga
            })
            await tokoproduk.save()
            res.render('pages/admin_produk', {
                pageTitle: "admin_produk",
                path: "admin_produk"
            })
        } else{
            const updatetokoProduk = tokoProduk.updateOne({
                produk: req.body.produk
            }, {
                $set: {
                    referrer: req.body.referrer,
                    stok: req.body.stok,
                    harga: req.body.harga
                }
            })
            await updatetokoProduk.updateOne()
            res.render('pages/admin_produk', {
                pageTitle: "admin_produk",
                path: "admin_produk",
            })
        }
    })
})
module.exports = router