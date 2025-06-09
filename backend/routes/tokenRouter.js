const tokenController = require('../controllers/token.controller');
const express = require('express');
const router = express.Router();
const middleware=require('../middleware/auth.middleware');
router.get('/gettoken',middleware.checkTokenFE(),tokenController.getToken);
module.exports=router