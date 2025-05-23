import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'
import { validate as validateEmail } from 'email-validator';



// @desc Auth user and get token
// @route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  const isLoginValid = user && (await user.matchPassword(password));

  if (!isLoginValid) {
    res.status(401);
    throw new Error('Email hoặc mật khẩu không chính xác!');    
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email.toLowerCase(),
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
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
    token: generateToken(user._id),
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
    token: generateToken(updatedUser._id),
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
}
