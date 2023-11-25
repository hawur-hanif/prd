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
    tanggal: {
        type: Date,
        default: () => Date.now(),
    },
    total: {
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
    detil: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('tokoTransaksi', tokoTransaksiSchema)