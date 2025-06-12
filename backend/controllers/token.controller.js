const auth = require('../utils/authToken.js');
const userController=require('../controllers/user.controller.js')
const dotenv=require('dotenv')
dotenv.config()
const getToken = async (req, res) => {
    try {
        let secretKey = {key:process.env.SECRET_KEY}
        let token =  auth.generateAccessToken(secretKey)
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({message:"Token sent successfully"});
    } catch (err) {
        console.log(err)
        res.status(401).json({message: "Missing key"});
    }
}
module.exports = {getToken};
