const axios = require('axios');

class CryptocurrencyRate {

    /**
     * 
     * @param {String} name
     * @param {Number} usd 
     */
    constructor(name, symbol, usd) {
        this.name = name;
        this.usd = usd;
        this.symbol = symbol;
    }

    /**
     * 
     * @param {Number} usd 
     */
    amount(usd) {
        return usd / this.usd;
    }
     
}



const convertCryptocurrency = async (from, to) => {
    try {
        const response = await axios.get(`https://api.coinbase.com/v2/prices/${from}-${to}/buy`);
        if (response.status === 200) {
            const data = response.data;
            const {
                amount, base, currency   
            } = data.data;
            return {
                price: amount,
                reversePice: 1 / amount,
            } 
        }
    }
    catch (e)  {
        return {
            price: 0,
            reversePice: 0,
        }
    }
}

class CryptocurrencyRateRepository {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }

    async convert(from, amountTo) {
        const {
            price,
            reversePice,
        } = await convertCryptocurrency(from, this.currency);
        return {
            rate: price,
            amount: reversePice * amountTo,
        }
    }

    async toJSON() { 
        
        return {
            local: {
                amount: this.amount,
		        currency: this.currency,
            },
            bitcoin: await this.convert("BTC", this.amount),
            litecoin: await this.convert("LTC", this.amount),
            ethereum: await this.convert("ETH", this.amount),
        }
    }
}

module.exports = {
    CryptocurrencyRateRepository,
    CryptocurrencyRate
}