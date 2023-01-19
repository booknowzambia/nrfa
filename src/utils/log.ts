export const logTable = (index: number, total: number) => {
    console.clear()
    console.table({
        'eToll Zambia': {
            status: (index !== total - 1) ? 'fetching' : 'complete',
            percent: ((100 * index) / total).toFixed() + '%',
            fetched: index + 1,
            total
        }
    })
}