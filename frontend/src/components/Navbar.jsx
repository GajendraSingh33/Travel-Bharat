import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBookmark,
  FaCompass,
  FaHome,
  FaShieldAlt,
  FaBars,
  FaTimes,
  FaMapMarkedAlt,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaUserPlus,
  FaPlus,
} from 'react-icons/fa';

const Navbar = ({ savedCount = 0, currentUser = null, onOpenAuthModal, onLogout, onOpenAddTempleModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const profileRef = useRef(null);
  const timeoutRef = useRef(null);

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

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 250);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Explore Temples', path: '/explore', icon: <FaCompass /> },
    { name: 'Sacred Circuits', path: '/circuits', icon: <FaMapMarkedAlt /> },
    { name: 'Saved Temples', path: '/saved', icon: <FaBookmark />, badge: savedCount },
  ];

  const isAdmin = currentUser?.role === 'admin';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-amber-950/90 text-amber-50 backdrop-blur-md shadow-xl border-b border-amber-500/20 py-3'
          : 'bg-gradient-to-b from-amber-950/80 to-transparent text-white py-4'
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

          {/* Profile Logo Avatar & Interactive Hover Dropdown */}
          <div
            ref={profileRef}
            className="relative ml-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center space-x-1.5 p-1.5 rounded-full bg-amber-900/50 hover:bg-amber-800/70 border border-amber-500/30 transition-all focus:outline-none group shadow-md"
              aria-label="User Profile & Authentication Options"
              title={currentUser ? (currentUser.name || 'Account Profile') : 'Account Profile'}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-orange-600 flex items-center justify-center text-white text-xs font-extrabold shadow-md group-hover:scale-105 transition-transform">
                {currentUser ? (
                  currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <FaUser />
                ) : (
                  <FaUser />
                )}
              </div>
              <FaChevronDown
                className={`text-[10px] text-amber-300 transition-transform duration-200 pr-1 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-amber-950/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl p-4 text-white z-50 animate-fadeIn space-y-3 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                {currentUser ? (
                  // LOGGED IN USER VIEW
                  <>
                    <div className="flex items-center space-x-3 pb-3 border-b border-amber-800/60">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-amber-200 truncate">{currentUser.name || 'User'}</h4>
                        <p className="text-[11px] text-amber-300/70 truncate">{currentUser.email}</p>
                        {isAdmin ? (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:brightness-110 transition-all cursor-pointer shadow-sm"
                            title="Direct to Admin Portal"
                          >
                            ★ Admin Account
                          </Link>
                        ) : (
                          <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            Pilgrim Account
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      {isAdmin ? (
                        <>
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-amber-200 hover:text-white hover:bg-amber-900/60 transition-colors"
                          >
                            <FaShieldAlt className="text-amber-400" />
                            <span className="font-semibold">Admin Dashboard</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileOpen(false);
                              if (onOpenAddTempleModal) {
                                onOpenAddTempleModal();
                              }
                            }}
                            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-amber-200 hover:text-white hover:bg-amber-900/60 transition-colors text-left font-semibold"
                          >
                            <FaPlus className="text-amber-400" />
                            <span>Add New Temple</span>
                          </button>
                        </>
                      ) : (
                        <Link
                          to="/saved"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-amber-200 hover:text-white hover:bg-amber-900/60 transition-colors"
                        >
                          <div className="flex items-center space-x-2.5">
                            <FaBookmark className="text-amber-400" />
                            <span className="font-semibold">My Saved Temples</span>
                          </div>
                          {savedCount > 0 && (
                            <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                              {savedCount}
                            </span>
                          )}
                        </Link>
                      )}
                    </div>

                    <div className="pt-2 border-t border-amber-800/60">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-amber-900/40 hover:bg-rose-900/60 text-rose-200 hover:text-white text-xs font-bold py-2 rounded-xl border border-rose-500/30 transition-colors"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  // LOGGED OUT VIEW: 2 DISTINCT USER AUTH OPTIONS
                  <>
                    <div className="space-y-2 text-xs">
                      {/* Option 1: Pilgrim / Normal User */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          onOpenAuthModal('login', '', 'pilgrim');
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-amber-900/40 hover:bg-amber-900/80 border border-amber-500/20 hover:border-amber-500/60 transition-all group/item"
                      >
                        <div className="flex items-center space-x-2.5 text-amber-200 font-bold group-hover/item:text-white">
                          <div className="w-7 h-7 rounded-lg bg-amber-600/30 flex items-center justify-center text-amber-400">
                            <FaUser size={12} />
                          </div>
                          <div>
                            <div className="text-xs font-bold">Pilgrim</div>
                            {/* <div className="text-[10px] font-normal text-amber-300/70">Sign in to saved temples</div> */}
                          </div>
                        </div>
                      </button>

                      {/* Option 2: Admin User */}
                      <Link
                        to="/admin"
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full text-left p-2.5 rounded-xl bg-amber-900/40 hover:bg-amber-900/80 border border-amber-500/20 hover:border-amber-500/60 transition-all group/item block"
                      >
                        <div className="flex items-center space-x-2.5 text-amber-200 font-bold group-hover/item:text-white">
                          <div className="w-7 h-7 rounded-lg bg-orange-600/30 flex items-center justify-center text-orange-400">
                            <FaShieldAlt size={12} />
                          </div>
                          <div>
                            <div className="text-xs font-bold">Admin</div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-amber-800/60 flex items-center justify-between">
                      <span className="text-[11px] text-amber-300/70">New pilgrim user?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          onOpenAuthModal('register', '✨ Create a new pilgrim account to save temples.', 'pilgrim');
                        }}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                      >
                        <FaUserPlus className="text-[6px]" />
                        <span>Create Pilgrim Account</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
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

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-lg text-base font-semibold shadow-md mt-2"
            >
              <FaShieldAlt className="text-amber-200" />
              <span>Admin Portal</span>
            </Link>
          )}

          <div className="pt-3 border-t border-amber-900/60 mt-2 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="px-4 py-2 text-xs text-amber-300 font-semibold flex items-center justify-between bg-amber-900/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FaUser />
                    <span>{currentUser.name || currentUser.email}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    {isAdmin ? 'Admin' : 'Pilgrim'}
                  </span>
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      if (onOpenAddTempleModal) onOpenAddTempleModal();
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-amber-900/60 hover:bg-amber-900 text-amber-100 px-4 py-2.5 rounded-lg text-sm font-semibold border border-amber-500/30"
                  >
                    <FaPlus className="text-amber-400" />
                    <span>Add New Temple</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-amber-900/60 hover:bg-amber-900 text-amber-100 px-4 py-2.5 rounded-lg text-sm font-semibold border border-amber-500/30"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block px-1">
                  User Authentication
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAuthModal('login', '', 'pilgrim');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-amber-900/50 hover:bg-amber-900 text-amber-100 px-4 py-2.5 rounded-lg text-sm font-semibold border border-amber-500/30"
                >
                  <FaUser className="text-amber-400" />
                  <span>Pilgrim Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAuthModal('register', '✨ Create a new pilgrim account to save temples.', 'pilgrim');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-amber-800/60 hover:bg-amber-800 text-amber-100 px-4 py-2.5 rounded-lg text-sm font-semibold border border-amber-400/40"
                >
                  <FaUserPlus className="text-amber-300" />
                  <span>Create Pilgrim Account</span>
                </button>

                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md"
                >
                  <FaShieldAlt className="text-amber-200" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
