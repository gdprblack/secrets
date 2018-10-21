const NodeRSA = require('node-rsa');
const randomstring = require("randomstring");
const sss = require('shamirs-secret-sharing');
const crypt = require('./crypto')

function generateSecret() {
  secret = randomstring.generate(30);
  return secret;
}

function splitSecret(secret) {
  s_dpo = secret.substring(0,secret.length/2);
  console.log("DPO SECRET PART: ",s_dpo);
  rest_dpo = secret.substring(secret.length/2, secret.length);
  console.log("JUNTA SECRET PART: ",rest_dpo);
  const junta_secret = Buffer.from(rest_dpo);
  const shares = sss.split(junta_secret, { shares: 10, threshold: 4 });
  return {
    dpo_secret: rest_dpo,
    junta_shares: shares
  }
}

/*

Main function
@args
  - data
  - public key DPO,
  - array publick keys
@functions
  -
*/
function secrets(data, dpokey, boardKeys) {
  s = generateSecret();
  enc_data = crypt.encryptData(data,s);

  response = {};
  response['secret'] = s;
  response['data_encrypted'] = enc_data;

  ssplit = splitSecret(s);
  console.log("DPO SECRET: ", ssplit.dpo_secret);
  console.log("SHARES OF BOARD: ", ssplit.junta_shares);
  enc_secret_dpo = crypt.encryptSecret(ssplit.dpo_secret, new NodeRSA(dpokey));
  enc_secret_board = [];
  i=0;
  for (key in boardKeys){
    enc = crypt.encryptSecret(ssplit.junta_shares[i], new NodeRSA(key));
    enc_secret_board.push(enc);
    i++;
  }
  

  response['dpo_secret'] = enc_secret_dpo;
  response['board_secret'] = enc_secret_board;
  console.log(response);

}

secrets('hola',crypt.getKeyPair()[1], [crypt.getKeyPair()[1],crypt.getKeyPair()[1]]);

// export { generateSecret, splitSecret };