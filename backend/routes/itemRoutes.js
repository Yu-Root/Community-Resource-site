const express = require('express');
const { items, users } = require('../data/mockData');
const { verifiedOnlyMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: items });
});

router.post('/', verifiedOnlyMiddleware, (req, res) => {
  const { title, description, category, lat, lng } = req.body;
  const user = users.find(u => u.id === req.user.id);
  
  const newItem = {
    id: items.length + 1,
    title,
    description,
    category,
    userId: req.user.id,
    userName: user.name,
    createdAt: new Date()
  };
  
  items.push(newItem);
  res.json({ success: true, data: newItem, message: '发布成功' });
});

module.exports = router;
