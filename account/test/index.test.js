const axios = require('axios').default;
const assert = require('assert');
const HOST = "http://localhost:3000"
const CIF_NUMBER = "1234567890"
const CURRENCY = "IDR"
const STATUS = "BUKA"
const STATUS_TTUP = "TTUP"

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

            response = await axios.put(`${HOST}/account/${account.account_number}`, {status: STATUS_TTUP})
            assert.equal(response.status, 200)

            response = await axios.get(`${HOST}/account/${account.account_number}`)
            assert.equal(response.status, 200)
            assert.equal(STATUS_TTUP, response.data.status)

            response = await axios.delete(`${HOST}/account/${account.account_number}`)
            assert.equal(response.status, 200)
            
            response = await axios.get(`${HOST}/accounts/${CIF_NUMBER}`)
            assert.equal(response.status, 200)
            assert.equal(response.data.length, 0)
            
        });
        
        it("other scenarios", async function () {
        
        });
    });
});