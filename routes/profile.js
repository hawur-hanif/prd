const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/profile', async (req,res)=>{
    if(!req.session.isLoggedIn){
        res.render('pages/profile', {
            pageTitle: "Profile",
            path: "profile", 
            errMsg: "You are not Logged in"
        })
    }else{
        await User.findOne({email:req.session.user}).then((user)=>{
            res.render('pages/profile', {
                pageTitle: "Profile",
                path: "profile", 
                errMsg: 'none',
                user: user
            })
        })  
    }
})




// update 
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage:storage})
const path = require('path')


router.post('/profile', upload.single('img'), async (req,res)=>{
    let update = {}
    if(req.body.namaDepan){ update.namaDepan = req.body.namaDepan}
    if(req.body.namaBelakang){ update.namaBelakang = req.body.namaBelakang}
    if(req.body.username){ update.username = req.body.username}
    if(req.file){ update.userImgURL = req.file.filename}
    await User.findOneAndUpdate({email: req.session.user},update).then(()=>{
        res.redirect('/profile')
    })
})

module.exports = router