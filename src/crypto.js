const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');

const saltRounds = 10;

function encryptData(data, secret){
  var cipher = crypto.createCipher('aes-256-ctr',secret)
  var crypted = cipher.update(data,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decryptData(data_encrypted, secret) {
  var decipher = crypto.createDecipher('aes-256-ctr',secret)
  var dec = decipher.update(data_encrypted,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


/* @args
  - psecret   part of the secret we want to encrypt
  - kk        public key of whoever to encrypt

*/
function encryptSecret(secret, publickey){
  const key = new NodeRSA(publickey);
  const encrypted = key.encrypt(secret);
  return encrypted;
}

function decryptSecret(encrypted_secret,privatekey){
  const key = new NodeRSA(privatekey);
  secret = key.decrypt(encrypted_secret,'utf8');
  return secret;
}

function getKeyPair(){
  const keypair = new NodeRSA({b: 512});
  return [keypair.exportKey('pkcs1'),keypair.exportKey('public')];
}
// keypair = getKeyPair();
// enc_secret = encryptSecret("hola dades",keypair[1]);
// console.log(decryptSecret(enc_secret,keypair[0]));

module.exports = { getKeyPair, encryptData, encryptSecret }