import axios from 'axios'
import * as Sentry from '@sentry/node'

import mem from '../utils/mem.js'

//posts scraped and processed data back to system B 
export default async (data: Array<any>, url: string) => {
    if (!data) return

    let i, j, docs, chunk = 1000
    for (i = 0, j = data.length; i < j; i += chunk) {
        docs = data.slice(i, i + chunk)
        console.log(`Posting: ${i}/${j}`)
        try {
            const res = await axios.post(url, docs)
            console.log(res.status, '::', res.statusText)
        } catch (e) {
            Sentry.captureException(e)
            console.error('Error Posting data ', e)
        }
    }

    console.table({
        ['eToll Zambia']: {
            ['Time(sm)']: Date.now(),// - start,
            ['Total Docs']: data.length,
            ['Mem Size']: mem.size(data)
        }
    })
}