
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    // 1. Kiểm tra authHeader có tồn tại và có bắt đầu bằng 'Bearer ' không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    // 2. Lấy token
    const token = authHeader.split(' ')[1];
    // 3. try { jwt.verify...; req.user = ...; next(); } catch { lỗi }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
}

module.exports = { authMiddleware };