const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const bip39 = require('bip39');
const bip32 = require('bip32');
const Wallet = require('ethereumjs-wallet');
const hdkey = require('ethereumjs-wallet').hdkey;
const keccak256 = require('js-sha3').keccak256;
const ethers = require('ethers');
const { ECPairFactory } = require("ecpair");
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

    getChild(root) {
        const child = root.derivePath(this.path);
        return ECPairFactory(ecc).fromPrivateKey(child.privateKey);
    }

    address() {
        const root = this.getRoot();
        const child1 = this.getChild(root);
        return bitcoin.payments.p2pkh(
            { 
                pubkey: child1.publicKey,
                network: this.network 
            }).address
    }
}


class BTCAddress extends BTCNetAddress {
    constructor(mnemonic, index = 0) {
        super(mnemonic, bitcoin.networks.bitcoin, `m/44'/0'/0'/0/${index}`);
    }

    get name() {
        return "BTC";
    }

}

class LTCAddress extends BTCNetAddress {
    constructor(mnemonic, index = 0) {
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
        super(mnemonic, LITECOIN, `m/44'/2'/0'/0/${index}`)
    }

    get name() {
        return "LTC";
    }
}


class ETHAddress {
    constructor(mnemonic, index = 0) {
        this.mnemonic = mnemonic;
        this.seed = getSeed(this.mnemonic);
        this.index = index;
    }

    get name() {
        return "ETH";
    } 

    async address() {
        const mnemonic = ethers.Mnemonic.fromPhrase(this.mnemonic);
        const path = `m/44'/60'/0'/0/${this.index}`;
        const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, path);
        return await wallet.getAddress()
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
            litecoin: (new LTCAddress(mnemonic)).address(),
            ethereum: (new ETHAddress(mnemonic)).address(),
        }
    }
}


module.exports = {
    AddressManager,
    ETHAddress,
    LTCAddress,
    BTCAddress
}