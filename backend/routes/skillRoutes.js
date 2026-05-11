const express = require('express');
const { skills, users } = require('../data/mockData');
const { verifiedOnlyMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: skills });
});

router.get('/nearby', (req, res) => {
  const nearbySkills = skills;
  res.json({ success: true, data: nearbySkills });
});

router.post('/', verifiedOnlyMiddleware, (req, res) => {
  const { title, description, lat, lng } = req.body;
  const user = users.find(u => u.id === req.user.id);
  
  const newSkill = {
    id: skills.length + 1,
    title,
    description,
    userId: req.user.id,
    userName: user.name,
    createdAt: new Date()
  };
  
  skills.push(newSkill);
  res.json({ success: true, data: newSkill, message: '发布成功' });
});

module.exports = router;
