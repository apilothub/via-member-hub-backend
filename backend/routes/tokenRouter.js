const tokenController = require('../controllers/token.controller');
const express = require('express');
const router = express.Router();
router.get('/gettoken',tokenController.getToken);
module.exports=router