let users = [
  {
    id: 1,
    phone: '138******01',
    password: '123456',
    name: '张三',
    idCard: '1****************4',
    isVerified: true,
    role: 'user'
  },
  {
    id: 2,
    phone: '138******02',
    password: '123456',
    name: '李四',
    idCard: '',
    isVerified: false,
    role: 'user'
  },
  {
    id: 3,
    phone: '138******03',
    password: 'admin123',
    name: '王物业',
    idCard: '',
    isVerified: true,
    role: 'admin'
  }
];

let items = [
  {
    id: 1,
    title: '电钻借用',
    description: '家用冲击钻，可打砖墙，免费借用3天',
    category: '工具',
    userId: 1,
    userName: '张三',
    createdAt: new Date('2026-05-08')
  },
  {
    id: 2,
    title: '儿童绘本赠送',
    description: '5本幼儿绘本，适合3-6岁孩子阅读，免费送',
    category: '书籍',
    userId: 1,
    userName: '张三',
    createdAt: new Date('2026-05-07')
  },
  {
    id: 3,
    title: '折叠雨伞',
    description: '闲置全新折叠晴雨伞，邻居可自取',
    category: '日用品',
    userId: 2,
    userName: '李四',
    createdAt: new Date('2026-05-09')
  },
  {
    id: 4,
    title: '家用梯子',
    description: '两步梯，高度1.2米，换灯泡挂窗帘都能用',
    category: '工具',
    userId: 1,
    userName: '张三',
    createdAt: new Date('2026-05-06')
  },
  {
    id: 5,
    title: '闲置自行车',
    description: '山地自行车，八成新，低价转让或交换',
    category: '交通工具',
    userId: 2,
    userName: '李四',
    createdAt: new Date('2026-05-05')
  }
];

let skills = [
  {
    id: 1,
    title: '教吉他换修电脑',
    description: '我可以教你基础吉他弹唱，希望交换电脑维修技能',
    userId: 1,
    userName: '张三',
    createdAt: new Date('2026-05-08')
  },
  {
    id: 2,
    title: '烘焙教学换书法指导',
    description: '擅长做蛋糕和面包，想学习书法基础',
    userId: 2,
    userName: '李四',
    createdAt: new Date('2026-05-07')
  },
  {
    id: 3,
    title: '英语辅导换摄影教学',
    description: '大学英语六级，可辅导孩子英语，想学摄影技巧',
    userId: 1,
    userName: '张三',
    createdAt: new Date('2026-05-09')
  }
];

let announcements = [
  {
    id: 1,
    title: '明日社区停水通知',
    content: '因管道维修，5月11日9:00-17:00社区将停水，请各位居民提前做好储水准备。',
    userId: 3,
    userName: '王物业',
    createdAt: new Date('2026-05-10')
  },
  {
    id: 2,
    title: '社区亲子活动报名',
    content: '本周六上午9点社区广场将举办亲子趣味运动会，欢迎各位家长带孩子报名参加！',
    userId: 3,
    userName: '王物业',
    createdAt: new Date('2026-05-06')
  }
];

module.exports = { users, items, skills, announcements };
