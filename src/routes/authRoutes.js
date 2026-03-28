const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const { validateRegister } = require('../middlewares/validateMiddleware');
authRoutes.post('/register',validateRegister, authController.register);
authRoutes.post('/login', authController.login);

module.exports = authRoutes;