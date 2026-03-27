const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');

const postRoutes = express.Router();

postRoutes.post('/create', authMiddleware, postController.createPost);
postRoutes.get('/', postController.getAllPosts);
postRoutes.get('/:id', postController.getPostById);
postRoutes.put('/:id', authMiddleware, postController.updatePost);
postRoutes.delete('/:id', authMiddleware, postController.deletePost)
module.exports = postRoutes;