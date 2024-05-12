
const {
    blockCypherConfig,
    webHookConfig
} = require('./../../settings/configs');
const axios = require('axios');

class BlockCypherHook {
    constructor(token, prefix) {
        this.token = token || blockCypherConfig.token;
        this.baseURLConstructor = (currencyName) => {
            const prefix = currencyName.toLowerCase();
            return `https://api.blockcypher.com/v1/${prefix}/main/hooks?token=${this.token}`;
        };

        this.baseURL = this.baseURLConstructor(prefix);
    }

    async createHook(address, url) {
        const data = {
            event: "confirmed-tx",
            address: address,
            url: url
        };
        const response = await axios.post(this.baseURL, data);
        return (response.status < 300) ? response.data : null;
    }
}



class BTCBlockCypherHook extends BlockCypherHook {
    constructor(token) {
        super(token, "btc");
    }
}

class LTCBlockCypherHook extends BlockCypherHook {
    constructor(token) {
        super(token, "ltc");
    }
}


class ETHBlockCypherHook extends BlockCypherHook {
    constructor(token) {
        super(token, "eth");
    }
}


const createWebHooks = async (btc, ltc, eth, url = webHookConfig.ENDPOINT) => {
    const btcbch = await (new BTCBlockCypherHook()).createHook(btc, url);
    const ltcbch = await (new LTCBlockCypherHook()).createHook(ltc, url);
    const ethbch = await (new ETHBlockCypherHook()).createHook(eth, url);
    console.log(btcbch, ltcbch, ethbch);
    return [
        btcbch,
        ltcbch,
        ethbch,
    ]
};

module.exports = {
    BTCBlockCypherHook,
    LTCBlockCypherHook,
    ETHBlockCypherHook,
    createWebHooks
}