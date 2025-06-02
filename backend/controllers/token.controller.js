const auth = require('../utils/authToken.js');
const getToken = async (req, res) => {
    try {
        let data= req.data;
        let token = await auth.generateAccessToken(data);
        return res.status(200).json({message:"Access Token successfully",token:token});
    } catch (err) {
        res.status(500).json({message: "Error getting token"});
    }
}
module.exports = {getToken};