// import { default as fetch } from "node-fetch";
// import { Response } from "node-fetch";

// import {createWriteStream} from 'fs';
// import {pipeline} from 'node:stream';
// import {promisify} from 'node:util'
// import {default as csv} from 'csvtojson';
// import { Receipt, ReceiptProcessed } from "../models/receipt.js";
// import { EndpointInfo, getReceiptCSVEndpoint, getReversalCSVEndpoint } from "./getEndpointInfo.js";
// import { Reversal, ReversalProcessed } from "../models/reversal.js";
// import { DISTRIBUTORS, DISTRIBUTOR_REVERSALS } from "../config.js";

// const streamPipeline = promisify(pipeline);

// export async function getReceiptsCsv(distributor: DISTRIBUTORS, startDate: Date, endDate?: Date): Promise<Array<ReceiptProcessed>>{
//     let endpointInfo: EndpointInfo = getReceiptCSVEndpoint(distributor, startDate, endDate);
//     let receipts: Array<Receipt> = await fetchFromCsvEndpoint(endpointInfo.url, endpointInfo.req);
//     let receiptsProcessed: Array<ReceiptProcessed> = receipts.map((value)=>new ReceiptProcessed(value));
//     return receiptsProcessed;
// }

// export async function getReversalsCsv(distributor: DISTRIBUTOR_REVERSALS, startDate: Date, endDate?: Date): Promise<Array<ReversalProcessed>>{
//     let endpointInfo: EndpointInfo = getReversalCSVEndpoint(distributor, startDate, endDate);
//     let reversals: Array<Reversal> = await fetchFromCsvEndpoint(endpointInfo.url, endpointInfo.req);
//     let reversalsProcessed: Array<ReversalProcessed> = reversals.map((value)=>new ReversalProcessed(value));
//     return reversalsProcessed;
// }

// async function fetchFromCsvEndpoint(url: string, request: object): Promise<Array<any>>{
//     let response: Response = await fetch(url, request);
    
//     if (response == null || response.body == null || !response.ok) throw new Error(`unexpected response ${response.statusText}`);
//     console.log('streaming body');

//     const csvFilePath='./build/cache/txnData.csv';
//     await streamPipeline(response.body, createWriteStream(csvFilePath));

//     return new Promise((resolve, reject) => {
//         console.log('csv to json');
//         csv().fromFile(csvFilePath).then((jsonObj)=>{
//             let receiptData: Array<Receipt> = jsonObj as Array<Receipt>;
//             console.log('success');
//             // console.log(receiptData);
//             resolve(receiptData);
//         })
//     });
// }