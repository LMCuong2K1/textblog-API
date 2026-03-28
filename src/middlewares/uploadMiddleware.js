const express = require('express');
const multer = require('multer');
const path = require('path');

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, '../../public/uploads/'));
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,file.name+"-"+uniqueSuffix+ext);
    }
});

const upload = multer({
    storage:storage});

module.exports = {upload};