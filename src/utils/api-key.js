const crypto = require("crypto");


/**
 * 
 * @param {String} key 
 */
const createApiKey = (key) => {
    const salt = crypto
        .createHash("sha256")
        .update(key)
        .digest();
    
    const cryptokey = crypto.scryptSync(key, salt, 64);
    return cryptokey.toString("hex")
}

module.exports = {
    createApiKey,
}