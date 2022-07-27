const axios = require('axios').default;
const assert = require('assert');
const HOST = "http://localhost:4000"
const data = {
    cif_number: "1234567890",
    currency: "IDR",
    status: "BUKA",
    deposit_amount: 10000,
    debit_amount: 10
}

describe("Core-Sandbox Service Unit Tests", () => {
    describe("Normal functionalities", () => {
        
        it("should finish one cycle", async () => {

            let debit_account = {}
            let credit_account = {}

            debit_account = await axios.post(`${HOST}/account`, {
                cif_number: data.cif_number,
                currency: data.currency,
                status: data.status
            })

            credit_account = await axios.post(`${HOST}/account`, {
                cif_number: data.cif_number,
                currency: data.currency,
                status: data.status
            })

            let response = await axios.post(`${HOST}/transaction/credit`, { account_number: credit_account.data.account_number, amount: data.deposit_amount })
            assert.equal(response.status, 200)

            response = await axios.post(`${HOST}/transaction/transfer`, {
                cif_number: data.cif_number,
                debit_account_number: credit_account.data.account_number,
                credit_account_number: debit_account.data.account_number,
                amount: data.debit_amount
            })

            response = await axios.post(`${HOST}/transaction/transfer`, {
                cif_number: data.cif_number,
                debit_account_number: credit_account.data.account_number,
                credit_account_number: debit_account.data.account_number,
                amount: data.debit_amount
            })

            response = await axios.post(`${HOST}/transaction/debit`, { account_number: debit_account.data.account_number, amount: data.debit_amount })
            assert.equal(response.status, 200)

            response = await axios.post(`${HOST}/transaction/transfer`, {
                cif_number: data.cif_number,
                debit_account_number: credit_account.data.account_number,
                credit_account_number: debit_account.data.account_number,
                amount: data.debit_amount
            })
            assert.equal(response.status, 200)

            response = await axios.get(`${HOST}/historical_transaction/${credit_account.data.account_number}/0/100`)
            assert.equal(response.status, 200)
            
        });
        
        it("other scenarios", async function () {
        
        });
    });
});