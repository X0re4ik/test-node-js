const mongoose = require("mongoose");
const { connectToMongoose } = require("./connections");

const {
    walletScheme
} = require("./scheme");


const WalletModel = mongoose.model("Wallet", walletScheme);

module.exports = {
    WalletModel,
    connectToMongoose,
}