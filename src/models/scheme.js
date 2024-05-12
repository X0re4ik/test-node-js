const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const walletScheme = new Schema({
    seed12: {
        type: String,
        required: [true, "Seed12 is required"],
    },
    key: {
        type: String,
        required: [true, "API Key is required"],
        unique: true,
    },
    keys: {
        type: Map,
        of: String,
        required: [true, "Keys is required"],
    },
});

module.exports = {
    walletScheme,
}