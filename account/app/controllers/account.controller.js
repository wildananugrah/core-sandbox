const Account = require('../models/account.model.js');
const randomLengthNumber = require('../utils/random_number.js');

// Create and Save a new Account
exports.create = (req, res) => {
    
    var start = new Date()

    // Validate request
    if(!req.body) {
        var elapsed_time = new Date() - start
        return res.status(400).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Account content can not be empty"
            }
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
        var elapsed_time = new Date() - start
        res.send({data : data, elapsed_time: `${elapsed_time}ms`});
    }).catch(err => {
        res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: err.message || "Some error occurred while creating the Account."
            }
        });
    });
};

exports.update_balance = (req, res) => {

    var start = new Date()

    // Validate request
    if(!req.body) {
        var elapsed_time = new Date() - start
        return res.status(400).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Account content can not be empty"
            }
        });
    }

    Account.findOneAndUpdate({account_number: req.params.account_number}, {balance : req.body.balance})
    .then(account => {
        var elapsed_time = new Date() - start
        if(!account) {
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });
        }
        
        res.send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Account updated successfully!"
            }
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });                
        }

        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Could not delete account with account_number " + req.params.account_number
            }
        });
    });
}

exports.settlement = async (req, res) => {
    
    var start = new Date()

    // Validate request
    if(!req.body) {
        var elapsed_time = new Date() - start
        return res.status(400).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Account content can not be empty"
            }
        });
    }

    // Update debit account balance
    try{
        const debit_account_update_response = await Account.findOneAndUpdate({account_number: req.body.debit_account_number}, {balance : req.body.debit_account_balance})
        if(!debit_account_update_response)
        {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.body.debit_account_number
                }
            });
        }
    } 
    catch (err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.body.debit_account_number
                }
            });                
        }

        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Could not update account with account_number " + req.body.debit_account_number
            }
        });
    }

    // Update credit account balance
    try{
        const credit_account_update_response = await Account.findOneAndUpdate({account_number: req.body.credit_account_number}, {balance : req.body.credit_account_balance})
        if(!credit_account_update_response)
        {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.body.credit_account_number
                }
            });
        }
    } 
    catch (err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.body.debit_account_number
                }
            });                
        }

        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Could not update account with account_number " + req.body.debit_account_number
            }
        });
    }

    var elapsed_time = new Date() - start
    res.send({
        elapsed_time: `${elapsed_time}ms`, 
        data : {
            message: "Account updated successfully!"
        }
    });
}

// Retrieve and return all accounts from the database.
exports.findAll = (req, res) => {
    
    var start = new Date()

    Account.where({cif_number: req.params.cif_number}).find()
    .then(accounts => {

        var elapsed_time = new Date() - start
        res.send({elapsed_time: `${elapsed_time}ms`, data: accounts});
    }).catch(err => {
        var elapsed_time = new Date() - start
        res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: err.message || "Some error occurred while retrieving accounts."
            }
        });
    });
};

// Find a single account with a account_number
exports.findOne = (req, res) => {

    var start = new Date()

    Account.where({account_number: req.params.account_number}).findOne()
    .then(account => {
        if(!account) {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });            
        }
        var elapsed_time = new Date() - start
        res.send({ elapsed_time: `${elapsed_time}ms`, data: account });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });                
        }

        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Error retrieving account with account_number " + req.params.account_number
            }
        });
    });
};

// Update a account identified by the account_number in the request
exports.update = (req, res) => {

    var start = new Date()

    // Validate Request
    if(!req.body) {
        var elapsed_time = new Date() - start
        return res.status(400).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Account content can not be empty"
            }
        });
    }

    // Find account and update it with the request body
    Account.findOneAndUpdate({account_number: req.params.account_number}, {status : req.body.status})
    .then(account => {
        if(!account) {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });
        }
        var elapsed_time = new Date() - start
        res.send({
            elapsed_time: `${elapsed_time}ms`, 
            data : {
                message: "Account updated successfully!"
            }
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Could not delete account with account_number " + req.params.account_number
            }
        });
    });
};

// Delete a account with the specified account_number in the request
exports.delete = (req, res) => {

    var start = new Date()

    Account.findOneAndRemove({account_number: req.params.account_number})
    .then(account => {
        if(!account) {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });
        }
        var elapsed_time = new Date() - start
        res.send({
            elapsed_time: `${elapsed_time}ms`, 
            data : {
                message: "Account deleted successfully!"
            }
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data :{
                    message: "Account not found with account_number " + req.params.account_number
                }
            });                
        }

        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Could not delete account with account_number " + req.params.account_number
            }
        });
    });
};