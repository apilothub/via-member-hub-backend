const userModel = require("../models/user.model");

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json({
        data: users,
        message: "Request successful",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        data: null,
        message: "Internal server error",
      });
    }
  }
  async getUsersById(req, res) {
    try {
      const id = req.params.id;
      const users = await userModel.getUserById(id);
      res.status(200).json({
        data: users,
        message: "Request successful",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        data: null,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new UserController();
