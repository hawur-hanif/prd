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
        default: 0
    },
    productAmount: {
        type:Number,
        required: true
    },
    productImg: {
        contentType: String,
        data: Buffer
    },
    productPrice:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('catalogue',catalogueSchema)