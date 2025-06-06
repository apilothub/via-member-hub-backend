const auth = require("../utils/authToken.js");
const checkToken = () => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json("No token, please login!");
            }

            const token = authHeader.split(' ')[1];
            const decoded = auth.verifyAccessToken(token);

            if (!decoded) {
                return res.status(401).json("Invalid Token");
            }

            next(); // cho phép đi tiếp nếu token hợp lệ
        } catch (error) {
            console.error("Token authentication error:", error);
            return res.status(500).json("Server error during token authentication");
        }
    };
};


const checkTokenFE = () => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json("No token, please login!");
            }

            const token = authHeader.split(' ')[1];

            const decoded = await auth.verifyAccessTokenFE(token);
            if (!decoded) {
                return res.status(401).json("Invalid Token");
            }

            req.data = decoded;
            next();
        } catch (error) {
            console.error("Token authentication error:", error);
            return res.status(500).json("Server error during token authentication");
        }
    };
};
module.exports = {checkTokenFE, checkToken}

