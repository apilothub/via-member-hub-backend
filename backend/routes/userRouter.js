const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();
router.get('/alluser',userController.getUsers);
router.get('/:id',userController.getUsersById);

module.exports = router;