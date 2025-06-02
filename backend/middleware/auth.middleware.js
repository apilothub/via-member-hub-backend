const jwt = require("jsonwebtoken");
const auth = require("../utils/authToken.js");

const checkToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = auth.verifyAccessToken(token); // Giả sử hàm này trả về payload nếu hợp lệ

      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = decoded; // Lưu thông tin user vào req để sử dụng sau
      return next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};
