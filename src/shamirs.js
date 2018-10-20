function joinSecret(shares) {
  const recovered = sss.combine(shares.slice(3, 7));
  console.log("SECRET RECOVERED: ",recovered.toString());
}

export { joinSecret }