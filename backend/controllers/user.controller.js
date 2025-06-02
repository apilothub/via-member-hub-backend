const { successResponse, errorResponse } = require('../utils/constants');
const logger = require('../utils/logger');
const User=require('../models/User');
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
      const id = req.params.id;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          data: null,
          message: "User not found",
        });
      }

      res.status(200).json({
        data: user,
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
}

module.exports = new UserController();
