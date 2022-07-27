const mongoose = require('mongoose');

const HistoricalTransactionSchema = mongoose.Schema({
    account_number: String,
    current_balance: Number,
    amount: Number,
    journal_number: String,
    action: String,
    transaction_type: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Historical_Transaction', HistoricalTransactionSchema);