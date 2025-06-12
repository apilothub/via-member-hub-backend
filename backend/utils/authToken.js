const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (key) => {
  return jwt.sign(key, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
}

const verifyAccessToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.key === process.env.SECRET_KEY) {
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
};
const verifyAccessTokenFE = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET2);
    if (payload.key === process.env.SECRET_KEY2) {
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
};
module.exports = {generateAccessToken, verifyAccessToken, verifyAccessTokenFE};