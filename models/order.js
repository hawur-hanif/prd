const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    cart : [{
        productId : {
            type:String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type:Date,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        address: {
            location: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            province: {
                type: String,
                required: true
            }
        },
        payMethod: {
            type: String,
            required: true
        },
        bankNum: {
            type: Number,
            required: true
        }
    }],
})

module.exports = mongoose.model('order',orderSchema)