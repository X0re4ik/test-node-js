

const CryptoJS = require('crypto-js');
const EC = require('elliptic').ec;


/**
 * 
 * @param {String} token 
 */
const publicPrivateKeys = (token) => {
    const ec = new EC('secp256k1');
    const password = token;
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const keyPair = ec.keyFromPrivate(hashedPassword);
    return {
        public: keyPair.getPublic("hex"),
        private: keyPair.getPrivate("hex")
    }
}


module.exports = {
    publicPrivateKeys
}