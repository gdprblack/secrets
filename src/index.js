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
function decryptKeyBoard(encryptedKey, privateKey){
  return crypto.decryptKeyBoard(encryptedKey, privateKey);
}


//---------TESTING------------------

// //GENERATE KEYPAIR FOR DPO
// dpo_keys = {};
// k = generateKeypair();
// dpo_keys['publicKey'] = k.public;
// dpo_keys['privateKey'] = k.private;

// //GENERATE KEYPAIR FOR BOARD
// board_keys = [];
// for (i=0; i<3; i++){
//   keys = {};
//   k = generateKeypair();
//   keys['publicKey'] = k.public;
//   keys['privateKey'] = k.private;
//   board_keys.push(keys);
// }
// //USER WANTS TO DELETE DATA (generate secret, encrypt dpo secret part, encrypt board secrets parts)
// response = encryptData("dades del usuari", dpo_keys, board_keys);
// console.log(response);

// //DECRYPT DPO SECRET PART
// dposecret = decryptKeys(response.encryptedKeys.dpoKey, dpo_keys.privateKey);

// //DECRYPT EACH PART OF THE BOARDS MEMBERS
//   //Caution: We use different function to decrypt because the secret part is a Buffer(). 
//   //  To acces to the encrypted secret part of a board member we have to use his public key because we use public keys to match board members with encrypted secret parts
// m1 = decryptKeyBoard(response.encryptedKeys.boardKeys[board_keys[0].publicKey], board_keys[0].privateKey);
// m2 = decryptKeyBoard(response.encryptedKeys.boardKeys[board_keys[1].publicKey], board_keys[1].privateKey);
// m3 = decryptKeyBoard(response.encryptedKeys.boardKeys[board_keys[2].publicKey], board_keys[2].privateKey);

// secret = decryptSecrets(dposecret, [m1]);
// console.log(decryptData(response.encryptedData, secret));

module.exports = { generateKeypair, encryptData, decryptSecrets, decryptData, decryptKeys, decryptKeyBoard};