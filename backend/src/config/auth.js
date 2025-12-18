// jwt, expirationTime, refreshExpirationTime
const env = require('./env');

const authConfig = {
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  bcryptRounds: env.BCRYPT_ROUNDS
};

module.exports = authConfig; 