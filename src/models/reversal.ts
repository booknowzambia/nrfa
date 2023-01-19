// import { isConstructorDeclaration } from "typescript";

export interface Reversal {
    "Reversal Date": string,
    "Transaction Type": string,
    "Transaction Receipt No": string,
    "Card Number": string,
    "Number Plate": string,
    "Plaza": string,
    "Reason": string,
    "Transaction Amount(ZMW)": string,
    "Amount Reversed(ZMW)": string,
    "Transaction Cashier": string,
    "Reversal Initiator": string,
    "Station": string
}


export class ReversalProcessed {
    date: string;
    type: string;
    receiptNo: string;
    cardNumber: string;
    plateNumber: string;
    plaza: string;
    station: string;
    reason: string;
    transactionAmount: number;
    amountReversed: number;
    transactionCashier: string;
    reversalInitiator: string;

    constructor(reversal: Reversal){
        this.date = reversal["Reversal Date"];
        this.type = reversal["Transaction Type"];
        this.receiptNo = reversal["Transaction Receipt No"];
        this.cardNumber = reversal["Card Number"];
        this.plateNumber = reversal["Number Plate"];
        this.plaza = reversal.Plaza;
        this.station = reversal.Station;
        this.reason = reversal.Reason;
        this.transactionAmount = +reversal["Transaction Amount(ZMW)"];
        this.amountReversed = +reversal["Amount Reversed(ZMW)"];
        this.transactionCashier = reversal["Transaction Cashier"];
        this.reversalInitiator = reversal["Reversal Initiator"];
    }
}