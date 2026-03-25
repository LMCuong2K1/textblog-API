const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

authController = {
    register: async (req, res) => {
        let { username, password, email } = req.body;
        try {
            if (await User.findOne({ username: username }) || await User.findOne({ email: email })) {
                return res.status(400).json({
                    error: "User đã tồn tại!"
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                username: username,
                password: hashedPassword,
                email: email
            }
            const user = await User.create(newUser);
            res.status(201).json("Đăng ký thành công!");

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}