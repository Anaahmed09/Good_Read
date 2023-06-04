const bcrypt = require("bcrypt");

const hashing = async function generateHash(plainTextPassword, saltRounds) {
  try {
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    console.log(hash);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

module.exports = hashing;
