const express = require('express');
const router = express.Router();
const userRoutes = require('./user/routes/user.route');


router.use('/users', userRoutes);


module.exports = router;