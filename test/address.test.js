
const assert = require("assert");
const {
    ETHAddress,
    LTCAddress,
    BTCAddress
} = require("../src/repositories/address");


it("standard coin path check", async () => {
    const mnemonic = "bike wealth define pet glare belt rug clock library lonely erosion come";
    const index = 0;
    const ethAddress = await (new ETHAddress(mnemonic, index)).address();
    assert.strictEqual(ethAddress, "0x0E6af07ddB39cE48CE2DB93f53cBAeB2D5BbdfFA");
    const btcAddress = new BTCAddress(mnemonic, index).address();
    assert.strictEqual(btcAddress, "1CE3DdeEwzWHyTgL26RKoiN8fGEkbHKieW");
    const ltcAddress = new LTCAddress(mnemonic, index).address();
    assert.strictEqual(ltcAddress, "LNdVoEbwK7XzPrP1AXR7tEMyRWnT1j8jxx");
});


/**
 * Address generation testing on the example of a random mnemonic key (bip44)
 * Example: https://developerjesse.com/2023/09/08/derivation-paths.html
 */
describe("key generation for different addresses", () => {
    
    it("ETH", async () => {
        const mnemonic = "daughter welcome giant suspect curious tomato meadow suffer correct subject manage smoke";
        const indexes = [0, 1, 2];

        //                          m/44’/60’/0’/0/0                                m/44’/60’/0’/0/1                                    m/44’/60’/0’/0/2
        const addresses = ["0x4c08356Fe17fb42B801fC0E405B14dCc9B321288", "0x234EE14A557893A978ED86D22A6a94c95f1f309B", "0x3Cde56104802C273119FAE72D50D5C645bDe6638"]
        
        indexes.forEach(async (value, index, array) => {
            const ethAddress = await (new ETHAddress(mnemonic, value)).address();
            assert.strictEqual(ethAddress, addresses.at(index));
        });
    });



    it("BTC", () => {
        const mnemonic = "daughter welcome giant suspect curious tomato meadow suffer correct subject manage smoke";
        const indexes = [0, 1, 2];
        
        //                          m/44’/0’/0’/0/0                                m/44’/0’/0’/0/1                                    m/44’/0’/0’/0/2
        const addresses = ["1PHWtCN9dHCDdwB4BCBUb6R2wkHVc3FM8B", "15W7E33tzqa5NqZt35DHYqSu7XekHuV9wq", "14uRTd6YWdVnmDqSUKR4QRqBnxzmBu5RU3"]
        
        indexes.forEach(async (value, index, array) => {
            const btcAddress = new BTCAddress(mnemonic, value).address();
            assert.strictEqual(btcAddress, addresses.at(index));
        });
    });

})