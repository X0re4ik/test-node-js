// const { Secp256k1HDKey, Ed25519HDKey } = require("@safeheron/crypto-bip32");
// const bitcoin = require('bitcoinjs-lib');
// const bip39 = require('bip39')
// const seed = bip39.mnemonicToSeed("elbow hawk slow bone craft funny middle unknown electric olive middle blade")
// let hdkey = Ed25519HDKey.fromMasterSeedHex(seed)
// console.log('xprv : ', hdkey.xprv)
// // => 'eprv423G5rKnJnGfkFkLNqjCetZ2AQdKMX1zM5TwmcnG3tKbuQzjjiu668ZC4zRtC4rXtQuz1e99cHr94DJ1augEmmXAbcCA1cVxkRgNtasdc1c'
// console.log('xpub:  ', hdkey.xpub)
// // => 'epub8YjJEGN2T9xLdin8GVPo4JD8jS9FWrCtvP4j48pZUA7zjuFWN7igGdB4F39s7umSx7CoiLF13yzPL8sUJWL14sPkVMdY9VHQjZVeVQSjWPZ')

// const CryptoJS = require('crypto-js');

// const data = CryptoJS.SHA256(hdkey.xpub).toString(CryptoJS.enc.Hex);

// const { bitcoinAddress } = require("./src/repositories/address");

// // // console.log(bitcoinAddress(hdkey.xpub))
// // // console.log(bitcoinAddress(hdkey.xprv))

// // //const pubkey = Buffer.from(publicKey, 'hex');

// bitcoinAddress(data);

// // let childHdKey = rootHDKey.derive('m/44/60/0')
// // console.log('childxprv : ', childHdKey.xprv)
// // // => 'eprv48jMzZSh71Sx5s2eDB5nGq8bEteV8xskhQZKsnxqBQu579KZW7wuCQ36urdzveVUA1ZRLkgNWve4YgRhY1yjq8PQpLaFyp2UMxooAHUmpJm'
// // console.log('child.xpub:  ', childHdKey.xpub)




// let Bip32 = require('bip32')(require('tiny-secp256k1'));
// let Bip39 = require("bip39");

// //Генерация мнемоники
// let mnemonic = Bip39.generateMnemonic();

// //Получение seed из мнемоники
// let seed = (await Bip39.mnemonicToSeed(mnemonic)).toString('hex');

// //Получение приватного ключа из seed
// let node = await Bip32
//   .fromSeed(Buffer.from(seed, 'hex'))
//   .derivePath(`m/44'/195'/0'/0/0`);

// let privateKey = node.privateKey.toString('hex');

// const { ripemd160 } = require("ripemd160-js");
// ripemd160("hello").then(console.log);



// Рабочий!!!!!
// const Bitcoin = require('bitcoinjs-lib');
// const ecc = require('tiny-secp256k1');
// const Bip39 = require('bip39');
// const Bip32 = require('bip32');

// function getAddress (node, network) {
//   return Bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
// }

// const mnemonic = `bike wealth define pet glare belt rug clock library lonely erosion come`;


// const seed = Bip39.mnemonicToSeedSync(mnemonic);

// const root = Bip32.BIP32Factory(ecc).fromSeed(seed, Bitcoin.networks.bitcoin);

// const child1 = root.derivePath("m/44'/0'/0'/0/0");
// const child2 = root.deriveHardened(44).deriveHardened(0).deriveHardened(0).derive(0).derive(0);

// console.log(getAddress(child1)); //1ENQm8nEP7sd6dqXbAMYZ4AuqcP8Y7AtR
// console.log(getAddress(child2)); //1Hb6Z1uZ1RuZ6GXTvedQ2ETYKYsMc5qynN






// const Bitcoin = require('bitcoinjs-lib');
// const ecc = require('tiny-secp256k1');
// const Bip39 = require('bip39');
// const Bip32 = require('bip32');

// function getAddress (node, network) {
//   return Bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
// }

// const mnemonic = `bike wealth define pet glare belt rug clock library lonely erosion come`;


// const seed = Bip39.mnemonicToSeedSync(mnemonic);

// const root = Bip32.BIP32Factory(ecc).fromSeed(seed, Bitcoin.networks.bitcoin);

