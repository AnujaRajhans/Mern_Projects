const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied, admin only' });
    }
    next();
};
