
import https, { RequestOptions } from "node:https";
import zlib from "node:zlib";

async function main(){
    let url = "https://etoll.nrfa.org.zm/download/export/excel?_csrf_token=Ag0YfH4EBkUiIX8QAQ0NDFE6PkwjJQFFvAS81echoE9OC8t57XMtqjOu&file=v4RrPymMXg&distributor=50217427&toll_gate=&only_exempt=&cashier=&vehicle_class=&plate_type=&start_date=08%2F10%2F2022&end_date=&terminal_id=&receipt_number=&pan=&vehicle_registration=";
    
    const options = {
        hostname: "etoll.nrfa.org.zm",
        path: "/download/export/excel?_csrf_token=Ag0YfH4EBkUiIX8QAQ0NDFE6PkwjJQFFvAS81echoE9OC8t57XMtqjOu&file=v4RrPymMXg&distributor=50217427&toll_gate=&only_exempt=&cashier=&vehicle_class=&plate_type=&start_date=08%2F10%2F2022&end_date=&terminal_id=&receipt_number=&pan=&vehicle_registration=",
        method: 'GET',
        // port: 443,
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
            "cookie": "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.1755357598.1660114221; _gat=1; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRXGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYvSG8g.-pAqxCM5l1AS1qEmXelMQVcfwn1Mhsq0TDpttTsbBmY",
            "Referer": "https://etoll.nrfa.org.zm/nrfacore/public/transactions/toll-card-collections",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
    };
    
    const chunks: Array<Buffer> = [];
    const req = https.get(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(chunk);
            chunks.push(Buffer.from(chunk));
        });
        res.on('end', () => {
            console.log('No more data in response.');
            let finalResult = Buffer.concat(chunks);
            console.log('FINAL RESULT');
            console.log(finalResult);
        });
    });
    
    // let promise = new Promise((resolve, reject) => {
        // const req = https.request(new URL(url), (res) => {
        //     console.log()
        //     const gunzip = zlib.createGunzip();
        //     res.pipe(gunzip);

        //     const buffer: any = [];
        //     gunzip.on("data", (chunk) => buffer.push(chunk))
        //           .on("error", (err) => reject(err))
        //           .on("end", () => resolve(buffer.join("")));
        // });
        // req.on("error", (err) => reject(err));
        // req.method = "GET";
        // req.setHeader("accept", "*/*");
        // req.setHeader("accept-Encoding", "br, gzip, deflate");
        // req.setHeader("accept-Language", "en-US,en;q=0.9");
        // req.setHeader("sec-Fetch-Mode", "cors");
        // req.setHeader("User-Agent", "undici");
        // req.setHeader("sec-ch-ua", "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"");
        // req.setHeader("sec-ch-ua-mobile", "?0");
        // req.setHeader("sec-fetch-dest", "empty");
        // req.setHeader("sec-fetch-site", "same-origin");
        // req.setHeader("x-requested-with", "XMLHttpRequest");
        // req.setHeader("cookie", "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.1755357598.1660114221; _gat=1; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRXGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYvSG8g.-pAqxCM5l1AS1qEmXelMQVcfwn1Mhsq0TDpttTsbBmY");
        // req.setHeader("Referer", "https://etoll.nrfa.org.zm/nrfacore/public/transactions/toll-card-collections");
        // req.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        // req.end();
    // });
    // let result = await promise;
    // console.log('RESULT: ', result);
}

main();

// fetch("https://etoll.nrfa.org.zm/download/export/excel?_csrf_token=Ag0YfH4EBkUiIX8QAQ0NDFE6PkwjJQFFvAS81echoE9OC8t57XMtqjOu&file=v4RrPymMXg&distributor=50217427&toll_gate=&only_exempt=&cashier=&vehicle_class=&plate_type=&start_date=08%2F10%2F2022&end_date=&terminal_id=&receipt_number=&pan=&vehicle_registration=", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "_ga=GA1.3.62592517.1658988157; _gid=GA1.3.1755357598.1660114221; _gat=1; _nrfa_elixir_key=SFMyNTY.g3QAAAACbQAAAAxjdXJyZW50X3VzZXJ0AAAABGQACl9fc3RydWN0X19kAA5FbGl4aXIuRGVjaW1hbGQABGNvZWZiAAJRXGQAA2V4cGEAZAAEc2lnbmEBbQAAABJzZXNzaW9uX3RpbWVvdXRfYXRiYvSG8g.-pAqxCM5l1AS1qEmXelMQVcfwn1Mhsq0TDpttTsbBmY",
//     "Referer": "https://etoll.nrfa.org.zm/nrfacore/public/transactions/toll-card-collections",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": null,
//   "method": "GET"
// });