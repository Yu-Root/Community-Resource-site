const express = require('express');
const { announcements, users } = require('../data/mockData');
const { adminOnlyMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: announcements });
});

router.post('/', adminOnlyMiddleware, (req, res) => {
  const { title, content } = req.body;
  const user = users.find(u => u.id === req.user.id);
  
  const newAnnouncement = {
    id: announcements.length + 1,
    title,
    content,
    userId: req.user.id,
    userName: user.name,
    createdAt: new Date()
  };
  
  announcements.push(newAnnouncement);
  res.json({ success: true, data: newAnnouncement, message: '发布成功' });
});

module.exports = router;
