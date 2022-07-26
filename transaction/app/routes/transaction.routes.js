module.exports = (app) => {
    const transaction = require('../controllers/transaction.controller.js');

    // Debit transaction
    app.post('/transaction/debit', transaction.debit);

    // Credit transaction
    app.post('/transaction/credit', transaction.credit);

    // Transfer transaction
    app.post('/transaction/transfer', transaction.transfer);

    // Find All Transaction by cif_number
    app.get('/transactions/:cif_number', transaction.findAll);
}