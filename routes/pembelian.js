const express = require('express')
const router = express.Router()
const catalogue = require('../models/catalogue');
const User = require('../models/user');


router.get('/pembelian', async (req,res) => {
    if(req.query.productId == undefined){
        res.redirect('/homeload')
    }

    await catalogue.findOne({productId: req.query.productId}).then((product)=>{
        if(!req.session.isLoggedIn){
            res.render('pages/pembelian', {
                pageTitle: "Pembelian",
                path: "pembelian",
                product: product,
                errMsg: 'You are not logged in'
            });
        } else {
            res.render('pages/pembelian', {
                pageTitle: "Pembelian",
                path: "pembelian",
                product: product,
                errMsg: 'none'
            });
        }
        
    }).catch(()=>{
        res.render('pages/home', {
            pageTitle: "Home",
            path: "home",
            errorMsg: "gk tau",
            products: "none"
        })
    })

  });

router.post('/pembelian', async (req,res)=>{
    let item = { productId: req.body.productId, amount: req.body.amount}
    await User.findOneAndUpdate({email:req.session.user}, { $push: {cart: item } })
    res.redirect('/cart')
})

module.exports = router