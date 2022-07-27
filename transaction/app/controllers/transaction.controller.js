const Transaction = require('../models/transaction.model.js');
const HistoricalTransaction = require('../models/historical_transaction.model.js');
const randomLengthNumber = require('../utils/random_number.js');
const axios = require('axios').default;

// Debit service
exports.debit = async (req, res) => {
    var start = new Date()

    // Retrieve detail account
    let account = {}
    try
    {
        account = await axios.get(`${process.env.ACCOUNT_HOST}/account/${req.body.account_number}`)
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not retrieve account with account_number " + req.body.account_number
        });
    }

    // Deduct account balance
    if(account.data.data.balance < req.body.amount)
    {
        var elapsed_time = new Date() - start
        return res.status(400).send({
            elapsed_time: `${elapsed_time}ms`,
            message: `Unsufficient fund ${req.body.account_number}`
        });  
    }
    const current_balance = account.data.data.balance - req.body.amount
    const journal_number = randomLengthNumber(10)

    // Store historical transaction
    const historical_transaction = new HistoricalTransaction({
        account_number: req.body.account_number, 
        current_balance: current_balance    ,
        amount: req.body.amount,
        journal_number: journal_number,
        action: "DEBIT",
        transaction_type: "WITHDRAWAL",
        description: req.body.description
    });

    try
    {
        await historical_transaction.save()
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.account_number
            });                
        }

        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not save account with account_number " + req.body.account_number
        });
    }

    // Update debit account balance
    try
    {
        const update_balance = await axios.put(`${process.env.ACCOUNT_HOST}/account/update_balance/${req.body.account_number}`, { balance: current_balance })
        var elapsed_time = new Date() - start
        res.send({ elapsed_time: `${elapsed_time}ms`, "message" : `${req.body.account_number} has been deducted by ${req.body.amount} successfully` })
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not update account with account_number " + req.body.account_number
        });
    }

}

// Credit service
exports.credit = async (req, res) => {
    
    var start = new Date()

    // Retrieve detail account
    let account = {}
    try
    {
        account = await axios.get(`${process.env.ACCOUNT_HOST}/account/${req.body.account_number}`)
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not retrieve account with account_number " + req.body.account_number
        });
    }

    // Add account balance
    const current_balance = account.data.data.balance + req.body.amount
    const journal_number = randomLengthNumber(10)

    // Store historical transaction
    const historical_transaction = new HistoricalTransaction({
        account_number: req.body.account_number, 
        current_balance: current_balance,
        amount: req.body.amount,
        journal_number: journal_number,
        action: "CREDIT",
        transaction_type: "DEPOSIT",
        description: req.body.description
    });

    try
    {
        await historical_transaction.save()
    }
    catch(err)
    {
        console.log(err)
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not save account with account_number " + req.body.account_number
        });
    }

    // Update credit account balance
    axios.put(`${process.env.ACCOUNT_HOST}/account/update_balance/${req.body.account_number}`, { balance: current_balance })
    .then(data => {
        var elapsed_time = new Date() - start
        res.send({ elapsed_time: `${elapsed_time}ms`, "message" : `${req.body.account_number} has been credited by ${req.body.amount} successfully`, journal_number: journal_number })
    })
    .catch(err => {
        var elapsed_time = new Date() - start
        res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: err.message || "Some error occurred while updating the Account Balance."
        });
    })
}

