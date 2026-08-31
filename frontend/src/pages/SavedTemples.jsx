import { Link } from 'react-router-dom';
import { FaBookmark, FaTrashAlt, FaCompass, FaLock } from 'react-icons/fa';
import TempleCard from '../components/TempleCard';

const SavedTemples = ({ savedTemples = [], onToggleSave, onClearAll, currentUser, onOpenAuthModal }) => {
  const normalizedSavedTemples = (savedTemples || []).reduce((acc, entry) => {
    if (!entry) return acc;
    if (typeof entry === 'object') {
      const id = entry._id ? String(entry._id) : null;
      if (id) {
        acc.push({
          ...entry,
          _id: id,
          name: entry.name || 'Saved Temple',
        });
      }
    } else {
      const id = String(entry);
      acc.push({
        _id: id,
        name: 'Saved Temple',
        city: 'Sacred Location',
        state: 'India',
        history: 'Saved temple destination in your itinerary.',
        slug: id,
      });
    }
    return acc;
  }, []);

  if (!currentUser) {
    return (
      <div className="pt-24 pb-16 bg-amber-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 sm:p-12 text-center border border-amber-200 space-y-5 max-w-md mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mx-auto">
              <FaLock />
            </div>
            <h3 className="font-serif-cultural text-2xl font-bold text-slate-900">
              Sign In to View Saved Temples
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Please sign in to your Travel Bharat account to save, access, and manage your personal temple pilgrimage list.
            </p>
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all"
            >
              <span>Login to Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-amber-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm">
          <div>
            <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
              <FaBookmark />
              <span>Personal Itinerary Planner</span>
            </div>
            <h1 className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              Saved Temples ({normalizedSavedTemples.length})
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Bookmarked temple destinations for your upcoming pilgrimage trip.
            </p>
          </div>

          {normalizedSavedTemples.length > 0 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onClearAll}
                className="inline-flex items-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-200 transition-colors"
              >
                <FaTrashAlt />
                <span>Clear Saved List</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {normalizedSavedTemples.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 space-y-4 max-w-md mx-auto my-8">
            <div className="text-6xl text-amber-400">🔖</div>
            <h3 className="font-serif-cultural text-xl font-bold text-slate-800">
              Your Itinerary List is Empty
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Explore temples across India and click the bookmark icon on any temple card to save it to your personal visit planner.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow transition-colors"
            >
              <FaCompass />
              <span>Explore Temples Now</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {normalizedSavedTemples.map((temple) => (
              <TempleCard
                key={temple._id}
                temple={temple}
                isSaved={true}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTemples;
