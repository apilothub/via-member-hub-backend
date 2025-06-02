const auth = require("../utils/authToken.js");
const checkToken = () => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json("Không có token, vui lòng đăng nhập!");
            }

            const token = authHeader.split(' ')[1];

            const decoded = await auth.verifyAccessTokenFE(token);
            if (!decoded) {
                return res.status(401).json("Token không hợp lệ");
            }

            // Bước 3: Gắn thông tin user vào request
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Lỗi xác thực FE token:", error);
            return res.status(500).json("Lỗi server trong quá trình xác thực token");
        }
    };
};


const checkTokenFE = () => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json("Không có token, vui lòng đăng nhập!");
            }

            const token = authHeader.split(' ')[1];

            const decoded = await auth.verifyAccessTokenFE(token);
            if (!decoded) {
                return res.status(401).json("Token không hợp lệ");
            }

            req.data = decoded;
            next();
        } catch (error) {
            console.error("Lỗi xác thực FE token:", error);
            return res.status(500).json("Lỗi server trong quá trình xác thực token");
        }
    };
};
module.exports = {checkTokenFE, checkToken}

