const mongoose = require ('mongoose')

const tokoProdukSchema = new mongoose.Schema({
    idProdukJual: {
        type: String,
        required: true,
    },
    produk: {
        type: String,
        required: true
    },
    referrer: {
        type: Number,
        required: true
    },
    stok: {
        type: Number,
        required: true
    },
    harga: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('tokoProduk', tokoProdukSchema)