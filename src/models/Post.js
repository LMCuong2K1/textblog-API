const mongoose = require('mongoose');
<<<<<<< HEAD
const {Schema} = mongoose;

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{timestamps:true
},{timestamps:true});
=======
const { Schema } = mongoose;

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
    }
},
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
>>>>>>> 416ca8ab8316dbda06e7d5830a5bfb785f8dbff3
