const express = require('express')
const router = express.Router()
const Catalogue = require('../models/catalogue')
const Order = require('../models/order');

router.get('/riwayat', async (req,res) => {
    if (!req.session.isLoggedIn){
        res.redirect('/login')
    }

    await Order.findOne({email: req.session.user}).then( async (item)=>{
        let ids = item.cart.map((x)=>{
            return x.productId
        })
        await Catalogue.find({productId: ids}).then((product)=>{

            res.render('pages/riwayat', {
                pageTitle: "Riwayat Pembelian",
                path: "riwayat",
                errorMsg: "none",
                cart: item.cart.map((v,i)=>{
                    let a = v.toJSON()
                    let b = product[i].toJSON()
                    return { ...a,...b }
                }),
                
            })
        })
    })
    
  });

module.exports = router