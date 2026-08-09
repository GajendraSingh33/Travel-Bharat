import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import TempleDetail from './pages/TempleDetail';
import Circuits from './pages/Circuits';
import SavedTemples from './pages/SavedTemples';
import AdminDashboard from './pages/AdminDashboard';

// Scroll to top helper component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [savedTemples, setSavedTemples] = useState(() => {
    try {
      const stored = localStorage.getItem('tb_saved_temples');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tb_saved_temples', JSON.stringify(savedTemples));
    } catch (err) {
      console.error('LocalStorage error:', err);
    }
  }, [savedTemples]);

  const handleToggleSave = (temple) => {
    setSavedTemples((prev) => {
      const exists = prev.some((t) => t._id === temple._id);
      if (exists) {
        return prev.filter((t) => t._id !== temple._id);
      } else {
        return [...prev, temple];
      }
    });
  };

  const handleClearAllSaved = () => {
    setSavedTemples([]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between bg-amber-50/20 text-slate-900 font-sans">
        <Navbar savedCount={savedTemples.length} />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home savedTemples={savedTemples} onToggleSave={handleToggleSave} />}
            />
            <Route
              path="/explore"
              element={<Explore savedTemples={savedTemples} onToggleSave={handleToggleSave} />}
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
                />
              }
            />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
