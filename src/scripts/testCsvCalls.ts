import { DISTRIBUTORS } from "../config.js";
// import { getReceiptsCsv, getReversalsCsv } from "../helpers/getFromCsvEndpoint.js";
import { Receipt, ReceiptProcessed } from "../models/receipt.js";
import { Reversal } from "../models/reversal.js";

async function main(){
    // let endDate = new Date();
    // let startDate = new Date(endDate.valueOf() - 1000*3600*24*1);
    // let receipts: Array<ReceiptProcessed> = await getReceiptsCsv(DISTRIBUTORS.DOT_COM_ZAMBIA, startDate, endDate);
    // console.log('RECEIPTS: ', receipts);
    
    // SOURCE SERVER IS BROKEN 
    // LAST CHECKED: 8.6.22
    // let reversals: Array<Reversal> = await getReversalsCsv(startDate, endDate);
    // console.log('REVERSALS: ', reversals);
}

main();