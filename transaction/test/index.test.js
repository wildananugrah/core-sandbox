const axios = require('axios').default;
const assert = require('assert');
const HOST = "http://localhost:3000"
const data = {
    debit_account_number : "4922823123",
    credit_account_number : "9365835016",
    deposit_amount: 10000,
    debit_amount: 10
}

describe("Transfer Service Unit Tests", function () {
    describe("Transfer functionality", function () {
        
        it("should finish one cycle", async function () {

            let response = await axios.post(`${HOST}/transaction/credit`, { account_number: data.debit_account_number, amount: data.deposit_amount })
            assert.equal(response.status, 200)

            response = await axios.post(`${HOST}/transaction/debit`, { account_number: data.debit_account_number, amount: data.debit_amount })
            assert.equal(response.status, 200)

            response = await axios.post(`${HOST}/transaction/transfer`, {
                debit_account_number: data.debit_account_number,
                credit_account_number: data.credit_account_number,
                amount: data.debit_amount
            })
            assert.equal(response.status, 200)
            
        });
        
        it("other scenarios", async function () {
        
        });
    });
});