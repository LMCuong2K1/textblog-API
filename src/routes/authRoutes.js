const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateRegister } = require('../middlewares/validateMiddleware');
authRoutes.post('/register',validateRegister, authController.register);
authRoutes.post('/login', authMiddleware,authController.login);

module.exports = authRoutes;