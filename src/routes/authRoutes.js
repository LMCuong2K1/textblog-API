const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authMiddleware, authController.login);

module.exports = authRoutes;