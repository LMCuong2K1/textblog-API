const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

const postController = {
    createPost: async (req, res) => {
        const { title, content, tags } = req.body;
        const userId = req.user.userId;
        try {
            const newPost = await Post.create({
                title: title,
                content: content,
                tags: tags,
                author: userId
            });
            newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}

module.exports = postController;