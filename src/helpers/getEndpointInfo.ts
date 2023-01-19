import { DISTRIBUTORS, DISTRIBUTOR_REVERSALS } from "../config";

export interface headerType{
    [key: string]: string
}

export interface requestType{
    headers: headerType,
    body: null | string,
    method: string
}

export interface EndpointInfo{
    url: string,
    req: requestType
}

function leftpad(val: string, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
          + String(val)).slice(String(val).length);
}

function getDateWithSeparator(date: Date, separator: string): string{
    let month = leftpad((date.getMonth() + 1).toString());
    let day = leftpad(date.getDate().toString());
    return month + separator + day + separator + date.getFullYear();
}

function getCSVDateFromDate(date: Date): string{
    return getDateWithSeparator(date, "/");
}

export function getXLSXDateFromDate(date: Date): string{
    return getDateWithSeparator(date, "%2F");
}

export function getReceiptXLSXEndpoint(distributorId: DISTRIBUTORS, startDate: Date, endDate?: Date): EndpointInfo{
    if (process.env.NODE_ENV && process.env.NODE_ENV == "TEST"){
        return {
            url: "'http://localhost:3000/receiptsXlsxSourceTest'",
            req: {
                "headers":{},
                "body": null,
                "method": "GET"
            }
        }
    }

    let startString = getXLSXDateFromDate(startDate);
    let endString = endDate != undefined ? getXLSXDateFromDate(endDate) : "";
    const url = "https://etoll.nrfa.org.zm/download/export/excel?_csrf_token=fVcAQEZbCQ0TLjESKBNdPnIWHVojGzRL0omw60EkXBUTzD7dFRjwMLp-&file=v4RrPymMXg&distributor=" + distributorId + "&toll_gate=&only_exempt=&cashier=&vehicle_class=&plate_type=&start_date=" + startString + "&end_date=" + endString + "&terminal_id=&receipt_number=&pan=&vehicle_registration=";
    const req = {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.1755357598.1660114221; _gat=1; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRXGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYvNk2A.MxXAyWZh-9VqcImiTcAqfsCYhCt91yUyDhAdZ_WlN7o",
          "Referer": "https://etoll.nrfa.org.zm/nrfacore/public/transactions/toll-card-collections",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        //   "Transfer-Encoding": "chunked",
        //   "content-length": "10000000"
        //   "Connection": "keep-alive",
        //   "Keep-Alive": "timeout=60"
        },
        "body": null,
        "method": "GET"
    };
    return {
        url: url,
        req: req
    };
}

export function getReversalXLSXEndpoint(distributorId: DISTRIBUTOR_REVERSALS, startDate: Date, endDate?: Date): EndpointInfo{

    let startString = getXLSXDateFromDate(startDate);
    let endString = endDate != undefined ? getXLSXDateFromDate(endDate) : "";
    let url = "https://etoll.nrfa.org.zm/download/export/excel?_csrf_token=fQkdL0syO28INiwhW1AuFyYzbghxAgok9FvMyXHVjqADk7BQlqYa2TKH&file=c7qfRQTxrY&distributor=" + distributorId + "&cashier=&pan=&toll_gate=&initiator=&start_date=" + startString + "&end_date=" + endString + "&carPlateNumber=&plate_type=";
    let req = {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.1922712426.1659816520; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRXGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYu8q-Q.uSyODmzLFUo9VATqUhvnZimjU2KOCV5X6F0rJxOjPi4",
        "Referer": "https://etoll.nrfa.org.zm/nrfacore/public/transactions/reversal_history",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    };
    return {
        url: url,
        req: req
    };
}

