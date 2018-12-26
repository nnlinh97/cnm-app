const { Keypair } = require('stellar-base');

const key = Keypair.random();
console.log(key.secret());
console.log(key.publicKey());
// SDHBK32O6VDJ7ISWY5MJBLIBAWZGKZS4BGAOCBORKPTEQ3EMQDXVMCL7
// GAVSCFXIBUNWDF7GDXXT3GTW7CQ4GBXMGXBFXQZLZ6POU2HXUKDUHTYW