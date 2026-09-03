import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight, FaOm } from 'react-icons/fa';
import { fetchCircuits } from '../services/api';

const Circuits = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCircuits = async () => {
      setLoading(true);
      try {
        const data = await fetchCircuits();
        setCircuits(data || []);
      } catch (err) {
        console.error('Error fetching circuits:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCircuits();
  }, []);

  return (
    <div className="pt-24 pb-16 bg-amber-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-amber-900 text-white rounded-3xl p-8 lg:p-12 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center text-9xl font-serif">
            🗺️
          </div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">
            Multi-Temple Sacred Trails
          </span>
          <h1 className="font-serif-cultural text-3xl sm:text-5xl font-extrabold text-amber-100">
            Sacred Pilgrimage Circuits of Bharat
          </h1>
          <p className="text-amber-200/80 text-sm max-w-2xl leading-relaxed">
            Follow ancient documented pilgrimage routes designed to grant spiritual fulfillment. Discover circuit stops, distance estimates, recommended days, and temple sequences.
          </p>
        </div>

        {/* Circuits List */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-white rounded-3xl animate-pulse border border-amber-100"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {circuits.map((circuit) => (
              <div
                key={circuit._id}
                className="bg-white rounded-3xl overflow-hidden border border-amber-200 shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-3"
              >
                {/* Left Image */}
                <div className="h-64 lg:h-auto relative bg-slate-900">
                  <img
                    src={circuit.image}
                    alt={circuit.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-amber-200">
                    <span className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full uppercase">
                      {circuit.region}
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      ⏱ {circuit.recommendedDays}
                    </span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">

                    <h2 className="font-serif-cultural text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {circuit.name}
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {circuit.description}
                    </p>

                    {circuit.significance && (
                      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 space-y-1">
                        <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Spiritual Significance</span>
                        <p className="text-xs text-slate-700">{circuit.significance}</p> 
                      </div>
                    )}
                  </div>

                  {/* Circuit Temple Stops */}
                  {circuit.templeIds && circuit.templeIds.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          Preview Temple Stopovers ({circuit.templeIds.length} Total):
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {circuit.templeIds.slice(0, 4).map((t, idx) => (
                          <Link
                            key={t._id || idx}
                            to={`/temple/${t.slug || t._id}`}
                            className="bg-amber-100/70 hover:bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-xl border border-amber-300 transition-colors flex items-center space-x-1.5"
                          >
                            <FaOm className="text-amber-600" />
                            <span>{t.name || `Temple ${idx + 1}`}</span>
                          </Link>
                        ))}
                        {circuit.templeIds.length > 4 && (
                          <Link
                            to={`/explore?circuit=${encodeURIComponent(circuit.name)}`}
                            className="bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-400 transition-colors flex items-center space-x-1"
                          >
                            <span>+{circuit.templeIds.length - 4} More Temples</span>
                            <FaArrowRight className="text-[10px]" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Recommended Travel: Road / Rail / Air Circuit
                    </span>
                    <Link
                      to={`/explore?circuit=${encodeURIComponent(circuit.name)}`}
                      className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-amber-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
                    >
                      <span>Explore Circuit Temples</span>
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Circuits;
