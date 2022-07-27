module.exports = (app) => {
    const historical_transaction = require('../controllers/historical_transaction.controller.js');

    // Create a new account
    app.get('/historical_transaction/:account_number/:skip/:limit', historical_transaction.findAll);
}