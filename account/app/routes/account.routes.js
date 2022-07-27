module.exports = (app) => {
    const account = require('../controllers/account.controller.js');

    // Create a new account
    app.post('/account', account.create);

    // Retrieve all account
    app.get('/accounts/:cif_number', account.findAll);

    // Retrieve a single account with accountId
    app.get('/account/:account_number', account.findOne);

    // Update a single account with account_number
    app.put('/account/:account_number', account.update);

    // Delete a account with accountId
    app.delete('/account/:account_number', account.delete);
}