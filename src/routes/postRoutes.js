const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.post('/create', authMiddleware, postController.createPost);

module.exports = postRoutes;