import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import TempleDetail from './pages/TempleDetail';
import Circuits from './pages/Circuits';
import SavedTemples from './pages/SavedTemples';
import AdminDashboard from './pages/AdminDashboard';
import AddTempleModal from './components/AddTempleModal';
import { getUserProfile, loginUser, registerUser, toggleSavedTempleForCurrentUser } from './services/api';
import { getTempleId } from './utils/templeUtils';

const AUTH_TOKEN_KEY = 'tb_auth_token';
const AUTH_USER_KEY = 'tb_auth_user';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AuthModal = ({ isOpen, mode, onClose, onSubmit, error, initialMessage, onModeChange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [isOpen, mode]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-amber-200 shadow-2xl space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-serif-cultural text-2xl font-bold text-slate-900">
              {mode === 'register' ? 'Create Pilgrim Account' : 'Login to Travel Bharat'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'register'
                ? 'Register your personal Pilgrim account to save temples and plan trips.'
                : 'Access your saved temple list and personal pilgrimage session.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher for Pilgrim Authentication */}
        <div className="flex border-b border-amber-200">
          <button
            type="button"
            onClick={() => onModeChange('login')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all ${
              mode === 'login'
                ? 'border-amber-600 text-amber-700 font-extrabold bg-amber-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-amber-800'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => onModeChange('register')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all ${
              mode === 'register'
                ? 'border-amber-600 text-amber-700 font-extrabold bg-amber-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-amber-800'
            }`}
          >
            Create Pilgrim Account
          </button>
        </div>

        {initialMessage && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold p-3 rounded-xl">
            {initialMessage}
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3 rounded-xl">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              mode,
              name,
              email,
              password,
            });
          }}
          autoComplete="off"
          className="space-y-3"
        >
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                autoComplete="off"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
              />
            </div>
          )}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              autoComplete="off"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'At least 6 characters' : 'Enter your password'}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all mt-1"
          >
            {mode === 'register' ? 'Create Pilgrim Account' : 'Login to Account'}
          </button>
        </form>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => onModeChange(mode === 'register' ? 'login' : 'register')}
            className="text-xs text-amber-700 font-bold hover:text-amber-900"
          >
            {mode === 'register'
              ? 'Already have a Pilgrim account? Login here'
              : 'New Pilgrim? Create your account here'}
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem(AUTH_TOKEN_KEY) || '');
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    try {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Auth user parse error:', error);
      return null;
    }
  });
  const [savedTemples, setSavedTemples] = useState([]);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [savedTempleError, setSavedTempleError] = useState('');

  const [addTempleModalOpen, setAddTempleModalOpen] = useState(false);
  const [templeSuccessToast, setTempleSuccessToast] = useState('');
  const [templeUpdateTrigger, setTempleUpdateTrigger] = useState(0);

  const handleTempleAdded = (newTemple) => {
    const statusText = newTemple?.isApproved ? 'and published live!' : '(pending approval).';
    setTempleSuccessToast(`✨ Temple "${newTemple?.name || 'entry'}" has been successfully added ${statusText}`);
    setTempleUpdateTrigger((prev) => prev + 1);
    setTimeout(() => {
      setTempleSuccessToast('');
    }, 6000);
  };

  const clearAuthSession = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem('tb_admin_token');
    localStorage.removeItem('tb_admin_user');
    localStorage.removeItem('tb_saved_temples');
    setAuthToken('');
    setCurrentUser(null);
    setSavedTemples([]);
  };

  const persistAuthSession = (authData) => {
    localStorage.setItem(AUTH_TOKEN_KEY, authData.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authData));
    setAuthToken(authData.token);
    setCurrentUser(authData);
    setSavedTemples(authData.savedTemples || []);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setSavedTemples(currentUser?.savedTemples || []);
    }, 0);
    return () => clearTimeout(id);
  }, [currentUser]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!authToken) {
        setCurrentUser(null);
        setSavedTemples([]);
        return;
      }

      try {
        const profile = await getUserProfile();
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
        setCurrentUser(profile);
        setSavedTemples(profile.savedTemples || []);
      } catch (err) {
        console.error('Failed to load profile session:', err);
        clearAuthSession();
      }
    };

    loadProfile();
  }, [authToken]);

  const handleOpenAuthModal = (mode = 'login', message = '') => {
    setAuthMode(mode);
    setAuthMessage(message);
    setAuthError('');
    setAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
    setAuthError('');
    setAuthMessage('');
  };

  const handleAuthSubmit = async (payload) => {
    if (payload.mode === 'login' || payload.mode === 'register') {
      try {
        const authData = payload.mode === 'register'
          ? await registerUser({ name: payload.name, email: payload.email, password: payload.password })
          : await loginUser(payload.email, payload.password);
        persistAuthSession(authData);
        handleCloseAuthModal();
      } catch (error) {
        setAuthError(error.response?.data?.message || 'Authentication failed. Please try again.');
      }
      return;
    }

    setAuthMode(payload.mode);
    setAuthError('');
  };

  const handleLogout = () => {
    clearAuthSession();
    handleCloseAuthModal();
  };

  const handleToggleSave = async (temple) => {
    if (!authToken || !currentUser) {
      handleOpenAuthModal('login', 'Please login to save temples in your personal list.');
      return;
    }

    const templeId = getTempleId(temple);
    if (!templeId) {
      return;
    }

    try {
      const response = await toggleSavedTempleForCurrentUser(templeId);
      const nextSavedTemples = response.savedTemples || [];
      setSavedTemples(nextSavedTemples);
      setCurrentUser((prevUser) => (prevUser ? { ...prevUser, savedTemples: nextSavedTemples } : prevUser));
      localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({ ...currentUser, savedTemples: nextSavedTemples })
      );
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuthSession();
        handleOpenAuthModal('login', 'Your session expired. Please login again.');
      } else {
        setSavedTempleError(error.response?.data?.message || 'Unable to update saved temples.');
      }
    }
  };

  const handleClearAllSaved = async () => {
    if (!authToken || !currentUser || savedTemples.length === 0) {
      return;
    }

    try {
      let nextSavedTemples = savedTemples;
      for (const temple of savedTemples) {
        const templeId = getTempleId(temple);
        if (!templeId) continue;
        const response = await toggleSavedTempleForCurrentUser(templeId);
        nextSavedTemples = response.savedTemples || [];
      }
      setSavedTemples(nextSavedTemples);
      setCurrentUser((prevUser) => (prevUser ? { ...prevUser, savedTemples: nextSavedTemples } : prevUser));
      localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({ ...currentUser, savedTemples: nextSavedTemples })
      );
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuthSession();
        handleOpenAuthModal('login', 'Your session expired. Please login again.');
      } else {
        setSavedTempleError(error.response?.data?.message || 'Unable to clear saved temples right now.');
      }
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between bg-amber-50/20 text-slate-900 font-sans">
        <Navbar
          savedCount={currentUser ? savedTemples.length : 0}
          currentUser={currentUser}
          onOpenAuthModal={handleOpenAuthModal}
          onLogout={handleLogout}
          onOpenAddTempleModal={() => setAddTempleModalOpen(true)}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home key={templeUpdateTrigger} savedTemples={savedTemples} onToggleSave={handleToggleSave} />}
            />
            <Route
              path="/explore"
              element={<Explore key={templeUpdateTrigger} savedTemples={savedTemples} onToggleSave={handleToggleSave} />}
            />
            <Route
              path="/temple/:slug"
              element={<TempleDetail savedTemples={savedTemples} onToggleSave={handleToggleSave} />}
            />
            <Route path="/circuits" element={<Circuits />} />
            <Route
              path="/saved"
              element={
                <SavedTemples
                  savedTemples={savedTemples}
                  onToggleSave={handleToggleSave}
                  onClearAll={handleClearAllSaved}
                  currentUser={currentUser}
                  onOpenAuthModal={handleOpenAuthModal}
                />
              }
            />
            <Route
              path="/admin"
              element={
                currentUser && currentUser.role !== 'admin'
                  ? <Navigate to="/" replace />
                  : <AdminDashboard currentUser={currentUser} onAuthSuccess={persistAuthSession} onLogout={handleLogout} />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={handleCloseAuthModal}
        onSubmit={handleAuthSubmit}
        onModeChange={(newMode) => {
          setAuthMode(newMode);
          setAuthError('');
        }}
        error={authError}
        initialMessage={authMessage}
      />

      <AddTempleModal
        isOpen={addTempleModalOpen}
        onClose={() => setAddTempleModalOpen(false)}
        onSuccess={handleTempleAdded}
      />

      {templeSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white text-xs font-semibold px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center space-x-3 transition-all animate-bounce">
          <span>{templeSuccessToast}</span>
          <button
            type="button"
            onClick={() => setTempleSuccessToast('')}
            className="text-emerald-300 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {savedTempleError && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-rose-500/50 flex items-center space-x-3 transition-all">
          <span className="text-rose-400">⚠️</span>
          <span>{savedTempleError}</span>
          <button
            type="button"
            onClick={() => setSavedTempleError('')}
            className="text-slate-400 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </Router>
  );
}

export default App;
