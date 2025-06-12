const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();
const middleware=require('../middleware/auth.middleware');
router.get('/alluser',middleware.checkToken(),userController.getUsers);
router.get('/:id',middleware.checkToken(),userController.getUsersById);

module.exports = router;