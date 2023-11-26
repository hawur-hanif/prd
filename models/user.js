const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    namaDepan: {
        type: String
    },
    nameBelakang: {
        type: String
    },
    cart:[{
        productId: String, amount: Number
    }],
    userImg: {
        contentType: String,
        data: Buffer
    }
})

module.exports = mongoose.model('user',userSchema)