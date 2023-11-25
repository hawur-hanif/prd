const mongoose = require('mongoose')

const catalogueSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,
    },
    productRating: {
        type: Number,
    },
    productAmount: {
        type:Number,
        required: true
    },
    productImgURL: {
        type:String,
        required:true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productSource:{
        type: String,
        required: true
    },
    productDesc:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('catalogue',catalogueSchema)