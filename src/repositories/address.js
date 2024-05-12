const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const bip39 = require('bip39');
const bip32 = require('bip32');
const Wallet = require('ethereumjs-wallet');
const hdkey = require('ethereumjs-wallet').hdkey;
const keccak256 = require('js-sha3').keccak256;



const getSeed = (mnemonic) => {
    return bip39.mnemonicToSeedSync(mnemonic);
}



class BTCNetAddress {
    constructor(mnemonic, network, path) {
        this.mnemonic = mnemonic;
        this.network = network;
        this.path = path;

        this.seed = getSeed(this.mnemonic);
    }

    getRoot() {
        return bip32.BIP32Factory(ecc).fromSeed(this.seed, this.network);
    }

    address() {
        const root = this.getRoot();
        const child1 = root.derivePath(this.path);;
        return bitcoin.payments.p2pkh(
            { 
                pubkey: child1.publicKey,
                network: this.network 
            }).address
    }
}


class BTCAddress extends BTCNetAddress {
    constructor(mnemonic) {
        super(mnemonic, bitcoin.networks.bitcoin, "m/44'/0'/0'/0/0");
    }

    get name() {
        return "BTC";
    }
}

class LICAddress extends BTCNetAddress {
    constructor(mnemonic) {
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
        super(mnemonic, LITECOIN, "m/44'/60'/0'/0/0")
    }

    get name() {
        return "LTC";
    }
}


class ETCAddress {
    constructor(mnemonic) {
        this.mnemonic = mnemonic;
        this.seed = getSeed(this.mnemonic);
    }

    get name() {
        return "ETH";
    } 

    generatePrivKey() {
        return hdkey.fromMasterSeed(this.seed).derivePath(`m/44'/60'/0'/0`).getWallet().getPrivateKey()
    }

    derivePubKey(privKey){
        const wallet = Wallet.default.fromPrivateKey(privKey)    
        return wallet.getPublicKey()
    }

    deriveEthAddress(pubKey){
        const address = keccak256(pubKey)
        return "0x" + address.substring(address.length - 40, address.length)    
    }

    address() {
        const privateKey = this.generatePrivKey();
        const publicKey = this.derivePubKey(privateKey);
        const address = this.deriveEthAddress(publicKey);
        return address
    }
}


class AddressManager {
    /**
     * 
     * @param {String} publicKey 
     */
    constructor(mnemonic) {
        this.mnemonic = mnemonic;
    }

    addresses() {
        const mnemonic = this.mnemonic;
        return {
            bitcoin: (new BTCAddress(mnemonic)).address(),
            litecoin: (new LICAddress(mnemonic)).address(),
            ethereum: (new ETCAddress(mnemonic)).address(),
        }
    }
}


module.exports = {
    AddressManager
}