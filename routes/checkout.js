const express = require('express')
const router = express.Router()
const Catalogue = require('../models/catalogue')
const User = require('../models/user');
const Order = require('../models/order');

router.get('/checkout', async (req,res) => {
    if (!req.session.isLoggedIn){
       res.redirect('/login')
    } else{
        await User.findOne({email:req.session.user}).then( async (user)=>{
            let ids = user.cart.map((x)=>{
                return x.productId
            })

            await Catalogue.find({productId: ids}).then(product=>{
                let cart = product.map((x,i)=>{return [x,user.cart[i].amount]})
                res.render('pages/checkout', {
                    pageTitle: "Checkout",
                    path: "checkout",
                    cart: user.cart.length == 0 ? null : cart,
                    user: user
                });
            })
        })  
    }    
});

router.post('/checkout', async (req,res)=>{
    let cart = []
    req.body.cart.split(',').map((v,i,arr)=>{if(i%2==0){return [v,arr[i+1]]};return null}).filter((v)=>{ return v != null}).forEach(product => {
        cart.push({
            productId: product[0],
            amount: product[1],
            date: Date.now(),
            status: 'sedang diproses',
            address: {
                location: req.body.location,
                city: req.body.city,
                province: req.body.province
            },
            payMethod: req.body.payMethod,
            bankNum: req.body.bankNum
        })
    });
    
    await Order.findOneAndUpdate(
        {email: req.session.user},
        {$push: { cart: cart}},
        {upsert: true}
    ).then(async ()=>{
        await User.updateOne( {email:req.session.user}, {
            $pull: {cart : {productId: {$in: cart.map((v)=>{ return v.productId })}  }}
        }).then(()=>{
            res.redirect('/riwayat')    
        })
    })
})




module.exports = router