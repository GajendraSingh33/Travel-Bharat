import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBookmark, FaRegBookmark, FaClock, FaArrowRight, FaOm } from 'react-icons/fa';

const TempleCard = ({ temple, isSaved = false, onToggleSave }) => {
  const primaryTiming = temple.darshanTimings?.[0]?.timing || '06:00 AM - 08:00 PM';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image Banner */}
      <div className="relative h-52 overflow-hidden bg-slate-900">
        <img
          src={temple.heroImage || temple.images?.[0] || 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'}
          alt={temple.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {temple.isFeatured && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                ★ Featured
              </span>
            )}
            <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-medium px-2.5 py-1 rounded-full border border-amber-500/30">
              {temple.deity?.category || 'Sacred Shrine'}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleSave(temple);
            }}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-amber-600 flex items-center justify-center shadow-lg transition-transform active:scale-95"
            title={isSaved ? 'Remove from Saved' : 'Save Temple'}
          >
            {isSaved ? <FaBookmark className="text-amber-600" /> : <FaRegBookmark className="text-slate-600 hover:text-amber-600" />}
          </button>
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-amber-200 text-xs font-medium">
          <FaMapMarkerAlt className="text-amber-400" />
          <span>{temple.city}, {temple.state}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <FaOm className="text-amber-600" />
            <span>{temple.deity?.name || 'Deity Heritage'}</span>
          </div>
          <h3 className="font-serif-cultural text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
            {temple.name}
          </h3>
          <p className="text-slate-600 text-xs line-clamp-2 mt-1.5 leading-relaxed">
            {temple.history}
          </p>
        </div>

        {/* Circuit Tags */}
        {temple.circuitTags && temple.circuitTags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {temple.circuitTags.map((tag, idx) => (
              <span key={idx} className="bg-amber-50 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-200">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <FaClock className="text-amber-600" />
            <span className="truncate max-w-[130px]">{primaryTiming}</span>
          </div>

          <Link
            to={`/temple/${temple.slug || temple._id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-900 group-hover:translate-x-1 transition-all"
          >
            <span>View Details</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TempleCard;
