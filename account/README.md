# Account spec
## create 
method: POST
uri: /account
desc: create account 
message:
- request: JSON BODY
  - cif_number: String(10)
  - account_number: String(10) (Optional)
  - currency: String(3)
  - status: String(4)
- response:
  - response_time: datetime
  - data:
    - cif_number: String(10)
    - account_number: String(10) (Optional)
    - currency: String(3)
    - status: String(4) BUKA|TTUP

## update
method: UPDATE
uri: /account/:account_number
desc: update account by account number
message:
- request: param
  - account_number: String(10)
- request: body
  - status: String(4)
- response:
  - response_time: datetime
  - data:
    - message: String(100)

## delete
method: DELETE
uri: /account/:account_number
desc: delete account by account number
message:
- request: param
  - account_number: String(10)
- response:
  - response_time: datetime
  - data:
    - message: String(100)

## detail
method: GET
uri: /account/:account_number
desc: get detail account by account_number
message:
- request: param
  - account_number: String(10)
- response:
  - response_time: datetime
  - data:
    - cif_number: String(10)
    - account_number: String(10) (Optional)
    - currency: String(3)
    - status: String(4) BUKA|TTUP

## list
method: GET
uri: /accounts/:cif_number
desc: get all accounts by cif_number
message:
- request: param
  - cif_number: String(10)
- response: LIST
  - status: String(3) HTTP STATUS CODE
  - response_time: datetime
  - data:
    - cif_number: String(10)
    - account_number: String(10) (Optional)
    - currency: String(3)
    - status: String(4) BUKA|TTUP