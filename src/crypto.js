const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');
const saltRounds = 10;

function encryptData(data, secret){
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(data, salt);
  return hash;
}

function decryptData(data_encrypted, secret) {
  // canviar
  return bcrypt.compareSync(secret, data_encrypted);
}

/* @args
  - psecret   part of the secret we want to encrypt
  - kk        public key of whoever to encrypt

*/
function encryptSecret(psecret, key){
  const encrypted = key.encrypt(psecret, 'base64');
  console.log('encrypted: ', encrypted);
  return encrypted;
}

function decryptSecret(privateKey){
  return secret;
}

function getKeyPair(){
  const keypair = new NodeRSA({b: 512});
  return [keypair.exportKey('pkcs1'),keypair.exportKey('public')];
}

module.exports = { getKeyPair, encryptData, encryptSecret }