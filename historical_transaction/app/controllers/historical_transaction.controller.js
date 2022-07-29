const Historical_Transaction = require('../models/historical_transaction.model.js');
const uuid = require('uuid');

exports.findAll = (req, res) => {
    
    var start = new Date()

    let log_id = uuid.v4()

    Historical_Transaction.where({ account_number : req.params.account_number }).find()
    .sort({'updatedAt': -1}).limit(req.params.limit).skip(req.params.skip)
    .then(historical_transactions => {
        if(!historical_transactions) {
            var elapsed_time = new Date() - start
            console.log(`uuid: ${log_id} ${"Account not found with account_number " + req.params.account_number} ${elapsed_time}ms`)
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });            
        }
        var elapsed_time = new Date() - start
        console.log(`uuid: ${log_id} send response ${JSON.stringify(historical_transactions)} ${elapsed_time}ms`)
        res.send({ 
            elapsed_time: `${elapsed_time}ms`, 
            data: historical_transactions 
        });
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            var elapsed_time = new Date() - start
            console.log(`uuid: ${log_id} ${"Account not found with account_number " + req.params.account_number} ${elapsed_time}ms`)
            return res.status(404).send({
                elapsed_time: `${elapsed_time}ms`,
                data : {
                    message: "Account not found with account_number " + req.params.account_number
                }
            });                
        }
        var elapsed_time = new Date() - start
        console.log(`uuid: ${log_id} ${"Error retrieving account with historical transaction account_number: " + req.params.account_number} ${elapsed_time}ms`)
        return res.status(500).send({
            elapsed_time: `${elapsed_time}ms`,
            data : {
                message: "Error retrieving account with historical transaction account_number: " + req.params.account_number
            }
        });
    })
}