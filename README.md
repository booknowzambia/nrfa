# Summary

This NodeJs Express server contains three endpoints to automate the data transfer from https://etoll.nrfa.org.zm to an array of callback endpoints. 

`npm i` in root directory

`npm run start` starts the server at port 3000 or env.PORT if it is set.

./scripts/** will post data to config.ts endpoints.
./test/** will not post data but will fetch from source.


# REST API

## Block or Unblock Cards
### Request
PUT `/cards`
    {
        "action": "enable",
        "cards": ["0000506873687877", "0004000018974700"]
    }

### Response 
    {action: req.body.action, cards: responses}


## Get Receipts
### Request
GET `/receipts`
    curl -X GET "http://localhost:3000/receipts?distributor=DOT_COM_ZAMBIA"
    
see config.ts for other distributor options

### Response
    {message: "SUCCESS"}

Data posted to callback urls in config.ts

## Get Reversals 
### Request
GET `/reversals`
    curl -X GET "http://localhost:3000/reversals?distributor=DOT_COM_ZAMBIA"

see config.ts for other distributor options

### Response
    {message: "SUCCESS"}

Data posted to callback urls in config.ts


# Updating Headers/Cookies

If for some reason the header tokens are no longer being accepted by the source server, you can use Chrome Devtools to copy the network requests while manually downloading the Excel file.

You will only need to update the `./helpers/getEndpointInfo.ts` file with this information. This could be abstracted out and done programmatically if it becomes an issue.


# Background Info
## Login Info

Source System: https://etoll.nrfa.org.zm/home
username: BusinessAnalyst1
Password: Z7xeYhdu

Transactions >TollTransactions> card collections (Source page) 

And System 2 credentials are below; https://www.etoll.co.zm/login.php Username: test@booknowzambia.com Password: 123456 Go to Import & Export > Import Tolls >

## Card blocking/unblocking

Test Card Numbers:
0000506873687877
0004000018974700