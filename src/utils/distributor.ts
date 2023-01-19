import {Request} from 'express'

export const getDistributorFromRef = (req: Request) => {
    const ref = req.query.ref as string
    if (req.query.distributor === undefined) req.query.distributor = (/inter/gi.test(ref)) ? 'INTER_AFRICA' : (/fleet/gi.test(ref)) ? 'DOT_COM_ZAMBIA' : (/retail/gi.test(ref)) ? 'DC_ZAMBIA_ETOLLS' : undefined
}