// const child1 = root.derivePath("m/44'/0'/0'/0/0");
// const child2 = root.deriveHardened(44).deriveHardened(0).deriveHardened(0).derive(0).derive(0);

// console.log(getAddress(child1)); //1ENQm8nEP7sd6dqXbAMYZ4AuqcP8Y7AtR
// console.log(getAddress(child2)); //1Hb6Z1uZ1RuZ6GXTvedQ2ETYKYsMc5qynN










const Bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const Bip39 = require('bip39');
const Bip32 = require('bip32');

function getAddress (node, network) {
    return Bitcoin.payments.p2pkh({ pubkey: node.publicKey, network: network }).address
}

const mnemonic = `bike wealth define pet glare belt rug clock library lonely erosion come`;


const seed = Bip39.mnemonicToSeedSync(mnemonic);


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

const root = Bip32.BIP32Factory(ecc).fromSeed(seed, LITECOIN);

const child1 = root.derivePath("m/44'/60'/0'/0/0");
console.log(getAddress(child1, LITECOIN)); //1ENQm8nEP7sd6dqXbAMYZ4AuqcP8Y7AtR



// const ethers = require('ethers');

// async function init() {
//     //creating new random mnemonic
//     //const mnemonic = await ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
//     const mnemonic = 'bike wealth define pet glare belt rug clock library lonely erosion come';

//     //mnemonic to private, public key and address
//     const wallet = ethers.Wallet.fromPhrase(mnemonic);
//     console.log(wallet.address)
// }
// init().then(console.log);










// const ecc = require('tiny-secp256k1');

// function getAddress (node) {
//     return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network: LITECOIN }).address
// }
  
// const bitcoin = require('bitcoinjs-lib');
// const bip39 = require('bip39');
// const bip32 = require('bip32');

// const mnemonic = 'bike wealth define pet glare belt rug clock library lonely erosion come';
// const seed = bip39.mnemonicToSeedSync(mnemonic);
// console.log("seed: ", seed.toString("hex"));
// const root = bip32.BIP32Factory(ecc).fromSeed(seed, LITECOIN);
// console.log(root);
// const child = root.derivePath(`m/44'/2'/0'/0/0`);
// let addr = getAddress(child);
// console.log(addr);






















// const Wallet = require('ethereumjs-wallet')
// const BIP39 = require("bip39")
// const hdkey = require('ethereumjs-wallet').hdkey;
// const keccak256 = require('js-sha3').keccak256;


// // Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy
// function generateMnemonic(){
//     return BIP39.generateMnemonic()
// }
// function generateHexSeed(mnemonic){
//     return BIP39.mnemonicToSeedSync(mnemonic)
// }

// // var isValid = BIP39.validateMnemonic("Enter your mnemonic here")
// // // This will return false




// function generatePrivKey(mnemonic){
//     const seed = generateHexSeed(mnemonic)
//     return hdkey.fromMasterSeed(seed).derivePath(`m/44'/60'/0'/0`).getWallet().getPrivateKey()
// }


// // Import the wallet

// // Derive the public key from the private key
// function derivePubKey(privKey){
//     const wallet = Wallet.default.fromPrivateKey(privKey)    
//     return wallet.getPublicKey()
// }





// function deriveEthAddress(pubKey){
//     const address = keccak256(pubKey)
//     return "0x" + address.substring(address.length - 40, address.length)    
// }

// const mnemonic = "bike wealth define pet glare belt rug clock library lonely erosion come";
// const privateKey = generatePrivKey(mnemonic);
// const publicKey = derivePubKey(privateKey);
// const address = deriveEthAddress(publicKey);


// console.log(address)




// const litecore = require('litecore-lib');


// var value = Buffer.from('bike wealth define pet glare belt rug clock library lonely erosion come');
// var hash = litecore.crypto.Hash.sha256(value);
// var bn = litecore.crypto.BN.fromBuffer(hash);
// console.log(new litecore.PrivateKey(bn).toString())
// var address = new litecore.PrivateKey(bn).toAddress();
// console.log(address.toString());


// var privateKey = new litecore.PrivateKey();

// var address = privateKey.toAddress();

// console.log(address.)

// console.log(address.toString());