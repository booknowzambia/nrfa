export enum CARDS_URL {
    DC_ZAMBIA_ETOLLS = 'https://retail.etoll.co.zm/api/v1/callback/cards'
}

export enum REVERSALS_URL {
    DC_ZAMBIA_ETOLLS = 'https://data.mongodb-api.com/app/triggers_realmapp-kokfg/endpoint/nrfa_reversals',
    DOT_COM_ZAMBIA = 'https://fallback.etoll.co.zm/pos/capture_nrfa_transactions.php'
}

export enum RECEIPTS_URL {
    DC_ZAMBIA_ETOLLS = 'https://data.mongodb-api.com/app/triggers_realmapp-kokfg/endpoint/nrfa_receipts',
    DOT_COM_ZAMBIA = 'https://fallback.etoll.co.zm/pos/capture_nrfa_transactions.php',
    INTER_AFRICA = 'https://fallback.etoll.co.zm/pos/capture_inter_africa_transactions.php'
}

export enum DISTRIBUTORS {
    DC_ZAMBIA_ETOLLS = '98858052',
    DOT_COM_ZAMBIA = '50217427',
    INTER_AFRICA = '99552682'
}

export enum DISTRIBUTOR_REVERSALS {
    DC_ZAMBIA_ETOLLS = '50159',
    DOT_COM_ZAMBIA = '50155',
    INTER_AFRICA = '50283'
}

export function getReceiptsURLEnum(dist: string): RECEIPTS_URL | undefined {
    return (<any>RECEIPTS_URL)[dist]
}

export function getReversalsURLEnum(dist: string): REVERSALS_URL | undefined {
    return (<any>REVERSALS_URL)[dist]
}

export function getCardsURLEnum(dist: string): CARDS_URL | undefined {
    return (<any>CARDS_URL)[dist]
}

export function getDistributorEnum(dist: string): DISTRIBUTORS | undefined {
    return (<any>DISTRIBUTORS)[dist]
}

export function getReversalDistributorEnum(dist: string): DISTRIBUTOR_REVERSALS | undefined {
    return (<any>DISTRIBUTOR_REVERSALS)[dist]
}