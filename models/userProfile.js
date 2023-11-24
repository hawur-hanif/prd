const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model('profileUser',profileSchema)