import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaClock,
  FaOm,
  FaLandmark,
  FaCalendarAlt,
  FaUserCheck,
  FaBus,
  FaHotel,
  FaUtensils,
  FaParking,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaPrint,
  FaArrowLeft,
  FaCheckCircle,
  FaTimes,
} from 'react-icons/fa';
import { fetchTempleBySlugOrId } from '../services/api';
import { isTempleSaved } from '../utils/templeUtils';

const TempleDetail = ({ savedTemples = [], onToggleSave }) => {
  const { slug } = useParams();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareToast, setShowShareToast] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    const loadTemple = async () => {
      setLoading(true);
      try {
        const data = await fetchTempleBySlugOrId(slug);
        setTemple(data);
      } catch (err) {
        console.error('Error loading temple detail:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTemple();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 space-y-6">
        <div className="h-96 bg-amber-100/50 rounded-3xl animate-pulse"></div>
        <div className="h-64 bg-white rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="pt-32 pb-16 max-w-md mx-auto text-center space-y-4 px-4">
        <div className="text-6xl">🛕</div>
        <h2 className="font-serif-cultural text-2xl font-bold text-slate-800">Temple Not Found</h2>
        <p className="text-slate-500 text-xs">The requested temple record could not be loaded.</p>
        <Link
          to="/explore"
          className="inline-block bg-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
        >
          Return to Explore
        </Link>
      </div>
    );
  }

  const isSaved = isTempleSaved(savedTemples, temple);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview & History', icon: <FaLandmark /> },
    { id: 'deity', label: 'Deity & Significance', icon: <FaOm /> },
    { id: 'rituals', label: 'Pooja Timetable', icon: <FaClock /> },
    { id: 'guidelines', label: 'Darshan & Guidelines', icon: <FaUserCheck /> },
    { id: 'festivals', label: 'Festivals', icon: <FaCalendarAlt /> },
    { id: 'facilities', label: 'Nearby Facilities', icon: <FaHotel /> },
  ];

  return (
    <div className="pt-24 pb-16 bg-amber-50/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between text-xs">
          <Link
            to="/explore"
            className="inline-flex items-center space-x-2 font-bold text-amber-700 hover:text-amber-900"
          >
            <FaArrowLeft />
            <span>Back to All Temples</span>
          </Link>
          <span className="text-slate-400 font-medium">{temple.state} / {temple.city}</span>
        </div>

        {/* HERO BANNER CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl">
          <div className="h-[380px] sm:h-[450px] relative">
            <img
              src={temple.heroImage || temple.images?.[0]}
              alt={temple.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Top Action Buttons */}
            <div className="absolute top-4 right-4 flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md hover:bg-slate-900 text-amber-300 flex items-center justify-center border border-amber-500/30 transition-transform active:scale-95"
                title="Share Temple Link"
              >
                <FaShareAlt />
              </button>
              <button
                onClick={() => setShowPrintModal(true)}
                className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md hover:bg-slate-900 text-amber-300 flex items-center justify-center border border-amber-500/30 transition-transform active:scale-95"
                title="Print Visit Guide"
              >
                <FaPrint />
              </button>
              <button
                onClick={() => onToggleSave(temple)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg flex items-center space-x-2 transition-transform active:scale-95"
              >
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                <span>{isSaved ? 'Saved in Itinerary' : 'Save Temple'}</span>
              </button>
            </div>

            {/* Banner Overlay Content */}
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {temple.deity?.category || 'Sacred Heritage'}
                </span>
                {temple.circuitTags?.map((tag, idx) => (
                  <span key={idx} className="bg-slate-900/80 backdrop-blur-md border border-amber-500/30 text-amber-200 text-xs px-3 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-serif-cultural text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {temple.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-amber-200/90 font-medium">
                <div className="flex items-center space-x-1.5">
                  <FaMapMarkerAlt className="text-amber-400" />
                  <span>{temple.address}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <FaLandmark className="text-amber-400" />
                  <span>{temple.architecturalStyle} ({temple.constructionEra})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Notification Toast */}
        {showShareToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-300 border border-amber-500/40 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 animate-bounce">
            <FaCheckCircle className="text-amber-400" />
            <span>Link copied to clipboard! Share with fellow pilgrims.</span>
          </div>
        )}

        {/* TABBED NAVIGATION & DETAILS CONTENT */}
        <div className="bg-white rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
          {/* Tab Header */}
          <div className="flex overflow-x-auto border-b border-amber-100 bg-amber-50/50 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-amber-600 text-amber-800 bg-white shadow-sm'
                    : 'border-transparent text-slate-500 hover:text-amber-700 hover:bg-amber-100/40'
                }`}
              >
                <span className="text-amber-600">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* 1. OVERVIEW & HISTORY TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-serif-cultural text-2xl font-bold text-slate-900 mb-3">
                    Historical Background & Heritage
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {temple.history}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200/80 space-y-1">
                    <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Architectural Style</span>
                    <p className="text-slate-900 font-semibold text-sm">{temple.architecturalStyle}</p>
                  </div>
                  <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200/80 space-y-1">
                    <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Era of Construction</span>
                    <p className="text-slate-900 font-semibold text-sm">{temple.constructionEra}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DEITY & SIGNIFICANCE TAB */}
            {activeTab === 'deity' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-br from-amber-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-4">
                  <div className="flex items-center space-x-3 text-amber-400">
                    <FaOm className="text-3xl" />
                    <span className="text-xs uppercase font-bold tracking-widest text-amber-300">Principal Sanctum Presiding Deity</span>
                  </div>
                  <h3 className="font-serif-cultural text-3xl font-extrabold text-white">
                    {temple.deity?.name}
                  </h3>
                  <p className="text-amber-100/90 text-sm leading-relaxed">
                    {temple.deity?.significance}
                  </p>
                </div>
              </div>
            )}

            {/* 3. POOJA TIMETABLE & RITUALS TAB */}
            {activeTab === 'rituals' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-serif-cultural text-2xl font-bold text-slate-900">
                    Daily Pooja & Aarti Schedule
                  </h3>
                  <span className="text-xs text-amber-700 font-semibold bg-amber-100 px-3 py-1 rounded-full">
                    Official Timetable
                  </span>
                </div>

                <div className="divide-y divide-amber-100 border border-amber-200 rounded-2xl overflow-hidden">
                  {temple.rituals?.map((ritual, idx) => (
                    <div key={idx} className="p-4 sm:p-5 bg-white hover:bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{ritual.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{ritual.description}</p>
                      </div>
                      <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl self-start sm:self-center">
                        <FaClock className="text-amber-600" />
                        <span>{ritual.timing}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. DARSHAN & GUIDELINES TAB */}
            {activeTab === 'guidelines' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Darshan Slots */}
                <div>
                  <h3 className="font-serif-cultural text-xl font-bold text-slate-900 mb-3">
                    Darshan Timings & Tickets
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {temple.darshanTimings?.map((slot, idx) => (
                      <div key={idx} className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-1">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{slot.title}</span>
                        <p className="text-slate-900 font-bold text-sm">{slot.timing}</p>
                        <p className="text-xs text-slate-500 mt-1">{slot.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules & Guidelines Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dress Code Rules</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{temple.dressCode}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Entry Fee & Tickets</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{temple.entryFee}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Camera & Mobile Policy</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{temple.cameraPolicy}</p>
                  </div>
                </div>

                {/* Conduct Rules List */}
                {temple.guidelines && temple.guidelines.length > 0 && (
                  <div className="bg-amber-900/5 p-6 rounded-2xl border border-amber-200 space-y-3">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Important Visitor Guidelines</h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {temple.guidelines.map((g, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <FaCheckCircle className="text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 5. FESTIVALS TAB */}
            {activeTab === 'festivals' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif-cultural text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Annual Festivals & Celebrations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {temple.festivals?.map((f, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif-cultural text-lg font-bold text-amber-900">{f.name}</h4>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                          {f.month}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. NEARBY FACILITIES TAB */}
            {activeTab === 'facilities' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif-cultural text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Nearby Facilities & Pilgrimage Travel Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-700 font-bold text-sm">
                      <FaHotel />
                      <span>Accommodation & Dharamshalas</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{temple.nearbyFacilities?.accommodation}</p>
                  </div>

                  <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-700 font-bold text-sm">
                      <FaBus />
                      <span>Transport & Connectivity</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{temple.nearbyFacilities?.transport}</p>
                  </div>

                  <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-700 font-bold text-sm">
                      <FaParking />
                      <span>Vehicle Parking Facilities</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{temple.nearbyFacilities?.parking}</p>
                  </div>

                  <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-700 font-bold text-sm">
                      <FaUtensils />
                      <span>Prasadam & Food Stalls</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{temple.nearbyFacilities?.food}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRINTABLE VISIT GUIDE MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-amber-300">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm">🛕</div>
                <h3 className="font-serif-cultural font-bold text-slate-900 text-lg">Pilgrim Visit Guide</h3>
              </div>
              <button onClick={() => setShowPrintModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-amber-50 p-4 rounded-xl space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">{temple.name}</h4>
                <p className="text-slate-600">{temple.address}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900">Recommended Dress Code:</span>
                <p>{temple.dressCode}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900">Sanctum Camera Policy:</span>
                <p>{temple.cameraPolicy}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900">Key Aarti Timing:</span>
                <p>{temple.rituals?.[0]?.name} ({temple.rituals?.[0]?.timing})</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setShowPrintModal(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleDetail;
