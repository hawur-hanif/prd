const mongoose = require ('mongoose')

const tokoTransaksiSchema = new mongoose.Schema({
    idJual: {
        type: Number,
        required: true,
    },
    namaCustomer: {
        type: String,
        required: true
    },
    emailPenjual: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        default: () => Date.now(),
    },
    produk: {
        namaProduk: {
            type: String,
            required: true
        },
        banyakProduk: {
            type: Number,
            required: true
        }
    },
    totalHarga: {
        type: Number,
        required: true
    },
    metode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    selesai: {
        type: Boolean,
    }

})

module.exports = mongoose.model('tokoTransaksi', tokoTransaksiSchema)