function generateKeypair() {
  return getKeyPair();
}

function encryptData(data, dpoPublicKey, boardPublicKeys) {
  //TODO: Generate Keys
  return { 
    encryptedData: "abc",
    secret: "def",
    encryptedKeys: {
      dpoKey: "fhd",
      boardKeys: {
        "user1": "dasfsg",
        "user2": "thnd" 
      }
    }
  }
}

module.exports = { generateKeypair, encryptData };