import { DISTRIBUTORS } from "../config";
import { PageReceipt, ReceiptProcessed } from "../models/receipt.js";
import { EndpointInfo, getPageReceiptEndpoint } from "./getEndpointInfo.js";
import { streamToBuffer } from "./streamToBuffer.js";
import * as Sentry from '@sentry/node'

// limit size of each page to ~500
// use receipt no with local map to make sure no duplicates
// keep paging through until start time is surpassed
// might be able to just use existing xlsx endpoint for reversals since not much data
// assumes receiptNo is unique for each receipt

export async function getPageReceipts(distributor: DISTRIBUTORS, startDate: Date, endDate?: Date): Promise<Array<ReceiptProcessed>>{
    console.log('getting page receipts');
    let receiptsSeenSet: any = {};
    let receiptsProcessed: Array<ReceiptProcessed> = [];

    console.log('DISTRIBUTOR::', distributor, 'startDate:', startDate)

    let finished: boolean = false;
    let pageNum: number = 0;
    try {
        while (!finished) {
            console.log('getting page = ', pageNum, ' for distributor ', distributor)
            let receiptsProcessedOnPage: Array<ReceiptProcessed> = await getProcessedPageReceipts(distributor, pageNum)
            let earliestDateOnPage: Date = new Date(receiptsProcessedOnPage[receiptsProcessedOnPage.length - 1].date + ' GMT+02:00')
            finished = earliestDateOnPage.valueOf() <= startDate.valueOf()
            let firstDateOnPage: Date = new Date(receiptsProcessedOnPage[0].date + ' GMT+02:00')
            if (firstDateOnPage.valueOf() < earliestDateOnPage.valueOf()) {
                throw('ERROR: Page was not returning in descending order by date.')
            }
            for (let receipt of receiptsProcessedOnPage) {
                if (!receiptsSeenSet.hasOwnProperty(receipt.receiptNo)) {
                    receiptsSeenSet[receipt.receiptNo] = 1
                    receiptsProcessed.push(receipt)
                }
            }
            ++pageNum;
        }
        return receiptsProcessed;
    } catch (e) {
        console.error('ERR::', e)
        Sentry.captureException(e)
        return receiptsProcessed;
    }
}

async function getProcessedPageReceipts(distributor: DISTRIBUTORS, page: number): Promise<Array<ReceiptProcessed>>{
    const pageReceiptEndpoint: EndpointInfo = getPageReceiptEndpoint(distributor, page);
    console.log('fetching from ', pageReceiptEndpoint.url);
    const response = await fetch(pageReceiptEndpoint.url, pageReceiptEndpoint.req);

    if (response == null || response.body == null || !response.ok) throw new Error(`unexpected response ${response.statusText}`);
    // console.log('response from fetch: ', response);
    const data = await streamToBuffer(response.body);
    const data64 = data.toString('utf-8');
    // console.log('data64 ', data64);
    const dataObj = JSON.parse(data64);

    // if (process.env.NODE_ENV !== 'production') {
    //     console.log(JSON.stringify(dataObj, null, 4));
    //     console.log(Object.keys(dataObj));
    // }

    const pageReceipts: Array<PageReceipt> = dataObj.data;
    return pageReceipts.map(value => ReceiptProcessed.fromPageReceipt(value));
}