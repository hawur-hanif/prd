const express = require('express');
const User = require('../models/user');
const Catalogue = require('../models/catalogue');
const router = express.Router()


router.get('/cart', async (req,res) => {
    if (!req.session.isLoggedIn){
        res.render('pages/cart', {
            pageTitle: "Cart",
            path: "cart",
            errMsg: "You are not logged in",
            cart: 'none'
        });
    } else{
        await User.findOne({email:req.session.user}).then( async (user)=>{
            let ids = user.cart.map((x)=>{
                return x.productId
            })

            console.log(ids)
            await Catalogue.find({productId: ids}).sort({productId : 1}).then(product=>{
                console.log(product)
                let cart = product.map((x,i)=>{return [x,user.cart[i].amount]})
                console.log(cart)
                res.render('pages/cart', {
                    pageTitle: "Cart",
                    path: "cart",
                    errMsg: "none",
                    cart: user.cart.length == 0 ? null : cart
                });
            })
        })  
    }    
});

router.post('/deCart', async (req,res)=>{
    console.log(req.body)
    await User.updateOne( {email:req.session.user}, {
        $pull: {cart : {productId: req.body.productId }}
    })
    res.redirect('back')
    })

router.post('/chgAmount', async (req,res)=>{
    console.log(req.body)
    await User.updateOne( {email:req.session.user, cart: { '$elemMatch': {productId: req.body.productId} }}, {
        $set: {'cart.$.amount' : req.body.kuantitas}
    })
    res.redirect('back')
    })

router.get('/chgAmount', (req,res)=>{
    res.redirect('back')
})



module.exports = router
