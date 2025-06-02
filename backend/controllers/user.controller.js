<<<<<<< HEAD
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import authToken from '../utils/authToken.js'
import { validate as validateEmail } from 'email-validator';
=======
const userModel = require("../models/user.model");
>>>>>>> 2880d889de1f5b5e68d6dde48d2351117751db14

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
<<<<<<< HEAD

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email.toLowerCase(),
    isAdmin: user.isAdmin,
    token: authToken(user._id),
  });

});

// @desc register a new user
// @route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    res.status(400);
    throw new Error('User đã tồn tại trước đó!');
  }

  validateUser(req.body);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  if (!user) {
    res.status(400);
    throw new Error('Tạo user thất bại!');
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email.toLowerCase(),
    isAdmin: user.isAdmin,
    token: authToken(user._id),
  });

});

// @desc get user profile
// @route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json(user ? 
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    } : 
    {});
});

// @desc    Update user profile in user
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error('không tìm thấy user!');
  }

  validateUser(req.body);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const emailUser = await User.findOne({ email: user.email.toLowerCase() });
  if (emailUser && !emailUser._id.equals(user._id)) {
    res.status(400);
    throw new Error('Email đã tồn tại trước đó!');
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email.toLowerCase(),
    isAdmin: updatedUser.isAdmin,
    token: authToken(updatedUser._id),
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'Đã xóa user' });
  } else {
    res.json({ message: 'User này đã được xóa trước đó!' });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error('Không tìm thấy user');
  }
});

// @desc    Update user from admin panel
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy user');  
  }

  validateUser(req.body);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const emailUser = await User.findOne({ email: user.email.toLowerCase() });
  if (emailUser && !emailUser._id.equals(user._id)) {
    res.status(400);
    throw new Error('Email đã tồn tại trước đó!');
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email.toLowerCase(),
    isAdmin: updatedUser.isAdmin,
  });
});

const validateUser = user => {
  if (!user.name || user.name.trim() == '') {
    throw Error("Tên không được rỗng!");
  }

  if (!validateEmail(user.email)) {
    throw Error("Email không hợp lệ!");
  }
};

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
=======
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
>>>>>>> 2880d889de1f5b5e68d6dde48d2351117751db14
}

module.exports = new UserController();
