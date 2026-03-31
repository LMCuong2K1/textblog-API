const Post = require('../models/Post');
const aqp = require('api-query-params').default;

const postService = {
    createPost: async (postData, userId, file) => {
        const { title, content, tags } = postData;
        const imageUrl = file ? '/uploads/' + file.filename : null;

        const newPost = await Post.create({
            title,
            content,
            tags,
            author: userId,
            imageUrl
        });
        return newPost;
    },

    getAllPosts: async (queryParams) => {
        const { filter, limit, sort } = aqp(queryParams);
        
        const page = filter.page ? parseInt(filter.page, 10) : 1;
        const actualLimit = limit || 10;
        const skip = (page - 1) * actualLimit;
        if (filter.page) delete filter.page;
        if (filter.q) {
            const keyword = filter.q;
            delete filter.q;
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { content: { $regex: keyword, $options: 'i' } }
            ];
        }
        if (filter.tag) {
            filter.tags = { $in: [filter.tag] };
            delete filter.tag;
        }

        const posts = await Post.find(filter)
            .populate('author', 'username email')
            .skip(skip)
            .limit(actualLimit)
            .sort(sort)
            .exec();
        
        const total = await Post.countDocuments(filter);

        return { posts, page, limit: actualLimit, total };
    },

    getPostById: async (postId) => {
        const post = await Post.findById(postId).populate('author', 'username email').exec();
        if (!post) {
            const error = new Error('Không tìm thấy bài viết');
            error.statusCode = 404;
            throw error;
        }
        return post;
    },

    updatePost: async (postId, postData, userId, userRole, file) => {
        let post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Không tìm thấy bài viết');
            error.statusCode = 404;
            throw error;
        }

        if (post.author.toString() !== userId && userRole !== 'admin') {
            const error = new Error('Bạn không có quyền cập nhật bài viết này');
            error.statusCode = 403;
            throw error;
        }

        const updateData = { ...postData };

        if (file) {
            updateData.imageUrl = '/uploads/' + file.filename;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            updateData,
            { new: true });

        return updatedPost;
    },

    deletePost: async (postId, userId, userRole) => {
        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Không tìm thấy bài viết');
            error.statusCode = 404;
            throw error;
        }

        if (post.author.toString() !== userId && userRole !== 'admin') {
            const error = new Error('Bạn không có quyền xóa bài viết này');
            error.statusCode = 403;
            throw error;
        }

        await Post.findByIdAndDelete(postId);
        return { message: 'Đã xóa bài viết thành công' };
    },

    getPostsByAuthor: async (userId) => {
        const posts = await Post.find({ author: userId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .exec();
        return posts;
    }
};

module.exports = postService;
