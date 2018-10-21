const utils = require('./utils');
const crypto = require('./crypto');


function generateKeypair() {
  return crypto.getKeyPair();
}

function encryptData(data, dpoPublicKey, boardPublicKeys) {
  return utils.getSecret(data, dpoPublicKey, boardPublicKeys);
}

function decryptSecrets(dpo_secret, board_buffers){
  return utils.joinSecret(dpo_secret, board_buffers);
}

function decryptData(data_encrypted, secret){
  return crypto.decryptData(data_encrypted, secret);
}

function decryptKeys(encryptedKey, privateKey){
  return crypto.decryptKey(encryptedKey, privateKey);
}

// //GENERATE KEYPAIR FOR DPO
// dpo_keys['public'] = generateKeypair()[1];
// dpo_keys['private'] = generateKeypair()[0];

// //GENERATE KEYPAIR FOR BOARD
// public_board_keys = [];
// for (i=0; i<3; i++){
//   keys['public'] = generateKeypair()[1];
//   keys['private'] = generateKeypair()[0];
//   board_keys.push(keys);
// }

// //USER WANTS TO DELETE DATA
// response = encryptData("dades del usuari", dpo_keys, public_board_keys);
// console.log(response);

module.exports = { generateKeypair, encryptData, decryptSecrets, decryptData, decryptKeys};