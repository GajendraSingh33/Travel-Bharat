import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaOm, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-amber-950 text-amber-100/80 border-t border-amber-800/40 relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl text-white shadow-md">
                🛕
              </div>
              <span className="font-serif-cultural text-2xl font-bold text-amber-400 tracking-wider">
                TRAVEL BHARAT
              </span>
            </div>
            <p className="text-sm text-amber-200/70 leading-relaxed">
              India's premier digital repository dedicated to preserving sacred temple heritage, providing authentic darshan guidelines, rituals, and location-based pilgrimage discovery across all states.
            </p>
            <div className="flex items-center space-x-2 text-xs text-amber-400/90 font-medium">
              <FaShieldAlt />
              <span>Verified Authentic Heritage Data</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif-cultural text-lg font-bold text-amber-300 tracking-wide border-b border-amber-800/60 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span>•</span>
                  <span>Home Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span>•</span>
                  <span>State & City Temple Directory</span>
                </Link>
              </li>
              <li>
                <Link to="/circuits" className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span>•</span>
                  <span>Sacred Pilgrimage Circuits</span>
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <span>•</span>
                  <span>Saved Itinerary Planner</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sacred Regions */}
          <div className="space-y-3">
            <h3 className="font-serif-cultural text-lg font-bold text-amber-300 tracking-wide border-b border-amber-800/60 pb-2">
              Major Pilgrim Regions
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link to="/explore?state=Uttar Pradesh" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xs" />
                  <span>Varanasi / UP</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?state=Uttarakhand" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xs" />
                  <span>Uttarakhand</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?state=Tamil Nadu" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xs" />
                  <span>Tamil Nadu</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?state=Andhra Pradesh" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xs" />
                  <span>Tirupati / AP</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?state=Gujarat" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xs" />
                  <span>Somnath / Guj</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?state=Odisha" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xs" />
                  <span>Puri / Odisha</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Support */}
          <div className="space-y-3">
            <h3 className="font-serif-cultural text-lg font-bold text-amber-300 tracking-wide border-b border-amber-800/60 pb-2">
              Admin & Governance
            </h3>
            <p className="text-xs text-amber-200/70 leading-relaxed">
              Temple authorities and state tourism boards can update or submit new verified heritage data via the Admin Management System.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center space-x-2 bg-amber-900/60 hover:bg-amber-800 border border-amber-600/50 text-amber-300 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
            >
              <FaShieldAlt />
              <span>Admin Management Portal</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-amber-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/60 gap-4">
          <div className="flex items-center space-x-2">
            <FaOm className="text-amber-500 text-base" />
            <span>© 2026 Travel Bharat Portal. Preserving India’s Sacred Sanatana Heritage.</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with passion for cultural tourism</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
