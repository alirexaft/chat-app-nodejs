const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const authorization = require('./../../../middlewares/authorization');


router.post('/v1/login', userController.login);
router.post('/v1/register', userController.register);

module.exports = router;