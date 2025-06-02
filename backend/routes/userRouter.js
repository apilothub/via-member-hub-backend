const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();
const middleware=require('../middleware/auth.middleware');
router.get('/alluser',middleware.checkToken() ,userController.getUsers);
router.get('/userbyid',middleware.checkToken() ,userController.getUsersById);

module.exports = router;