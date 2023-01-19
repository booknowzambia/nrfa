import { DISTRIBUTORS, DISTRIBUTOR_REVERSALS } from "../config.js";
import { getReceiptsXlsx, getReversalsXlsx } from "../helpers/getFromXlsxEndpoint.js";
import { Receipt, ReceiptProcessed } from "../models/receipt.js";
import { Reversal, ReversalProcessed } from "../models/reversal.js";
import { getXLSXDateFromDate } from "../helpers/getEndpointInfo.js";

async function main(){
  let endDate = new Date();
  let startDate = new Date(endDate.valueOf() - 1000*3600*24*1);
  let receipts: Array<ReceiptProcessed> = await getReceiptsXlsx(DISTRIBUTORS.DOT_COM_ZAMBIA, startDate);
  console.log('RECEIPTS: ', receipts);
  
  // let reversals: Array<ReversalProcessed> = await getReversalsXlsx(DISTRIBUTOR_REVERSALS.DC_ZAMBIA_ETOLLS, startDate);
  // console.log('REVERSALS: ', reversals);
}

main();