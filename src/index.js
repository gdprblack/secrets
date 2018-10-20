function generateKeypair() {
  //TODO: Generate Keypair
  return { public: 123, private: 456 };
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

export { generateKeypair, encryptData };