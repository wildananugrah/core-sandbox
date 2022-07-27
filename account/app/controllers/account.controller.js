const Account = require('../models/account.model.js');
const randomLengthNumber = require('../utils/random_number.js');

// Create and Save a new Account
exports.create = (req, res) => {
    
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Account content can not be empty"
        });
    }

    // Create a Account
    const account = new Account({
        account_number: req.body.account_number || randomLengthNumber(10), 
        currency: req.body.currency,
        balance: 0,
        status: 'BUKA',
        cif_number: req.body.cif_number
    });

    // Save Account in the database
    account.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Account."
        });
    });
};

// Retrieve and return all accounts from the database.
exports.findAll = (req, res) => {
    Account.where({cif_number: req.params.cif_number}).find()
    .then(accounts => {
        res.send(accounts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving accounts."
        });
    });
};

// Find a single account with a account_number
exports.findOne = (req, res) => {
    Account.where({account_number: req.params.account_number}).findOne()
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });            
        }
        res.send(account);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });                
        }
        return res.status(500).send({
            message: "Error retrieving account with account_number " + req.params.account_number
        });
    });
};

// Update a account identified by the account_number in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Account content can not be empty"
        });
    }

    // Find account and update it with the request body
    Account.findOneAndUpdate({account_number: req.params.account_number}, {status : req.body.status})
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });
        }
        res.send({message: "Account updated successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });                
        }
        return res.status(500).send({
            message: "Could not delete account with account_number " + req.params.account_number
        });
    });
};

// Delete a account with the specified account_number in the request
exports.delete = (req, res) => {
    Account.findOneAndRemove({account_number: req.params.account_number})
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });
        }
        res.send({message: "Account deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });                
        }
        return res.status(500).send({
            message: "Could not delete account with account_number " + req.params.account_number
        });
    });
};