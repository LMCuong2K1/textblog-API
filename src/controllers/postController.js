const Post = require('../models/Post');
const aqp = require('api-query-params').default;

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
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const { filter, limit, sort } = aqp(req.query);
            console.log("filter: ", filter, "limit: ", limit, "sort: ", sort);

            const page = filter.page ? parseInt(filter.page, 10) : 1;
            const actualLimit = limit || 10;
            const skip = (page - 1) * actualLimit;
            if (filter.page) delete filter.page;

            if (filter.search) {
                const keyword = filter.search.trim();
                delete filter.search;
                filter.$or = [
                    { title: { $regex: keyword, $options: 'i' } },
                    { content: { $regex: keyword, $options: 'i' } },
                    { tags: { $regex: keyword, $options: 'i' } },
                ]
            }
            const posts = await Post.find(filter)
                .populate('author', 'username email')
                .skip(skip)
                .limit(actualLimit)
                .sort(sort)
                .exec();
            res.status(200).json({
                posts: posts,
                page: page,
                limit: actualLimit,
                total: await Post.countDocuments(filter)
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    getPostById: async (req, res) => {
        const postId = req.params.id;
        try {
            const post = await Post.findById(postId).populate('author', 'username email').exec();
            if (!post) {
                return res.status(404).json({
                    error: 'Post not found'
                });
            }
            res.status(200).json(post);
        }
        catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    updatePost:async(req,res)=>{
        try{
        const postId = req.params.id;
        let post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                error:'Post not found'
            });
        };
        if(post.author.toString() !== req.user.userId && req.user.userRole !== 'admin'){
            return res.status(403).json({
                error:'You are not authorized to update this post'
            });
        }
        const {title,content,tags} = req.body;
            post = await Post.findByIdAndUpdate(postId,{
                title:title,
                content:content,
                tags:tags
            },{new:true});
            res.status(200).json(post);
        }
        catch(error){
            res.status(500).json({
                error:error.message
            });
        }
    },
    deletePost:async(req,res)=>{
        try{
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                error:'Post not found'
            });
        };
        if(post.author.toString() !== req.user.userId){
            return res.status(403).json({
                error:'You are not authorized to delete this post'
            });
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            message:'Post deleted successfully'
        });
        }
        catch(error){
        res.status(500).json({
            error:error.message
        });
    }
    }
}

module.exports = postController;