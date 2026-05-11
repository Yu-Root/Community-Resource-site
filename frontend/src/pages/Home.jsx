import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemAPI, skillAPI, announcementAPI, authAPI } from '../services/api';

function Home() {
  const [items, setItems] = useState([]);
  const [skills, setSkills] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('items');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyName, setVerifyName] = useState('');
  const [verifyIdCard, setVerifyIdCard] = useState('');
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');
      return;
    }
    setUser(storedUser);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [itemsRes, skillsRes, annRes] = await Promise.all([
        itemAPI.getAll(),
        skillAPI.getAll(),
        announcementAPI.getAll(),
      ]);
      setItems(itemsRes.data.data);
      setSkills(skillsRes.data.data);
      setAnnouncements(annRes.data.data);
    } catch (err) {
      console.error('加载数据失败', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    try {
      await authAPI.verify(verifyName, verifyIdCard);
      const updatedUser = { ...user, isVerified: true, name: verifyName };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setShowVerifyModal(false);
      alert('实名认证成功！');
    } catch (err) {
      alert('认证失败');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">🏘️ 邻里帮</h1>
          <div className="flex items-center gap-3">
            {user && (
              <>
                <span className="text-sm text-gray-600">
                  {user.name}
                  {user.isVerified ? (
                    <span className="ml-2 text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full">已认证</span>
                  ) : (
                    <button
                      onClick={() => setShowVerifyModal(true)}
                      className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full"
                    >
                      去认证
                    </button>
                  )}
                </span>
                <button
                  onClick={() => navigate('/publish')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  + 发布
                </button>
                <button onClick={handleLogout} className="text-gray-500 text-sm">
                  退出
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-yellow-800 mb-3 flex items-center">📢 社区公告</h2>
          <div className="space-y-3">
            {announcements.map(a => (
              <div key={a.id} className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-800">{a.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{a.content}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(a.createdAt).toLocaleDateString()} · {a.userName}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex bg-white rounded-xl shadow-sm p-1 mb-6">
          {[
            { key: 'items', label: '闲置物品' },
            { key: 'skills', label: '技能交换' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                activeTab === tab.key ? 'bg-blue-600 text-white' : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'items' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map(item => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{item.category}</span>
                <h3 className="font-semibold text-lg mt-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                <p className="text-xs text-gray-400 mt-4">{item.userName} · {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map(skill => (
              <div key={skill.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-2xl mb-2">🤝</div>
                <h3 className="font-semibold text-lg text-gray-800">{skill.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{skill.description}</p>
                <p className="text-xs text-gray-400 mt-4">{skill.userName} · {new Date(skill.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">实名认证</h2>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">真实姓名</label>
                <input
                  type="text"
                  value={verifyName}
                  onChange={(e) => setVerifyName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">身份证号</label>
                <input
                  type="text"
                  value={verifyIdCard}
                  onChange={(e) => setVerifyIdCard(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={verifying}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50"
                >
                  {verifying ? '认证中...' : '确认'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
