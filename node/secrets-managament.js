// NPM INSTALL: randomstring, shamirs-secret-sharing, brcrypt
const randomstring = require("randomstring");
const sss = require('shamirs-secret-sharing')
const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');
const saltRounds = 10;
const NUM_JUNTA = 10;




function getData(user) {
  data1 = "{'id' : 1, 'name': 'enric','age': 24}"
  data2 = "{'id' : 2,'name': 'juanjo','age': 22}"
  return data1;
}

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

function joinSecret(shares) {
  const recovered = sss.combine(shares.slice(3, 7));
  console.log("SECRET RECOVERED: ",recovered.toString());
}

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
//
// keypairs = generateKeypairs();
// // user1 requests to delete his data
// s = generateSecret();
//
// console.log("SECRET: ",s);
// // insert in db
// enc_data = encryptData(getData('user1'),s);
// console.log("Decrypted: ", decryptData(s, enc_data));
// console.log("ENCRYPTED DATA: ",enc_data);
// // SEND SECRET TO USER
// ssplit = splitSecret(s);
// console.log("DPO SECRET: ", ssplit.dpo_secret);
// console.log("SHARES OF JUNTA: ", ssplit.junta_shares);
//
// // For example, we encrypt dpo secret and send it to him.
// encryptSecret(ssplit.dpo_secret, keypairs[0]);
// // Example with one person from the 'junta'
// encryptSecret(ssplit.junta_shares[0], keypairs[1]);


// joinSecret();

/*

Main function
@args
  - data
  - public key DPO,
  - array publick keys
@functions
  -
*/
function secrets(data, pkey, pkeys) {
  s = generateSecret();
  enc_data = encryptData(data,s);

  response = {};
  response['secret'] = s;
  response['data_encrypted'] = enc_data;

  ssplit = splitSecret(s);
  console.log("DPO SECRET: ", ssplit.dpo_secret);
  console.log("SHARES OF JUNTA: ", ssplit.junta_shares);
  enc_secret_dpo = encryptSecret(ssplit.dpo_secret, pkey);
  enc_secret_board = encryptSecret(ssplit.junta_shares, pkeys);

  response['dpo_secret'] = enc_secret_dpo;
  response['board_secret'] = enc_secret_board;


}
