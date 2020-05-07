const CURRENCIES = {
    'EUR': '€ :price',
    'USD': '$ :price',
}

export const currencies = Object.keys(CURRENCIES)

export const priceTag = (price, currency, rates) => {
    let userPrice = convert(price, currency, rates)
    return priceAndSymbol(userPrice, currency)
}

export const priceAndSymbol = (price, currency) => {
    return CURRENCIES[currency].replace(':price', Number(price).toFixed(2))
}

export const convert = (price, currency, rates) => {
    if (currency === rates.base) return price
    return Number(rates.rates[currency] * price).toFixed(2)
}
