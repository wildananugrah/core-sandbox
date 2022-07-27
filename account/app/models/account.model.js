const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    account_number: String,
    currency: String,
    balance: Number, 
    status: String,
    cif_number: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);