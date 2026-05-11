import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemAPI, skillAPI, announcementAPI } from '../services/api';

function Publish() {
  const [publishType, setPublishType] = useState('item');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.isVerified && publishType !== 'announcement') {
      alert('请先完成实名认证');
      return;
    }
    if (publishType === 'announcement' && user?.role !== 'admin') {
      alert('仅管理员可发布公告');
      return;
    }

    setLoading(true);
    try {
      if (publishType === 'item') {
        await itemAPI.create({ title, description, category });
      } else if (publishType === 'skill') {
        await skillAPI.create({ title, description });
      } else if (publishType === 'announcement') {
        await announcementAPI.create({ title, content: description });
      }
      alert('发布成功！');
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || '发布失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="text-gray-600 text-lg">← 返回</button>
          <h1 className="text-xl font-bold text-gray-800">发布内容</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex bg-white rounded-xl shadow-sm p-1 mb-6">
          <button
            onClick={() => setPublishType('item')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition ${
              publishType === 'item' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            闲置物品
          </button>
          <button
            onClick={() => setPublishType('skill')}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition ${
              publishType === 'skill' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            技能交换
          </button>
          {user?.role === 'admin' && (
            <button
              onClick={() => setPublishType('announcement')}
              className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition ${
                publishType === 'announcement' ? 'bg-blue-600 text-white' : 'text-gray-600'
              }`}
            >
              社区公告
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="请输入标题"
              required
            />
          </div>

          {publishType === 'item' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">请选择分类</option>
                <option value="工具">工具</option>
                <option value="书籍">书籍</option>
                <option value="日用品">日用品</option>
                <option value="其他">其他</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {publishType === 'announcement' ? '公告内容' : '描述'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="请输入详细描述..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? '发布中...' : '立即发布'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Publish;
