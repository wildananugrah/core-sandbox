const axios = require('axios').default;
const assert = require('assert');
const HOST = "http://localhost:3000"
const CIF_NUMBER = "1234567890"
const CURRENCY = "IDR"
const STATUS = "BUKA"
const STATUS_TTUP = "TTUP"
const BALANCE = 1000
const SUBSTRACT = 300

describe("User Service Unit Tests", function () {
    describe("Save User functionality", function () {
        
        it("should finish one cycle", async function () {

            let response = await axios.post(`${HOST}/account`, {
                cif_number : CIF_NUMBER,
                currency : CURRENCY,
                status : STATUS
            },{
                headers: { 'Content-Type': 'application/json' }
            })

            const account = response.data

            response = await axios.get(`${HOST}/accounts/${CIF_NUMBER}`)
            assert.equal(response.status, 200)
            assert.equal(response.data.length, 1)

            response = await axios.get(`${HOST}/account/${account.account_number}`)
            assert.equal(response.status, 200)
            assert.equal(account._id, response.data._id)

            response = await axios.put(`${HOST}/account/update_balance/${account.account_number}`, { balance: BALANCE })
            assert.equal(response.status, 200)

            response = await axios.post(`${HOST}/account`, {
                cif_number : CIF_NUMBER,
                currency : CURRENCY,
                status : STATUS
            },{
                headers: { 'Content-Type': 'application/json' }
            })

            const account_2 = response.data

            response = await axios.put(`${HOST}/account/settlement`, {
                "debit_account_number" : account_2.account_number,
                "debit_account_balance" : BALANCE - SUBSTRACT,
                "credit_account_number" : account_2.account_number,
                "credit_account_balance" : SUBSTRACT
            })

            response = await axios.put(`${HOST}/account/${account.account_number}`, {status: STATUS_TTUP})
            assert.equal(response.status, 200)

            response = await axios.get(`${HOST}/account/${account.account_number}`)
            assert.equal(response.status, 200)
            assert.equal(STATUS_TTUP, response.data.status)

            response = await axios.delete(`${HOST}/account/${account.account_number}`)
            assert.equal(response.status, 200)
            
            response = await axios.get(`${HOST}/accounts/${CIF_NUMBER}`)
            assert.equal(response.status, 200)
            assert.equal(response.data.length, 1)

            response = await axios.delete(`${HOST}/account/${account_2.account_number}`)
            assert.equal(response.status, 200)
            
            response = await axios.get(`${HOST}/accounts/${CIF_NUMBER}`)
            assert.equal(response.status, 200)
            assert.equal(response.data.length, 0)
            
        });
        
        it("other scenarios", async function () {
        
        });
    });
});