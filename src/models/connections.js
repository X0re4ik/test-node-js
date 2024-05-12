 

const mongoose = require("mongoose");
const {
    mongoDBConfig
} = require("../settings/configs");


/**
 * 
 * @param {String} url 
 */
const connectToMongoose = async (url = mongoDBConfig.url) => {
    console.log(`Connecting to ${url}`);
    return await mongoose.connect(url);
}


module.exports = {
    connectToMongoose
}