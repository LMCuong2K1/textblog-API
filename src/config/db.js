const mongoose = require('mongoose');

module.exports = {
    connectDB: async () => {
        try {
            const options = {
                user: process.env.DB_USER,
                pass: process.env.DB_PASSWORD,
                dbName: process.env.DB_NAME
            };
            await mongoose.connect(process.env.DB_HOST, options);
            console.log('Connected to MongoDB');
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    }
}