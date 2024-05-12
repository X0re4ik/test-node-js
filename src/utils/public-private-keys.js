

const CryptoJS = require('crypto-js');
const EC = require('elliptic').ec;


/**
 * 
 * @param {String} token 
 */
const publicPrivateKeys = (token) => {
    const ec = new EC('secp256k1');
    const password = token;
    //CryptoJS.SHA256(password)
    
    const hashedPassword = CryptoJS.HmacSHA512(password, "unique_ip").toString(CryptoJS.enc.Hex);
    const keyPair = ec.keyFromPrivate(hashedPassword);
    return {
        public: keyPair.getPublic("hex"),
        private: keyPair.getPrivate("hex")
    }
}


module.exports = {
    publicPrivateKeys
}