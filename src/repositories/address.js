const bitcoin = require('bitcoinjs-lib');
const ethers = require('ethers');  
const crypto = require('crypto');


const bitcoinAddress = (publicKey) => {
    const pubkey = Buffer.from(publicKey, 'hex');
    const { address } = bitcoin.payments.p2pkh({ pubkey });
    return address
}
/**
 * 
 * @param {String} publicKey 
 * @returns 
 */
const ethereumAddress = (publicKey) => {
    const publicKey1 = "0x" + crypto.createHash('sha256').update(publicKey).digest('hex');
    const wallet = new ethers.Wallet(publicKey1);
    return wallet.address
}

const litecoinAddress = (publicKey) => {
    const LITECOIN = {
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bech32: 'ltc',
        bip32: {
            public: 0x019da462,
            private: 0x019d9cfe,
        },
        pubKeyHash: 0x30,
        scriptHash: 0x32,
        wif: 0xb0,
    };
    const pubkey = Buffer.from(publicKey, 'hex');
    const { address } = bitcoin.payments.p2pkh({
        pubkey: pubkey,
        network: LITECOIN,
    });
    return address
}


class AddressRepository {
    /**
     * 
     * @param {String} publicKey 
     */
    constructor(publicKey) {
        this.publicKey = publicKey;
    }

    


    addresses() {
        const publicKey = this.publicKey
        return {
            bitcoin: bitcoinAddress(publicKey),
            litecoin: litecoinAddress(publicKey),
            ethereum: ethereumAddress(publicKey),
        }
    }
}


module.exports = {
    bitcoinAddress,
    ethereumAddress,
    litecoinAddress,
    AddressRepository,
}