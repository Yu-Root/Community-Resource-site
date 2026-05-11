const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../data/mockData');
const { JWT_SECRET, authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  const { phone, password } = req.body;
  const user = users.find(u => u.phone === phone && u.password === password);
  
  if (!user) {
    return res.status(401).json({ success: false, message: '手机号或密码错误' });
  }
  
  const token = jwt.sign(
    { id: user.id, phone: user.phone, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified
    }
  });
});

router.post('/verify', authMiddleware, (req, res) => {
  const { name, idCard } = req.body;
  
  setTimeout(() => {
    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }
    
    users[userIndex].name = name;
    users[userIndex].idCard = idCard;
    users[userIndex].isVerified = true;
    
    res.json({ success: true, message: '认证成功' });
  }, 1000);
});

module.exports = router;
