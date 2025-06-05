const auth = require('../utils/authToken.js');
const userController=require('../controllers/user.controller.js')
const getToken = async (req, res) => {
    try {
        let user = await userController.getUsers
        let token = auth.generateAccessToken(user)
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({message:"Access Token successfully"});
    } catch (err) {
        res.status(500).json({message: "Error getting token"});
    }
}
module.exports = {getToken};