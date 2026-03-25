const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        const { username, password, email } = req.body;
        try {
            if (await User.findOne({ $or: [{ username: username }, { email: email }] })) {
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
            const { password: _, ...userWithoutPassword } = user.toObject();
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({
                    error: "Email hoặc mật khẩu không đúng!"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    error: "Email hoặc mật khẩu không đúng!"
                });
            }
            const payload = {
                userId: user._id,
                userRole: user.role
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                token: token
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}

module.exports = authController;