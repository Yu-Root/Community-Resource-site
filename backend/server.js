const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const skillRoutes = require('./routes/skillRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/announcements', announcementRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 邻里帮后端服务已启动: http://localhost:${PORT}`);
  console.log('📋 预置Mock数据已加载');
});
