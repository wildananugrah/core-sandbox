const Historical_Transaction = require('../models/historical_transaction.model.js');

exports.findAll = (req, res) => {
    Historical_Transaction.where({ account_number : req.params.account_number }).find()
    .sort({'date': -1}).limit(req.params.limit).skip(req.params.skip)
    .then(historical_transactions => {
        if(!historical_transactions) {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });            
        }
        res.send(historical_transactions);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Account not found with account_number " + req.params.account_number
            });                
        }
        return res.status(500).send({
            message: "Error retrieving account with historical transaction account_number: " + req.params.account_number
        });
    })
}