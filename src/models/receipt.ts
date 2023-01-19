export interface Receipt {
    "Date": string,
    "Receipt No": string,
    "Vehicle Reg.": string,
    "Card Number": string,
    "Amount Charged(ZMW)": string,
    "Cashier": string,
    "Distributor": string,
    "Plaza": string,

    'Amount Collected(ZMW)': string,
    "Channel": string,
    "Direction / Lane": string,
    "Merchant": string,
    "Ref": string,
    "Is Exempt": string,
    "Plate Type": string
}

export interface PageReceipt{
    "account_type": string,
    "amount": number,
    "amount_charged": number,
    "card_number": string,
    "cashier": string,
    "channel": string,
    "date": string,
    "direction": string,
    "distributor": string,
    "distributor_id": string,
    "id": string,
    "is_exempt": string,
    "merchant": string,
    "plate_type": string,
    "plaza": string,
    "receipt_number": string,
    "ref": string,
    "runningBalance": number,
    "total_count": number,
    "total_transaction_value": number,
    "vehicle_reg": string
}

export class ReceiptProcessed{
    "plaza": string;
    "ref": string;
    "receiptNo": string;
    "cardNumber": string;
    "channel": string;
    "directionLane": string;
    "amountCollected": number;
    "amountCharged": number;
    "distributor": string;
    "cashier": string;
    "isExempt": string;
    "vehicleReg": string;
    "date": string;

    constructor(){};

    static fromReceipt(receipt: Receipt): ReceiptProcessed{
        let processed = new this();
        processed.plaza = receipt.Plaza;
        processed.ref = receipt.Ref;
        processed.receiptNo = receipt["Receipt No"];
        processed.cardNumber = receipt["Card Number"];
        processed.channel = receipt.Channel;
        processed.directionLane = receipt["Direction / Lane"];
        processed.amountCollected = +receipt["Amount Collected(ZMW)"];
        processed.amountCharged = +receipt["Amount Charged(ZMW)"];
        processed.distributor = receipt.Distributor;
        processed.cashier = receipt.Cashier;
        processed.isExempt = receipt["Is Exempt"];
        processed.vehicleReg = receipt["Vehicle Reg."];
        processed.date = receipt.Date;
        return processed;
    }

    static fromPageReceipt(pageReceipt: PageReceipt): ReceiptProcessed{
        let processed = new this();
        processed.plaza = pageReceipt.plaza;
        processed.ref = pageReceipt.ref;
        processed.receiptNo = pageReceipt.receipt_number;
        processed.cardNumber = pageReceipt.card_number;
        processed.channel = pageReceipt.channel;
        processed.directionLane = pageReceipt.direction;
        processed.amountCollected = +pageReceipt.amount.toString();
        processed.amountCharged = +pageReceipt.amount_charged.toString();
        processed.distributor = pageReceipt.distributor;
        processed.cashier = pageReceipt.cashier;
        processed.isExempt = pageReceipt.is_exempt;
        processed.vehicleReg = pageReceipt.vehicle_reg;
        processed.date = pageReceipt.date;
        return processed;
    }
  }
 