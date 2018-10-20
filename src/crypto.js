const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');

function encryptData(data, secret){
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(data, salt);
  return hash;
}

function decryptData(data_encrypted, secret) {
  return bcrypt.compareSync(secret, data_encrypted);
}

/* @args
  - psecret   part of the secret we want to encrypt
  - kk        public key of whoever to encrypt

*/
function encryptSecret(psecret, kk){
  const encrypted = kk.encrypt(psecret, 'base64');
  console.log('encrypted: ', encrypted);
  return encrypted;
}

function decryptSecret(privateKey){
  return secret;
}

function generateKeypair(){
  const keypair = new NodeRSA({b: 512});
  return keypair;
}