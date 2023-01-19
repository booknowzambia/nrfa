import fs from 'fs'
import axios from 'axios'
import express from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import {getReversalsXlsx} from './helpers/getFromXlsxEndpoint.js'
import {ReceiptProcessed} from './models/receipt.js'
import {
    CARDS_URL,
    DISTRIBUTOR_REVERSALS,
    DISTRIBUTORS,
    getCardsURLEnum,
    getDistributorEnum,
    getReceiptsURLEnum,
    getReversalDistributorEnum,
    getReversalsURLEnum,
    RECEIPTS_URL,
    REVERSALS_URL
} from './config.js'
import post from './helpers/post.js'
import {ReversalProcessed} from './models/reversal.js'
import {updateCard} from './helpers/updateCards.js'
import {getPageReceipts} from './helpers/getPageData.js'
import {getDistributorFromRef} from './utils/distributor.js'

const port = process.env.PORT != null ? +process.env.PORT : 3000

// interface RequestBody<T> extends Express.Request {
//     body: T
// }

const app = express()
app.use(express.json({limit: '50mb'}))

Sentry.init({
    dsn: "https://1bbd6192871941e9ad303aed4c533787@o1318404.ingest.sentry.io/6676399",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({
            // to trace all requests to the default router
            app,
            // alternatively, you can specify the routes you want to trace:
            // router: someRouter,
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.get('/', (req, res) => res.send({ massage: 'Book Now Zambia Scrapping Tools v2' }))

// interface cardRequest {
//     action: 'enable' | 'disable',
//     cards: Array<string>
// }

app.put('/cards', async (req: any, res) => {
    getDistributorFromRef(req)

    let url: CARDS_URL | undefined = getCardsURLEnum(req.query.distributor)

    if (url == undefined) {
        let err = 'ERROR: distributor string was malformed in reversals endpoint'
        console.log(err)
        res.send({message: err})
        return
    }

    res.send({message: 'transaction started'})

    let responses: Array<string> = []
    for (let card of req.body.cards) {
        let response = await updateCard(req.body.action == 'enable', card)
        responses.push(response)
    }

    await axios.put(url, {action: req.body.action, cards: responses})

    return
})

app.get('/reversals', async (req: any, res) => {
    getDistributorFromRef(req)

    let ref = `BNZ${Math.floor(Math.random() * 899999 + 100000)}`
    // let start = Date.now()

    let distributor: DISTRIBUTOR_REVERSALS | undefined = getReversalDistributorEnum(req.query.distributor)
    let url: REVERSALS_URL | undefined = getReversalsURLEnum(req.query.distributor)

    if (distributor == undefined || url == undefined) {
        let err = 'ERROR: distributor string was malformed in reversals endpoint'
        console.log(err)
        res.send({message: err})
        return
    }

    res.send({message: 'Transaction started.', ref})

    // gets the last 1 day of receipts
    // let startDate = new Date('2022-08-12 17:30:06 GMT+02:00')//(endDate.valueOf() - 1000*3600*24*1);
    let endDate = new Date()
    let startDate = new Date(endDate.valueOf() - 1000 * 3600 * 24)
    let reversals: Array<ReversalProcessed> = await getReversalsXlsx(distributor, startDate)
    let receipts: Array<ReceiptProcessed> = []

    if (req.query.distributor === 'DOT_COM_ZAMBIA') {
        // const data: Array<ReversalProcessed> = []

        for (const {amountReversed, receiptNo, ...rest} of reversals) {
            const {reason, plateNumber, transactionCashier, cardNumber, plaza, date} = rest
            receipts.push({
                date, plaza, cardNumber,
                ref: `${reason} - ${receiptNo}`,
                receiptNo: `REV-${receiptNo}`,
                channel: '',
                directionLane: '',
                amountCollected: -amountReversed,
                amountCharged: -amountReversed,
                distributor: 'Dot Com Zambia',
                cashier: transactionCashier,
                vehicleReg: plateNumber,
                isExempt: ''
            })
            // data.push({amountReversed: -amountReversed, receiptNo: `REV-${receiptNo}`, ...rest})
        }

        // await post(data, url)
        await post(receipts, url)
    } else {
        await post(reversals, url)
    }

    return
})

app.get('/receipts', async (req: any, res) => {
    try {
        getDistributorFromRef(req)

        let distributor: DISTRIBUTORS | undefined = getDistributorEnum(req.query.distributor)
        let url: RECEIPTS_URL | undefined = getReceiptsURLEnum(req.query.distributor)

        if (distributor == undefined || url == undefined) {
            let err = 'ERROR: distributor string was malformed in receipts endpoint'
            console.log(err)
            res.send({message: err})
            return
        }

        res.send({message: 'transaction started'})

        // gets the last 1 day of receipts
        let endDate = new Date()
        let startDate = new Date(endDate.valueOf() - 1000 * 3600 * 24) //new Date("2022-08-12 17:30:06 GMT+02:00");
        let receipts: Array<ReceiptProcessed> = await getPageReceipts(distributor, startDate, endDate)

        if (process.env.NODE_ENV !== 'production') {
            let filepath = './data/' + endDate.valueOf() + '.json'
            fs.writeFileSync(filepath, JSON.stringify(receipts, null, 4))
        }

        await post(receipts, url)
        return
    } catch (e) {
        console.error('ERR::', e)
        Sentry.captureException(e)
    }
})

app.use(Sentry.Handlers.errorHandler())

app.listen(port, () => {
    console.log(`🚀 Ready at http://localhost:${port}`)
})

export default app