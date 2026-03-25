const mongoose = require('mongoose');
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