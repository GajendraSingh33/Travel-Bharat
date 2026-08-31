import { useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { createTempleAdmin } from '../services/api';

const AddTempleModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    city: '',
    address: '',
    deityName: '',
    history: '',
    timing: '06:00 AM - 08:00 PM',
    heroImage: '',
    architecturalStyle: 'Nagara / Dravidian',
    isFeatured: false,
    isApproved: true,
  });

  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be under 5MB.');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, heroImage: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name.trim(),
        state: formData.state.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        deity: {
          name: formData.deityName.trim(),
          category: 'Shaivism',
        },
        history: formData.history.trim(),
        architecturalStyle: formData.architecturalStyle.trim() || 'Nagara / Dravidian',
        constructionEra: 'Ancient',
        heroImage: formData.heroImage || 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
        dressCode: 'Traditional Indian attire required',
        cameraPolicy: 'Strictly prohibited inside sanctum',
        isFeatured: formData.isFeatured,
        isApproved: formData.isApproved ?? true,
        rituals: [
          { name: 'Mangala Aarti', timing: '05:00 AM', description: 'Morning awakening prayers' },
          { name: 'Evening Sandhya Aarti', timing: '07:00 PM', description: 'Evening light offering' }
        ],
        darshanTimings: [
          { title: 'General Darshan Slot', timing: formData.timing?.trim() || '06:00 AM - 08:00 PM', note: 'General Queue' }
        ]
      };

      const created = await createTempleAdmin(payload);
      setLoading(false);
      setFormData({
        name: '',
        state: '',
        city: '',
        address: '',
        deityName: '',
        history: '',
        timing: '06:00 AM - 08:00 PM',
        heroImage: '',
        architecturalStyle: 'Nagara / Dravidian',
        isFeatured: false,
        isApproved: true,
      });
      setImagePreview('');
      if (onSuccess) onSuccess(created);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Failed to save temple record.');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 border border-amber-200 animate-fadeIn">
        {/* Modal Title & Close Button */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-serif-cultural font-bold text-slate-900 text-xl tracking-wide uppercase">
            Create New Temple Entry
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Temple Name & State */}
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

          {/* City / Region & Deity Name */}
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

          {/* Address */}
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

          {/* History */}
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

          {/* Image File Upload, Temple Timings & Architectural Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Add Image *</label>
              <div className="flex items-center space-x-3">
                <label className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-amber-400 text-slate-700 font-semibold px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-xs">
                  <FaUpload className="text-amber-600" />
                  <span className="truncate">{imagePreview ? 'Change Image File' : 'Upload Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-300 bg-slate-100 flex-shrink-0">
                    <img src={imagePreview} alt="Uploaded Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Temple Timings *</label>
              <input
                type="text"
                required
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
                placeholder="e.g. 06:00 AM - 08:00 PM"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Architectural Style</label>
            <input
              type="text"
              value={formData.architecturalStyle}
              onChange={(e) => setFormData({ ...formData, architecturalStyle: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Nagara / Dravidian"
            />
          </div>

          {/* Checkboxes */}
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

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Temple'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTempleModal;
