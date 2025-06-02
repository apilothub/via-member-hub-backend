import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
const verifyToken = (token) => {
  const secretKey = 'your-secret-key';
  const retoken = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Trả về payload nếu token hợp lệ
  } catch (err) {
    console.error('Invalid token:', err.message);
    return null; // Trả về null nếu token không hợp lệ
  }
};
export default generateToken
