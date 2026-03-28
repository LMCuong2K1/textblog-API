const authService = require('../services/authService');

const authController = {
    register: async (req, res) => {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(error.statusCode || 500).json({
                error: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const tokenData = await authService.login(req.body);
            res.status(200).json(tokenData);
        } catch (error) {
            res.status(error.statusCode || 500).json({
                error: error.message
            });
        }
    }
}

module.exports = authController;