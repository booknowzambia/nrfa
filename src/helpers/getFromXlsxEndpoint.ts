// import { default as fetch } from "node-fetch";
// import { Response } from "node-fetch";
import * as Sentry from '@sentry/node'
import { default as XLSX } from "xlsx";
import { DISTRIBUTORS, DISTRIBUTOR_REVERSALS } from "../config";
import { Receipt, ReceiptProcessed } from "../models/receipt.js";
import { Reversal, ReversalProcessed } from "../models/reversal.js";
import { getReceiptXLSXEndpoint, getReversalXLSXEndpoint, EndpointInfo, requestType } from "./getEndpointInfo.js";
// import axios, { AxiosResponse } from "axios";
import { streamToBuffer } from "./streamToBuffer.js";

//date should be in Zambia's local time
export async function getReceiptsXlsx(distributor: DISTRIBUTORS, startDate: Date, endDate?: Date): Promise<Array<ReceiptProcessed>>{
    let endpointInfo: EndpointInfo = getReceiptXLSXEndpoint(distributor, startDate, endDate);
    let receipts: Array<Receipt> = await fetchFromXlsxEndpoint(endpointInfo.url, endpointInfo.req);
    let receiptsProcessed: Array<ReceiptProcessed> = receipts.map((value)=> ReceiptProcessed.fromReceipt(value));
    return receiptsProcessed;
}

export async function getReversalsXlsx(distributor: DISTRIBUTOR_REVERSALS, startDate: Date, endDate?: Date): Promise<Array<ReversalProcessed>>{
    let endpointInfo: EndpointInfo = getReversalXLSXEndpoint(distributor, startDate, endDate);
    let reversals: Array<Reversal> = await fetchFromXlsxEndpoint(endpointInfo.url, endpointInfo.req);
    let reversalsProcessed: Array<ReversalProcessed> = reversals.map((value)=>new ReversalProcessed(value));
    return reversalsProcessed;
}

async function fetchFromXlsxEndpoint(url: string, request: requestType): Promise<Array<any>>{
    console.log('fetching with url: ', url);

    // same functionality but with axios library
    // let axiosResponse: AxiosResponse = await axios.get(url, {
    //     headers: request.headers,
    //     maxContentLength: 10000000000,
    //     maxBodyLength: Infinity
    // });
    // console.log('AXIOS RESPONSE: ', axiosResponse.status);
    // let data = axiosResponse.data;
    // return [];

    let response: Response = await fetch(url, request);
    if (response == null || response.body == null || !response.ok) throw new Error(`unexpected response ${response.statusText}`);
    // console.log('response from fetch: ', response);

    let data = await streamToBuffer(response.body);
    let data64 = data.toString('utf-8');
    // console.log('data64 ', data64);
    let resp = data64.split('~');
    var temp = resp[1];
    // console.log('temp ', temp);

    if (temp == undefined){
        throw new Error('Data was not returned correctly from fetch!');
    }

    // this is a base64 encoded excel file for testing
    // var temp = "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";
    try{
        const workBook = XLSX.read(temp, {type: "base64"});
        // XLSX.writeFile(workBook, './src/cache/testOutXLS.xlsx');
        let currentTime = new Date();
        XLSX.writeFile(workBook, './data/xlsx/' + currentTime.valueOf() + '.xlsx');
        var sheetNames = workBook.SheetNames;
        var receipts: Array<any> = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        return receipts;
    }
    catch(e){
        Sentry.captureException(e)
        console.log('ERROR: ', e);
        return [];
    }
}