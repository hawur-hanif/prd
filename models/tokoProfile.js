const mongoose = require ('mongoose')

const tokoProfileSchema = new mongoose.Schema({
    emailToko: {
        type: String,
        required: true,
    },
    tokoImg : {
        type: Buffer
        
    },
    tokoNama :{
        maxLength: 20,
        type: String,
        required: true
    },
    tokoDeskripsi: {
        type: String,
        required: true
    },
    tokoKategori: {
        type: String,
    },
    tokoNamaPemilik: {
        type: String,
        required: true
    },
    tokoRekening: {
        type: Number,
        required: true
    },
    tokoAlamat: {
        alamatLengkap: {
            type: String,
            required: true
        },
        kota: {
            type: String,
            required: true
        },
        provinsi: {
            type: String,
            required: true
        },
    }

})

module.exports = mongoose.model('tokoProfile', tokoProfileSchema)