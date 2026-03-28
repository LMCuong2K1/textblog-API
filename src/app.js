const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.json());

app.use('/uploads', express.static('public/uploads'));
// Kết nối tới MongoDB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



app.get('/', (req, res) => {
  res.send('Hello Mentor, Server Blog API is running!');
});

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
      error:"Lỗi Server nội bộ!"
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});