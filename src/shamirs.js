const sss = require('shamirs-secret-sharing');

function joinSecret(shares) {
  const recovered = sss.combine(shares.slice(3, 7));
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
module.exports = { joinSecret, splitSecret };