const sss = require('shamirs-secret-sharing');

function joinSecret(shares) {
  const recovered = sss.combine(shares);
  return recovered;
}
function splitSecret(secret, boardKeys) {
  s_dpo = secret.substring(0,secret.length/2);
  rest_dpo = secret.substring(secret.length/2, secret.length);
  const junta_secret = Buffer.from(rest_dpo);
  const shares = sss.split(junta_secret, { shares: boardKeys.length, threshold: 1 });
  return {
    dpo_secret: s_dpo,
    junta_shares: shares
  }
}
module.exports = { joinSecret, splitSecret };