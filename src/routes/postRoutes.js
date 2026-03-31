const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const { upload } = require('../middlewares/uploadMiddleware');
const postRoutes = express.Router();

postRoutes.post('/', authMiddleware, upload.single('image'),postController.createPost);
postRoutes.get('/', postController.getAllPosts);
postRoutes.get('/my-posts', authMiddleware, postController.getMyPosts);
postRoutes.get('/:id', postController.getPostById);
postRoutes.put('/:id', authMiddleware,upload.single('image'), postController.updatePost);
postRoutes.delete('/:id', authMiddleware, postController.deletePost)
module.exports = postRoutes;