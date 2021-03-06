const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantita: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    edizione: {
        type: String,
        required: true,
    },
    descrizione: {
        type: String,
        required: true,
    },
    prezzo: {
        type: Number,
        required: true,
    },
    colori: {
        type: Array,
        required: true
    },
    tipi: {
        type: Array,
        required: true
    },
    rarita: {
        type: String,
        required: true
    },
    inVendita: {
        type: Boolean,
        required: true
    },
    daVendere: {
        type: Number,
        required: true
    }

});

const CardCollection = mongoose.model('cardCollections', schema);

module.exports = CardCollection;