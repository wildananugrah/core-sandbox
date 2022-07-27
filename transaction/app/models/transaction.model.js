const mongoose = require('mongoose');

const TransactionScheme = mongoose.Schema({
    cif_number: String,
    debit_account_number: String,
    debit_account_balance: Number,
    credit_account_number: String, 
    credit_account_balance: Number,
    amount: Number,
    transaction_type: String,
    journal_number: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionScheme);