const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/User');
const mongoose_delete = require('mongoose-delete');
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl:{
        type:String,
        required:true
    }
},
    { timestamps: true }
);

postSchema.plugin(mongoose_delete, { overrideMethod: true });
const Post = mongoose.model('Post', postSchema);

module.exports = Post;