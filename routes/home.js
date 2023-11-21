const express = require('express')
const router = express.Router()
const Catalogue = require('../models/catalogue')

router.get('/home',async (req,res)=>{
    await Catalogue.find({}).limit(11).then((products)=>{
        res.render('pages/home', {
            pageTitle: "Home",
            path: "home",
            errorMsg: "none",
            products: products
        })
    }).catch(()=>{
        res.render('pages/home', {
            pageTitle: "Home",
            path: "home",
            errorMsg: "none",
            products: "none"
        })
    })
})


const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'routes/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// postttt
const upload = multer({storage:storage})
const path = require('path')
const id = require('./id.json')

router.get('/postProduct',(req,res) => {
    res.render('pages/postProduct');
});

console.log(id.idNumber)

router.post('/postProduct', upload.single('img'), (req,res)=>{
    Catalogue.create({
        productId: id.idNumber,
        productName: req.body.nama,
        productAmount: req.body.amount,
        ProductRating: req.body.rating,
        productPrice: req.body.price,
        productImg: {
            contentType: "image/png",
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
    }).then((item,err)=>{
        if (err){
            console.log(err)
            console.log("bruh wtf")
        }else{
            item.save()
            id.idNumber += 1
            fs.writeFile(path.join(__dirname + '/id.json'),JSON.stringify(id), (err)=>{
                if(err){ console.log(err)}
            })
            res.redirect("/home")
        }
    })
})

module.exports = router