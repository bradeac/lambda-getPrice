import ccxt from 'ccxt'

export const getPrice = async (event, context, callback) => {
	const pathParams = event.params ? event.params.path : {}
	const { exchange, coin } = pathParams
	const symbol = decodeURIComponent(coin)

    if (exchange && coin && ccxt.exchanges.indexOf(exchange) > -1) {
		const exchangeObj = new ccxt[exchange]({ enableRateLimit: true })

		const { last, bid, ask, open, high, low, close, baseVolume } = await exchangeObj.fetchTicker(symbol)

		const result = {
			last,
			bid,
			ask,
			open,
			high,
			low,
			close,
			baseVolume,  
		}
			
		callback(null, result)
    }

    callback(null, null)
}