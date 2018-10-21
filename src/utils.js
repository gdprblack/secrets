const NodeRSA = require('node-rsa');
const randomstring = require("randomstring");
const sss = require('./shamirs');
const crypt = require('./crypto');

function generateSecret() {
  secret = randomstring.generate(30);
  return secret;
}
function getSecret(data, dpokey, boardKeys) {
  s = generateSecret();
  enc_data = crypt.encryptData(data,s);

  response = {};
  response['secret'] = s;
  response['encryptedData'] = enc_data;

  ssplit = sss.splitSecret(s, boardKeys);
  encryptedKeys = {};
  enc_secret_dpo = crypt.encryptSecret(ssplit.dpo_secret, new NodeRSA(dpokey.publicKey));
  encryptedKeys['dpoKey'] = enc_secret_dpo;
  enc_secret_board = {};

  for (i = 0; i < boardKeys.length; i++) { 
    enc = crypt.encryptSecret(ssplit.junta_shares[i], new NodeRSA(boardKeys[i].publicKey));
    enc_secret_board[boardKeys[i].publicKey] = enc;
  }
  encryptedKeys['boardKeys'] = enc_secret_board;
  response['encryptedKeys'] = encryptedKeys;
  return response;
}

function joinSecret(dpo_secret, board_buffers){
  // dpo_secret = decryptSecret(dpo_encryptedsecret, dpo_privatekey);
  // board_buffers = []
  // for (i=0; i<board_privatekeys.length; i++){
  //   board_buffers.push(decryptSecret(board_encryptedsecrets[i], board_privatekeys[i]))
  // }
  board_secret = sss.joinSecret(board_buffers);
  return dpo_secret+board_secret;
}


module.exports = {getSecret, joinSecret};