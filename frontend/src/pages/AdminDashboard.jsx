import { useState, useEffect } from 'react';
import {
  FaShieldAlt,
  FaPlus,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaDatabase,
  FaSignOutAlt,
  FaLock,
  FaUser,
} from 'react-icons/fa';
import {
  fetchTemples,
  loginAdmin,
  createTempleAdmin,
  updateTempleAdmin,
  deleteTempleAdmin,
  approveTempleAdmin,
  seedDatabaseAdmin,
} from '../services/api';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('tb_admin_token') || '');
  const [adminUser, setAdminUser] = useState(JSON.parse(localStorage.getItem('tb_admin_user') || 'null'));

  // Auth Form State
  const [email, setEmail] = useState('admin@travelbharat.gov.in');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  // Dashboard Data State
  const [temples, setTemples] = useState([]);
  const [message, setMessage] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingTemple, setEditingTemple] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    city: '',
    address: '',
    deityName: '',
    deityCategory: 'Shaivism',
    history: '',
    architecturalStyle: 'Nagara / Dravidian',
    constructionEra: 'Ancient',
    heroImage: '',
    dressCode: 'Traditional Indian attire required',
    cameraPolicy: 'Strictly prohibited inside sanctum',
    isFeatured: false,
    isApproved: true,
  });

  const loadAdminTemples = async () => {
    try {
      const data = await fetchTemples({ isApproved: undefined }); // Fetch all regardless of approval
      setTemples(data || []);
    } catch (err) {
      console.error('Error loading admin temples:', err);
    }
  };

  useEffect(() => {
    if (token) {
      // Defer loading to avoid calling setState synchronously inside the effect body
      const id = setTimeout(() => {
        loadAdminTemples();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const data = await loginAdmin(email, password);
      if (data.role !== 'admin') {
        setAuthError('Access denied: User is not an admin.');
        return;
      }
      localStorage.setItem('tb_admin_token', data.token);
      localStorage.setItem('tb_admin_user', JSON.stringify(data));
      setToken(data.token);
      setAdminUser(data);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tb_admin_token');
    localStorage.removeItem('tb_admin_user');
    setToken('');
    setAdminUser(null);
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm('Re-seed database with authentic sample Indian temples data?')) return;
    try {
      setMessage('Seeding database...');
      const res = await seedDatabaseAdmin();
      setMessage(res.message);
      loadAdminTemples();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('Seed error: ' + err.message);
    }
  };

  const handleOpenAddModal = () => {
    setEditingTemple(null);
    setFormData({
      name: '',
      state: '',
      city: '',
      address: '',
      deityName: '',
      deityCategory: 'Shaivism',
      history: '',
      architecturalStyle: 'Nagara / Dravidian',
      constructionEra: 'Ancient',
      heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      dressCode: 'Traditional Indian attire required',
      cameraPolicy: 'Strictly prohibited inside sanctum',
      isFeatured: false,
      isApproved: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (t) => {
    setEditingTemple(t);
    setFormData({
      name: t.name,
      state: t.state,
      city: t.city,
      address: t.address || '',
      deityName: t.deity?.name || '',
      deityCategory: t.deity?.category || 'Shaivism',
      history: t.history || '',
      architecturalStyle: t.architecturalStyle || '',
      constructionEra: t.constructionEra || '',
      heroImage: t.heroImage || '',
      dressCode: t.dressCode || '',
      cameraPolicy: t.cameraPolicy || '',
      isFeatured: t.isFeatured || false,
      isApproved: t.isApproved ?? true,
    });
    setShowModal(true);
  };

  const handleSaveTemple = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        deity: {
          name: formData.deityName,
          category: formData.deityCategory,
        },
        history: formData.history,
        architecturalStyle: formData.architecturalStyle,
        constructionEra: formData.constructionEra,
        heroImage: formData.heroImage,
        dressCode: formData.dressCode,
        cameraPolicy: formData.cameraPolicy,
        isFeatured: formData.isFeatured,
        isApproved: formData.isApproved,
        rituals: [
          { name: 'Mangala Aarti', timing: '05:00 AM', description: 'Morning awakening prayers' },
          { name: 'Evening Sandhya Aarti', timing: '07:00 PM', description: 'Evening light offering' }
        ],
        darshanTimings: [
          { title: 'General Public Slot', timing: '06:00 AM - 08:00 PM', note: 'General queue' }
        ]
      };

      if (editingTemple) {
        await updateTempleAdmin(editingTemple._id, payload);
        setMessage('Temple updated successfully!');
      } else {
        await createTempleAdmin(payload);
        setMessage('Temple created successfully!');
      }

      setShowModal(false);
      loadAdminTemples();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Error saving temple: ' + err.message);
    }
  };

  const handleDeleteTemple = async (id) => {
    if (!window.confirm('Are you sure you want to delete this temple?')) return;
    try {
      await deleteTempleAdmin(id);
      loadAdminTemples();
    } catch (err) {
      alert('Error deleting temple: ' + err.message);
    }
  };

  const handleToggleApprove = async (id, currentStatus) => {
    try {
      await approveTempleAdmin(id, !currentStatus);
      loadAdminTemples();
    } catch (err) {
      alert('Error toggling approval: ' + err.message);
    }
  };

  // IF NOT LOGGED IN AS ADMIN -> RENDER LOGIN FORM
  if (!token) {
    return (
      <div className="pt-28 pb-16 min-h-screen bg-amber-50/40 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-amber-200 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl mx-auto shadow-md">
              <FaShieldAlt />
            </div>
            <h2 className="font-serif-cultural text-2xl font-bold text-slate-900">Admin Management</h2>
            <p className="text-xs text-slate-500">Sign in to manage the Temple Heritage Portal</p>
          </div>

          {authError && (
            <div className="bg-rose-50 text-rose-700 text-xs font-semibold p-3 rounded-xl border border-rose-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Admin Email</label>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <FaUser className="text-amber-600 text-xs" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none text-xs font-medium text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <FaLock className="text-amber-600 text-xs" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none text-xs font-medium text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl shadow-md text-xs uppercase tracking-wider transition-all"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
              <FaShieldAlt />
              <span>Admin Control Center</span>
            </div>
            <h1 className="font-serif-cultural text-2xl sm:text-3xl font-extrabold text-amber-100">
              Temple Heritage Management Portal
            </h1>
            <p className="text-slate-400 text-xs">Logged in as {adminUser?.name || 'Administrator'} ({adminUser?.email})</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSeedDatabase}
              className="inline-flex items-center space-x-2 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              <FaDatabase />
              <span>Seed Sample Data</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow transition-all"
            >
              <FaPlus />
              <span>Add New Temple</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="bg-amber-100 text-amber-900 text-xs font-bold p-4 rounded-2xl border border-amber-300 shadow">
            {message}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400">Total Listed Temples</span>
            <p className="font-serif-cultural text-3xl font-extrabold text-slate-900">{temples.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase text-emerald-600">Approved & Live</span>
            <p className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              {temples.filter((t) => t.isApproved).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase text-amber-600">Featured On Homepage</span>
            <p className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              {temples.filter((t) => t.isFeatured).length}
            </p>
          </div>
        </div>

        {/* Temple Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-serif-cultural font-bold text-slate-900 text-lg">Temple Repository Catalog</h3>
            <span className="text-xs text-slate-500 font-semibold">{temples.length} Entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Temple</th>
                  <th className="px-6 py-3.5">State & City</th>
                  <th className="px-6 py-3.5">Deity</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {temples.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center space-x-3">
                      <img
                        src={t.heroImage || 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=100&q=80'}
                        alt={t.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <span className="block">{t.name}</span>
                        {t.isFeatured && (
                          <span className="text-[10px] text-amber-600 font-bold">★ Featured</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-600">
                      {t.city}, {t.state}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-600">
                      {t.deity?.name || 'N/A'}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleApprove(t._id, t.isApproved)}
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-bold ${
                          t.isApproved
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {t.isApproved ? <FaCheck /> : <FaTimes />}
                        <span>{t.isApproved ? 'Approved' : 'Pending'}</span>
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(t)}
                        className="p-2 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                        title="Edit Temple"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteTemple(t._id)}
                        className="p-2 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete Temple"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD / EDIT TEMPLE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 border border-amber-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-cultural font-bold text-slate-900 text-xl">
                {editingTemple ? 'Edit Temple Record' : 'Create New Temple Entry'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTemple} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Temple Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                    placeholder="e.g. Somnath Temple"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                    placeholder="e.g. Gujarat"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Region *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                    placeholder="e.g. Veraval"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deity Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.deityName}
                    onChange={(e) => setFormData({ ...formData, deityName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                    placeholder="e.g. Lord Shiva (Somnath)"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                  placeholder="e.g. Prabhas Patan, Veraval, Gujarat"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">History & Cultural Significance *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.history}
                  onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                  placeholder="Historical origin, dynasty patronage..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hero Image URL</label>
                  <input
                    type="url"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Architectural Style</label>
                  <input
                    type="text"
                    value={formData.architecturalStyle}
                    onChange={(e) => setFormData({ ...formData, architecturalStyle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center space-x-2 font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isApproved}
                    onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Approve & Publish Live</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow"
                >
                  {editingTemple ? 'Update Temple' : 'Save Temple'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;