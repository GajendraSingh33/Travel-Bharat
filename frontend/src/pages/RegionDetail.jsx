import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCompass, FaArrowLeft } from 'react-icons/fa';
import TempleCard from '../components/TempleCard';
import { fetchTemples } from '../services/api';
import { isTempleSaved } from '../utils/templeUtils';

const REGION_DESCRIPTIONS = {
  'North India': {
    title: 'Sacred Temples of North India',
    subtitle: 'Himalayan Shrines, Holy River Ghats & Eternal Heritage',
    description: 'Explore the venerable pilgrimage centers across Uttarakhand, Uttar Pradesh, Punjab, and the Himalayan region. Home to Kedarnath, Kashi Vishwanath, Badrinath, and Harmandir Sahib.',
    states: ['Uttarakhand', 'Uttar Pradesh', 'Punjab', 'Himachal Pradesh', 'Jammu & Kashmir', 'Delhi'],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
  },
  'South India': {
    title: 'Sacred Temples of South India',
    subtitle: 'Grand Dravidian Gopurams, Ancient Carvings & Divine Sanctums',
    description: 'Discover monumental architecture, soaring gopurams, and centuries-old rituals across Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, and Kerala. Featuring Meenakshi Amman, Tirupati Balaji, and Ramanathaswamy.',
    states: ['Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Kerala'],
    image: 'https://images.unsplash.com/photo-1600100397608-f09074cb76d6?auto=format&fit=crop&w=1600&q=80',
  },
  'West India': {
    title: 'Sacred Temples of West India',
    subtitle: 'Coastal Jyotirlingas, Solanki Stone Carvings & Heritage Trails',
    description: 'Immerse in ancient coastal shrines, Maratha Peshwa architecture, and Solanki stone temples across Gujarat, Maharashtra, and Rajasthan. Home to Somnath, Dwarkadhish, Trimbakeshwar, Bhimashankar, and Grishneshwar.',
    states: ['Gujarat', 'Maharashtra', 'Rajasthan', 'Goa'],
    image: 'https://images.unsplash.com/photo-1609946782787-83b63ecf6617?auto=format&fit=crop&w=1600&q=80',
  },
  'East India': {
    title: 'Sacred Temples of East India',
    subtitle: 'Kalinga Architecture, Ratha Yatras & Celestial Sun Shrines',
    description: 'Witness magnificent Kalinga stone temples, iconic chariot festivals, and sacred rivers across Odisha, Jharkhand, and West Bengal. Featuring Puri Jagannath, Konark Sun Temple, and Baidyanath Dham.',
    states: ['Odisha', 'Jharkhand', 'West Bengal', 'Bihar', 'Assam'],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
  },
  'Central India': {
    title: 'Sacred Temples of Central India',
    subtitle: 'Dakshinmukhi Jyotirlingas, Narmada River Shrines & Ancient Sanctuaries',
    description: 'Discover cosmic energy centers, south-facing Jyotirlingas, and holy island shrines across Madhya Pradesh and Chhattisgarh. Home to Mahakaleshwar and Omkareshwar.',
    states: ['Madhya Pradesh', 'Chhattisgarh'],
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
  },
};

const RegionDetail = ({ savedTemples = [], onToggleSave }) => {
  const { regionName } = useParams();
  const decodedRegion = decodeURIComponent(regionName || 'North India');

  const info = REGION_DESCRIPTIONS[decodedRegion] || {
    title: `Sacred Temples of ${decodedRegion}`,
    subtitle: 'Pilgrimage Heritage & Divine Sanctuaries',
    description: `Discover revered temple heritage and holy shrines across ${decodedRegion}.`,
    states: [],
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
  };

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRegionTemples = async () => {
      setLoading(true);
      try {
        const data = await fetchTemples({ region: decodedRegion });
        setTemples(data || []);
      } catch (err) {
        console.error('Error fetching region temples:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRegionTemples();
  }, [decodedRegion]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center space-x-2 text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-100/60 hover:bg-amber-100 px-3.5 py-2 rounded-xl border border-amber-300 transition-colors"
          >
            <FaArrowLeft />
            <span>Back to All Temples</span>
          </Link>
        </div>

        {/* Hero Banner for Region */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl min-h-[260px] flex items-center">
          <img
            src={info.image}
            alt={info.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-amber-950/60"></div>

          <div className="relative z-10 p-8 sm:p-12 space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
              <FaCompass />
              <span>Pilgrim Region</span>
            </div>

            <h1 className="font-serif-cultural text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {info.title}
            </h1>

            <p className="text-amber-200/90 text-sm leading-relaxed">
              {info.description}
            </p>

            {info.states && info.states.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs">
                <span className="text-amber-300 font-bold mr-1">States Included:</span>
                {info.states.map((st) => (
                  <span
                    key={st}
                    className="bg-amber-900/60 text-amber-200 border border-amber-500/30 px-2.5 py-0.5 rounded-full"
                  >
                    {st}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div>
            <span className="text-amber-800 font-bold text-xs uppercase tracking-widest block">
              Regional Destinations
            </span>
            <h2 className="font-serif-cultural text-2xl font-bold text-slate-900">
              Popular Temples in {decodedRegion}
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-white px-3 py-1.5 rounded-xl border border-amber-200">
            <span className="text-amber-700 font-black">{temples.length}</span> Temples Found
          </span>
        </div>

        {/* Temples Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-white rounded-2xl animate-pulse border border-amber-100"></div>
            ))}
          </div>
        ) : temples.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 space-y-4 max-w-md mx-auto my-8">
            <div className="text-5xl">🛕</div>
            <h3 className="font-serif-cultural text-xl font-bold text-slate-800">
              No Regional Temples Found
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              We currently don't have temples listed for this region in our database. Check back soon as new entries are published!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.map((temple) => (
              <TempleCard
                key={temple._id}
                temple={temple}
                isSaved={isTempleSaved(savedTemples, temple)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionDetail;
