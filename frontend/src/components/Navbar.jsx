import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBookmark, FaCompass, FaHome, FaShieldAlt, FaBars, FaTimes, FaMapMarkedAlt } from 'react-icons/fa';

const Navbar = ({ savedCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Explore Temples', path: '/explore', icon: <FaCompass /> },
    { name: 'Sacred Circuits', path: '/circuits', icon: <FaMapMarkedAlt /> },
    { name: 'Saved Temples', path: '/saved', icon: <FaBookmark />, badge: savedCount },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-amber-950/90 text-amber-50 backdrop-blur-md shadow-xl border-b border-amber-500/20 py-3' : 'bg-gradient-to-b from-amber-950/80 to-transparent text-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform duration-300">
            🛕
          </div>
          <div>
            <span className="font-serif-cultural text-xl font-bold tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors">
              TRAVEL BHARAT
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-amber-200/80 font-medium -mt-1">
              Temple Heritage & Pilgrimage Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 shadow-inner'
                    : 'text-amber-100/90 hover:text-amber-300 hover:bg-amber-900/40'
                }`}
              >
                <span className="text-amber-400">{link.icon}</span>
                <span>{link.name}</span>
                {link.badge > 0 && (
                  <span className="ml-1 bg-amber-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Admin Portal Button */}
          <Link
            to="/admin"
            className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-orange-950/40 hover:shadow-lg transition-all duration-200"
          >
            <FaShieldAlt className="text-amber-200" />
            <span>Admin Portal</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-amber-200 hover:text-white hover:bg-amber-900/50 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-950/95 backdrop-blur-xl border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-2 mt-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50'
                  : 'text-amber-100 hover:bg-amber-900/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-amber-400">{link.icon}</span>
                <span>{link.name}</span>
              </div>
              {link.badge > 0 && (
                <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-lg text-base font-semibold shadow-md mt-4"
          >
            <FaShieldAlt className="text-amber-200" />
            <span>Admin CMS Portal</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
