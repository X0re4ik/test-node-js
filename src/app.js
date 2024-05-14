
const express = require("express");
const bodyParser = require('body-parser');

const { WalletRepository } = require("./repositories/wallet");
const { AddressManager } = require("./repositories/address");
const { WalletModel } = require("./models");
const { connectToMongoose } = require("./models");
const { CryptocurrencyRateRepository } = require("./repositories/cryptocurrency-rate");
const { createWebHooks } = require("./utils/hooks");


const app = express();


app.use(bodyParser.json());


app.post("/api/generate_invoice", async function(request, response){
    const { api_key, amount, currency } = request.body;
    if (!api_key || !amount ||!currency) return response.status(400).json({ "error": "invalid request" });
    await connectToMongoose();
    const wm = await WalletModel.findOne({key: api_key})
    if (!wm) return response.status(400).json({ "error": "invalid api key" });

    const mnemonic = wm.seed12;
    const addresses = (new AddressManager(mnemonic)).addresses();

    const pricing = await (new CryptocurrencyRateRepository(amount, currency)).toJSON();

    const hooks = await createWebHooks(
        addresses.bitcoin, 
        addresses.litecoin, 
        addresses.ethereum
    );

    wm.index += 1;
    await wm.save()

    response.status(200).json({
        addresses,
        pricing,
        invoiceDetails: hooks
    });
});

app.post("/api/generate_wallet", async function(request, response) {
    const { email } = request.body;
    
    const wr = new WalletRepository(email);
    const instance = await wr.getOrCreate();

    response.status(200).json(instance.toJSON())
});

connectToMongoose().then(() => {
    console.log("Connected to Mongoose");
    console.log("Server started on port 3000");
    app.listen(3000);
}).catch(err => console.log(1));