// Transfer service
exports.transfer = async (req, res) => {

    var start = new Date()

    // Retrieve detail debit account
    let debit_account = {}
    try
    {
        debit_account = await axios.get(`${process.env.ACCOUNT_HOST}/account/${req.body.debit_account_number}`)
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.debit_account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not update account with account_number " + req.body.debit_account_number
        });
    }

    // Retrieve detail credit account
    let credit_account = {}
    try
    {
        credit_account = await axios.get(`${process.env.ACCOUNT_HOST}/account/${req.body.credit_account_number}`)
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.credit_account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not update account with account_number " + req.body.credit_account_number
        });
    }

    // Settlement balance
    // Deduct account balance
    if(debit_account.data.data.balance < req.body.amount)
    {
        var elapsed_time = new Date() - start
        return res.status(400).send({
            elapsed_time: `${elapsed_time}ms`,
            message: `Unsufficient fund account_number: ${req.body.debit_account_number}`
        });  
    }

    const current_debit_account_balance = debit_account.data.data.balance - req.body.amount
    const current_credit_account_balance = debit_account.data.data.balance + req.body.amount
    const journal_number = randomLengthNumber(10)

    // Store historical transaction 
    const debit_historical_transaction = new HistoricalTransaction({
        account_number: req.body.debit_account_number, 
        current_balance: current_debit_account_balance,
        amount: req.body.amount,
        journal_number: journal_number,
        action: "DEBIT",
        transaction_type: "TRANSFER",
        description: req.body.description
    });

    try
    {
        await debit_historical_transaction.save()
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with account_number " + req.body.debit_account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Failed in writing to Historical Transaction: debit account number " + req.body.debit_account_number
        });
    }

    const credit_historical_transaction = new HistoricalTransaction({
        account_number: req.body.credit_account_number, 
        current_balance: current_credit_account_balance,
        amount: req.body.amount,
        journal_number: journal_number,
        action: "CREDIT",
        transaction_type: "TRANSFER",
        description: req.body.description
    });

    try
    {
        await credit_historical_transaction.save()
    }
    catch(err)
    {
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Failed in writing to Historical Transaction: credit account number " + req.body.credit_account_number
        });
    }

    // Store Transaction transaction
    const transaction = new Transaction({
        cif_number: req.body.cif_number,
        debit_account_number: req.body.debit_account_number,
        debit_account_balance: current_debit_account_balance,
        credit_account_number: req.body.credit_account_number, 
        credit_account_balance: current_credit_account_balance,
        amount: req.body.amount,
        transaction_type: "TRANSFER",
        journal_number: journal_number,
        description: req.body.description
    });

    try
    {
        await transaction.save()
    }
    catch(err)
    {
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Failed in writing to Transaction " + req.body.credit_account_number
        });
    }

    // Update account balance
    try
    {
        const debit_account_balance_update = await axios.put(`${process.env.ACCOUNT_HOST}/account/update_balance/${req.body.debit_account_number}`, { balance: current_debit_account_balance })
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with debit account_number " + req.body.debit_account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not update account with debit account_number " + req.body.debit_account_number
        });
    }
    
    try
    {
        const credit_account_balance_update = await axios.put(`${process.env.ACCOUNT_HOST}/account/update_balance/${req.body.credit_account_number}`, { balance: current_credit_account_balance })
        var elapsed_time = new Date() - start
        res.send({ elapsed_time: `${elapsed_time}ms`, "message" : `${req.body.amount} has been transfered from ${req.body.debit_account_number} to ${req.body.credit_account_number} successfully` })
    }
    catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with credit account_number " + req.body.credit_account_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Could not update account with credit account_number " + req.body.credit_account_number
        });
    }
}

exports.findAll = (req, res) => {

    var start = new Date()

    Transaction.where({ account_number : req.params.cif_number }).find()
    .sort({'updatedAt': -1}).limit(req.params.limit).skip(req.params.skip)
    .then(transactions => {
        if(!transactions) {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with cif_number " + req.params.cif_number
            });            
        }
        var elapsed_time = new Date() - start
        res.send({ elapsed_time: `${elapsed_time}ms`, data: transactions });
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            var elapsed_time = new Date() - start
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                message: "Account not found with cif_number " + req.params.cif_number
            });                
        }
        var elapsed_time = new Date() - start
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            message: "Error retrieving account with transaction cif_number: " + req.params.cif_number
        });
    })
}