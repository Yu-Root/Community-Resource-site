const jwt = require('jsonwebtoken');
const { users } = require('../data/mockData');

const JWT_SECRET = 'linlibang-secret-key-2026';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供Token' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token无效' });
  }
};

const verifiedOnlyMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    const user = users.find(u => u.id === req.user.id);
    if (!user || !user.isVerified) {
      return res.status(403).json({ success: false, message: '请先完成实名认证' });
    }
    next();
  });
};

const adminOnlyMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    const user = users.find(u => u.id === req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: '仅管理员可操作' });
    }
    next();
  });
};

module.exports = { JWT_SECRET, authMiddleware, verifiedOnlyMiddleware, adminOnlyMiddleware };