const pageDataLength: number = 1000;
export function getPageReceiptEndpoint(distributorId: DISTRIBUTORS, page: number): EndpointInfo{
    let url = "https://etoll.nrfa.org.zm/nrfacore/public/transactions/"
    let req = {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.1755357598.1660114221; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRXGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYvTcMw.ADfr66ZfTFRfJR78vv7cY3GGbUGxD4v-_BLRgp-_OoQ",
          "Referer": "https://etoll.nrfa.org.zm/nrfacore/public/transactions/toll-card-collections",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "draw=7&columns%5B0%5D%5Bdata%5D=date&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=receipt_number&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=amount&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=amount_charged&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=vehicle_reg&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=plate_type&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=card_number&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=channel&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=account_type&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=plaza&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=runningBalance&columns%5B10%5D%5Bname%5D=&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B11%5D%5Bdata%5D=direction&columns%5B11%5D%5Bname%5D=&columns%5B11%5D%5Bsearchable%5D=true&columns%5B11%5D%5Borderable%5D=true&columns%5B11%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B11%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B12%5D%5Bdata%5D=merchant&columns%5B12%5D%5Bname%5D=&columns%5B12%5D%5Bsearchable%5D=true&columns%5B12%5D%5Borderable%5D=true&columns%5B12%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B12%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B13%5D%5Bdata%5D=distributor&columns%5B13%5D%5Bname%5D=&columns%5B13%5D%5Bsearchable%5D=true&columns%5B13%5D%5Borderable%5D=true&columns%5B13%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B13%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B14%5D%5Bdata%5D=is_exempt&columns%5B14%5D%5Bname%5D=&columns%5B14%5D%5Bsearchable%5D=true&columns%5B14%5D%5Borderable%5D=true&columns%5B14%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B14%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B15%5D%5Bdata%5D=ref&columns%5B15%5D%5Bname%5D=&columns%5B15%5D%5Bsearchable%5D=true&columns%5B15%5D%5Borderable%5D=true&columns%5B15%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B15%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B16%5D%5Bdata%5D=cashier&columns%5B16%5D%5Bname%5D=&columns%5B16%5D%5Bsearchable%5D=true&columns%5B16%5D%5Borderable%5D=true&columns%5B16%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B16%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B17%5D%5Bdata%5D=id&columns%5B17%5D%5Bname%5D=&columns%5B17%5D%5Bsearchable%5D=true&columns%5B17%5D%5Borderable%5D=true&columns%5B17%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B17%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=" + pageDataLength * page + "&length=" + pageDataLength + "&search%5Bvalue%5D=&search%5Bregex%5D=false&form=cmdVYxSmaw2eFRFBUzHXDSKN73kcx2qnWZhe89vpCEFQJ3TDHX&_csrf_token=Jg4wc10qBAofGTQvJ1oTCgYWSxoRIQgmmviD7xMhqwNFplpANz97DRgT&distributor=" + distributorId +"&toll_gate=&only_exempt=&cashier=&vehicle_class=&start_date=05%2F10%2F2022&end_date=&terminal_id=&receipt_number=&pan=&vehicle_registration=&plate_type=",
        "method": "POST"
    };
    return {url, req};
}

// export function getPageReversalEndpoint(distributorId: DISTRIBUTORS, page: number): EndpointInfo{
//     let url = "";
//     let req = {};
//     return {
//         url: url,
//         req: req
//     };
// }

// export function getReceiptCSVEndpoint(distributorId: DISTRIBUTORS, startDate: Date, endDate?: Date): EndpointInfo{
//     let startString = getCSVDateFromDate(startDate);
//     let endString = endDate != undefined ? getCSVDateFromDate(endDate) : "";
//     // console.log('fetching from source server');
//     let url = "https://etoll.nrfa.org.zm/download/csv/transactions/card_transactions?start_date=" + startString + "&merchant_id=undefined&distributor=" + distributorId + "&toll_gate=&only_exempt=&cashier=&vehicle_class=&end_date=" + endString + "&terminal_id=&receipt_number=&pan=&vehicle_registration=&data_service=undefined";
//     let req = {
//         "headers": {
//             "accept": "*/*",
//             "accept-language": "en-US,en;q=0.9",
//             "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"Windows\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "cookie": "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.461850299.1658988157; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRVGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYuI7EQ.2sAElZK3eSfc8UXtmWDRjMepoP_oJx_eePmr1kHuj6Q",
//             "Referer": "https://etoll.nrfa.org.zm/nrfacore/public/transactions/toll-card-collections",
//             "Referrer-Policy": "strict-origin-when-cross-origin"
//         },
//         "body": null,
//         "method": "GET"
//     };
//     return {
//         url: url,
//         req: req
//     };
// }

// export function getReversalCSVEndpoint(distributorId: DISTRIBUTOR_REVERSALS, startDate: Date, endDate?: Date): EndpointInfo{
//     let startString = getCSVDateFromDate(startDate);
//     let endString = endDate != undefined ? getCSVDateFromDate(endDate) : "";
//     let url = "https://etoll.nrfa.org.zm/download/csv/transactions/reversal_history?toll_gate=&initiator=&start_date=" + startString + "&end_date=" + endString + "&merchant_id=undefined&Distributor=" + distributorId + "&cashier=&carPlateNumber=&pan=";
//     let req = {
//         "headers": {
//           "accept": "*/*",
//           "accept-language": "en-US,en;q=0.9",
//           "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Windows\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-origin",
//           "cookie": "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.1922712426.1659816520; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRXGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYu8pug.GTW-mPoRZ0Xws93_nRj2zXXyPSZJqGaNPfqtNB_McaM",
//           "Referer": "https://etoll.nrfa.org.zm/nrfacore/public/transactions/reversal_history",
//           "Referrer-Policy": "strict-origin-when-cross-origin"
//         },
//         "body": null,
//         "method": "GET"
//     };
//     return {
//         url: url,
//         req: req
//     };
// }
