import fs from "fs";
import { DISTRIBUTORS } from "../config.js";
import { getPageReceipts } from "../helpers/getPageData.js";

async function main(){
    let endDate = new Date('2022-08-11 23:39:37 GMT+02:00');
    let oneDayMs = 1000*3600*24*1;
    let oneHourMs = 1000*3600;
    let startDate = new Date(endDate.valueOf() - oneHourMs);
    let resp = await getPageReceipts(DISTRIBUTORS.DOT_COM_ZAMBIA, startDate, endDate);
    fs.writeFileSync('./build/scripts/pageReceiptsResp.json', JSON.stringify(resp, null, 4));
}
main();