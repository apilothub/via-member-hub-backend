const auth = require('../utils/authToken.js');
const userController=require('../controllers/user.controller.js')
const dotenv=require('dotenv')
dotenv.config()
const getToken = async (req, res) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let token = auth.generateAccessToken(secretKey)
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({message:"Token sent successfullyAccess Token successfully"});
    } catch (err) {
        res.status(500).json({message: "Error getting token"});
    }
}
module.exports = {getToken};