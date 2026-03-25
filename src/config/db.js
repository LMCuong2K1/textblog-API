const mongoose = require('mongoose');

module.exports = {
    connectDB : async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
}