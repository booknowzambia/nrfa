import { updateCard } from "../helpers/updateCards.js";

// 0000506873687877
// 0004000018974700
async function main(){
    let response = await updateCard(true, "0004000018974700");
    console.log('response = ', response);
}

main();