const express = require('express')
const router = express.Router()
const catalogue = require('../models/catalogue');

router.get('/pembelian', async (req,res) => {
    if(req.query.productId == undefined){
        res.redirect('/homeload')
    }

    await catalogue.findOne({productId: req.query.productId}).then((product)=>{
        res.render('pages/pembelian', {
            pageTitle: "Pembelian",
            path: "pembelian",
           product: product
        });
    }).catch(()=>{
        res.render('pages/home', {
            pageTitle: "Home",
            path: "home",
            errorMsg: "gk tau",
            products: "none"
        })
    })
  });


module.exports = router