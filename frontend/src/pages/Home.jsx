import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaCompass, FaOm, FaLandmark, FaRoute, FaCheckCircle, FaUsers, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import TempleCard from '../components/TempleCard';
import { fetchFeaturedTemples, fetchStats, fetchCircuits } from '../services/api';

const Home = ({ savedTemples = [], onToggleSave }) => {
  const [featuredTemples, setFeaturedTemples] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [stats, setStats] = useState({
    totalTemples: 8,
    statesCount: 6,
    circuitsCount: 3,
    activeUsersEstimate: 24500,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const statesList = [
    'Uttar Pradesh',
    'Uttarakhand',
    'Tamil Nadu',
    'Andhra Pradesh',
    'Gujarat',
    'Odisha',
    'Punjab',
    'Jammu & Kashmir',
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const [featuredData, statsData, circuitsData] = await Promise.all([
          fetchFeaturedTemples(),
          fetchStats(),
          fetchCircuits(),
        ]);
        setFeaturedTemples(featuredData || []);
        setStats(statsData || {});
        setCircuits(circuitsData || []);
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() || selectedState) {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (selectedState) params.set('state', selectedState);
      navigate(`/explore?${params.toString()}`);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950 text-white">
        {/* Background Image overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2000&q=80"
            alt="Kashi Vishwanath Corridor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-slate-950/80 to-slate-950/90"></div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          {/* Emblem Pill */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <FaOm className="text-amber-400 text-sm" />
            <span>Centralized Temple Heritage & Pilgrimage Portal</span>
          </div>

          <h1 className="font-serif-cultural text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Discover the Sacred Sanctuaries of <span className="text-gradient-gold">Bharat</span>
          </h1>

          <p className="max-w-3xl mx-auto text-amber-100/80 text-base sm:text-lg font-normal leading-relaxed">
            Explore authentic temple histories, darshan schedules, live festival calendars, dress codes, and location-based pilgrimage routes across every state in India.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-amber-300/40 flex flex-col sm:flex-row items-center gap-2 text-slate-900"
          >
            <div className="flex-1 flex items-center space-x-3 px-3 py-2 w-full">
              <FaSearch className="text-amber-600 text-lg flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by temple name, deity, or ritual (e.g. Kashi, Shiva)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium"
              />
            </div>

            <div className="w-full sm:w-auto flex items-center space-x-2">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-amber-50/80 border border-amber-200 text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="">All States</option>
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Search</span>
                <FaArrowRight />
              </button>
            </div>
          </form>

          {/* Quick State Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-amber-300/70 font-semibold mr-1">Popular States:</span>
            {statesList.slice(0, 5).map((st) => (
              <button
                key={st}
                onClick={() => navigate(`/explore?state=${st}`)}
                className="bg-amber-900/40 hover:bg-amber-600/30 text-amber-200 hover:text-white border border-amber-500/20 px-3 py-1 rounded-full transition-all"
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* KPI STATS TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-amber-200/80 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-amber-100">
          <div className="space-y-1">
            <div className="flex justify-center text-amber-600 text-2xl mb-1">
              <FaLandmark />
            </div>
            <div className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              {stats.totalTemples || 10}+
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Temples Documented
            </div>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <div className="flex justify-center text-amber-600 text-2xl mb-1">
              <FaMapMarkerAlt />
            </div>
            <div className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              {stats.statesCount || 8}+
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Indian States Covered
            </div>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <div className="flex justify-center text-amber-600 text-2xl mb-1">
              <FaRoute />
            </div>
            <div className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              {stats.circuitsCount || 4}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sacred Pilgrimage Circuits
            </div>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <div className="flex justify-center text-amber-600 text-2xl mb-1">
              <FaUsers />
            </div>
            <div className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              24,500+
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Monthly Active Pilgrims
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TEMPLES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-200 pb-4">
          <div>
            <span className="text-amber-700 font-bold text-xs uppercase tracking-widest block">
              Handpicked Destinations
            </span>
            <h2 className="font-serif-cultural text-3xl font-extrabold text-slate-900">
              Featured Temples of Bharat
            </h2>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-900 font-bold text-sm"
          >
            <span>Browse All Temples</span>
            <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-amber-100/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemples.map((temple) => (
              <TempleCard
                key={temple._id}
                temple={temple}
                isSaved={savedTemples.some((t) => t._id === temple._id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </section>

      {/* SACRED PILGRIMAGE CIRCUITS */}
      <section className="bg-gradient-to-br from-amber-950 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">
              Sacred Trails
            </span>
            <h2 className="font-serif-cultural text-3xl sm:text-4xl font-extrabold text-white">
              Popular Pilgrimage Circuits
            </h2>
            <p className="text-amber-200/70 text-sm">
              Plan holistic multi-temple spiritual journeys along ancient documented pilgrimage routes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {circuits.map((circuit) => (
              <div
                key={circuit._id}
                className="bg-amber-900/30 border border-amber-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="h-44 rounded-xl overflow-hidden relative">
                    <img
                      src={circuit.image}
                      alt={circuit.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <span className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                      {circuit.region}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-cultural text-xl font-bold text-amber-300 group-hover:text-amber-200">
                      {circuit.name}
                    </h3>
                    <p className="text-amber-100/70 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {circuit.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-amber-800/40 flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-medium">
                    Duration: {circuit.recommendedDays}
                  </span>
                  <Link
                    to="/circuits"
                    className="inline-flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs"
                  >
                    <span>Explore Route</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURAL HERITAGE & VISITOR ETIQUETTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-amber-700 font-bold text-xs uppercase tracking-widest block">
                Respect & Preservation
              </span>
              <h2 className="font-serif-cultural text-3xl font-extrabold text-slate-900 mt-1">
                Pilgrimage Conduct & Visitor Guidelines
              </h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              When visiting sacred temples across India, adhering to traditional rules ensures a peaceful and culturally respectful experience for all devotees.
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaCheckCircle className="text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Modest Attire</h4>
                  <p className="text-xs text-slate-600">Wear traditional Indian clothing covering shoulders and knees. Avoid shorts or leather accessories near sanctum.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCheckCircle className="text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Electronic & Photography Policy</h4>
                  <p className="text-xs text-slate-600">Mobile phones must be safely deposited at official shoe/locker stands before entering main sanctum halls.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCheckCircle className="text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Timing & Queue Registration</h4>
                  <p className="text-xs text-slate-600">Check morning Mangala Aarti timings and register for VIP/Fast-track slots on respective temple shrine portals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-md space-y-4">
            <div className="flex items-center space-x-3 border-b border-amber-100 pb-3">
              <FaShieldAlt className="text-amber-600 text-2xl" />
              <div>
                <h3 className="font-serif-cultural font-bold text-slate-900">Verified Temple Information</h3>
                <p className="text-xs text-slate-500">All data reviewed by temple trusts & heritage historians</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Travel Bharat maintains a centralized open dataset aimed at preserving cultural records, aiding pilgrims with authentic information, and promoting digital tourism across India.
            </p>
            <div className="pt-2">
              <Link
                to="/explore"
                className="w-full bg-slate-900 hover:bg-amber-900 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
              >
                <FaCompass />
                <span>Start Discovery Journey</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
