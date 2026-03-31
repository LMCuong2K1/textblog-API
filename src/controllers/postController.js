const postService = require('../services/postService');

const postController = {
    createPost: async (req, res) => {
        try {
            const newPost = await postService.createPost(req.body, req.user.userId, req.file);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const result = await postService.getAllPosts(req.query);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    getPostById: async (req, res) => {
        try {
            const post = await postService.getPostById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    updatePost: async (req, res) => {
        try {
            const updatedPost = await postService.updatePost(req.params.id, req.body, req.user.userId, req.user.userRole);
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    deletePost: async (req, res) => {
        try {
            const result = await postService.deletePost(req.params.id, req.user.userId, req.user.userRole);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    
    getMyPosts: async (req, res) => {
        try {
            const posts = await postService.getPostsByAuthor(req.user.userId);
            res.status(200).json(posts);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
};

module.exports = postController;