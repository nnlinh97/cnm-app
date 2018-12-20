const { Keypair } = require('stellar-base');

const key = Keypair.random();
console.log(key.secret());
console.log(key.publicKey());
// SDA2NBBLLH5VH6DSZUWUSOH76WHZQ23AVA5TWY5SK6O7QZLNZ6HNMFV5
// GAQCGVHLJ3TFFAHMCMRS6IMV7R7IBKELVQP3UQSC6CTHGDDIZBVKSG64