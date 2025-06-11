const User = require('../models/user.model');

class UserController {
    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({
                data: users,
                message: "Request successful",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                data: null,
                message: "Internal server error",
            });
        }
    }

    async getUsersById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                return res.status(400).json({
                    data: null,
                    message: "Invalid user ID",
                });
            }

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    data: null,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                data: user,
                message: "Request successful",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                data: null,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new UserController();
