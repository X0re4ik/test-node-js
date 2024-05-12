

const { createApiKey } = require("./../utils/api-key");
const { publicPrivateKeys } = require("./../utils/public-private-keys");
const { connectToMongoose } = require("./../models/connections");
const { WalletModel } = require("./../models");

const bip39 = require('bip39')



class Wallet {
    /**
     * 
     * @param {String} email 
     */
    constructor(email) {
        this.email = email;
        this._seed12 = bip39.generateMnemonic();
        this._keys = publicPrivateKeys(this._seed12)
    }

    get APIKey() {
        return createApiKey(this.email);
    }

    get publicKey() {
        return this.keys.public;
    }

    get privateKey() {
        return this.keys.private;
    }


    get seed12() {
        return this._seed12;
    }

    get keys() {
       return this._keys;
    }

    get dbData() {
        return {
            seed12: this.seed12,
            key: this.APIKey,
            keys: {
                private: this.privateKey,
                public: this.publicKey,
            }
        }
    }
}



class WalletRepository {

    /** */
    constructor(email) {
        this.wallet = new Wallet(email);
    }

    async create() {
        await connectToMongoose();
        const data = this.wallet.dbData;
        return await WalletModel.create(data);
    }

    async getOrCreate() {
        await connectToMongoose();
        const wallet = await WalletModel.findOne({
            key: this.wallet.APIKey
        });
        if (!wallet) {
            return await this.create();
        }
        return wallet;
    }

}

module.exports = {
    WalletRepository
}