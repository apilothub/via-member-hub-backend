const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
}

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
const verifyAccessTokenFE = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET2);
  } catch (error) {
    return null;
  }
}
module.exports = {generateAccessToken, verifyAccessToken, verifyAccessTokenFE};