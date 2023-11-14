const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    ProductDesc: {
        type: String,
        required: true
    },
    ProductImg: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('catalogue',catSchema)