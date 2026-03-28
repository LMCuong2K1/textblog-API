const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authService = {
    register: async (userData) => {
        const { username, password, email } = userData;

        if (await User.findOne({ $or: [{ username: username }, { email: email }] })) {
            const error = new Error("User đã tồn tại!");
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username: username,
            password: hashedPassword,
            email: email
        };

        const user = await User.create(newUser);
        const { password: _, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    },

    login: async (credentials) => {
        const { email, password } = credentials;

        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("Email hoặc mật khẩu không đúng!");
            error.statusCode = 400;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Email hoặc mật khẩu không đúng!");
            error.statusCode = 400;
            throw error;
        }

        const payload = {
            userId: user._id,
            userRole: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token: token };
    }
};

module.exports = authService;
