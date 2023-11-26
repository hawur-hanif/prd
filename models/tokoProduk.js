const mongoose = require ('mongoose')

const tokoProdukSchema = new mongoose.Schema({
    emailPenjual: {
        type: String,
        required: true,
    },
    produk: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    stok: {
        type: Number,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    terjual: {
        type: Number,

    },
    rating: {
        type: Number
    }

})

module.exports = mongoose.model('tokoProduk', tokoProdukSchema)