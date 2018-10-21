const utils = require('./utils');
const crypto = require('./crypto');


function generateKeypair() {
  return crypto.getKeyPair();
}

function encryptData(data, dpoPublicKey, boardPublicKeys) {
  return utils.getSecret();
}

function decryptSecrets(dpo_privatekey, board_privatekeys, dpo_encryptedsecret, board_encryptedsecrets){
  return utils.joinSecret(dpo_privatekey, board_privatekeys, dpo_encryptedsecret, board_encryptedsecrets);
}

function decryptData(data_encrypted, secret){
  return crypto.decryptData(data_encrypted, secret);
}

// //GENERATE KEYPAIR FOR DPO
// dpo_keys = generateKeypair();

// //GENERATE KEYPAIR FOR BOARD
// public_board_keys = [];
// private_board_keys = [];
// for (i=0; i<3; i++){
//   public_board_keys.push(generateKeypair()[1]);
//   private_board_keys.push(generateKeypair()[0]);
// }

// //USER WANTS TO DELETE DATA
// response = encryptData("dades del usuari", dpo_keys[1], public_board_keys);
// console.log(response);

module.exports = { generateKeypair, encryptData, decryptSecrets, decryptDades};