const express = require('express')
const router = express.Router()

router.get('/cart',(req,res) => {
    res.render('pages/cart', {
        pageTitle: "Cart",
        path: "cart",
        errorMsg: "none"
    });
});

module.exports = router