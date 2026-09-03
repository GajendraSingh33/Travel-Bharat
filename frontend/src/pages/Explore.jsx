import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaRedo } from 'react-icons/fa';
import TempleCard from '../components/TempleCard';
import { fetchTemples, fetchFilterOptions } from '../services/api';
import { isTempleSaved } from '../utils/templeUtils';

const Explore = ({ savedTemples = [], onToggleSave }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    states: [],
    cities: [],
    deities: [],
    circuits: [],
  });

  // Active Filter state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [circuit, setCircuit] = useState(searchParams.get('circuit') || '');

  useEffect(() => {
    const loadFilters = async () => {
      const opts = await fetchFilterOptions();
      setFilterOptions(opts);
    };
    loadFilters();
  }, []);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setState(searchParams.get('state') || '');
    setCity(searchParams.get('city') || '');
    setCircuit(searchParams.get('circuit') || '');
  }, [searchParams]);

  useEffect(() => {
    const loadTemplesData = async () => {
      setLoading(true);
      try {
        const queryParams = {};
        if (search) queryParams.search = search;
        if (state) queryParams.state = state;
        if (city) queryParams.city = city;
        if (circuit) queryParams.circuit = circuit;

        const data = await fetchTemples(queryParams);
        setTemples(data);
      } catch (err) {
        console.error('Error fetching temples:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplesData();
  }, [search, state, city, circuit]);

  const updateFilterParams = (updatedFilters) => {
    const nextSearch = updatedFilters.search !== undefined ? updatedFilters.search : search;
    const nextState = updatedFilters.state !== undefined ? updatedFilters.state : state;
    const nextCity = updatedFilters.city !== undefined ? updatedFilters.city : city;
    const nextCircuit = updatedFilters.circuit !== undefined ? updatedFilters.circuit : circuit;

    setSearch(nextSearch);
    setState(nextState);
    setCity(nextCity);
    setCircuit(nextCircuit);

    const params = {};
    if (nextSearch) params.search = nextSearch;
    if (nextState) params.state = nextState;
    if (nextCity) params.city = nextCity;
    if (nextCircuit) params.circuit = nextCircuit;

    setSearchParams(params);
  };

  const handleSearchChange = (newSearch) => {
    updateFilterParams({ search: newSearch });
  };

  const handleStateChange = (newState) => {
    updateFilterParams({ state: newState, city: '' });
  };

  const handleCityChange = (newCity) => {
    updateFilterParams({ city: newCity });
  };

  const handleCircuitChange = (newCircuit) => {
    updateFilterParams({ circuit: newCircuit });
  };

  const handleResetFilters = () => {
    setSearch('');
    setState('');
    setCity('');
    setCircuit('');
    setSearchParams({});
  };

  const availableCities = state ? filterOptions.stateCitiesMap?.[state] || [] : [];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-slate-950 text-white rounded-3xl p-8 lg:p-10 shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center text-9xl font-serif">
            🛕
          </div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">
            State & City Directory
          </span>
          <h1 className="font-serif-cultural text-3xl sm:text-4xl font-extrabold text-amber-100">
            Explore Sacred Temples of India
          </h1>
          <p className="text-amber-200/80 text-sm max-w-2xl">
            Filter by region, state, city, deity, or pilgrimage circuit tag to discover complete heritage details, daily pooja schedules, and darshan guidelines.
          </p>
        </div>

        {/* Filter Toolbar & Search Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Keyword Search */}
            <div className="flex-1 w-full flex items-center space-x-3 bg-amber-50/70 border border-amber-300/60 rounded-xl px-3.5 py-2.5">
              <FaSearch className="text-amber-600 text-sm" />
              <input
                type="text"
                placeholder="Search by temple name, deity, or history..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-slate-800 text-sm font-medium"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-100/60 hover:bg-amber-100 border border-amber-300 px-4 py-2.5 rounded-xl transition-all"
            >
              <FaRedo className="text-amber-600" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Multi-Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* State Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                State
              </label>
              <select
                value={state}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="">Select State</option>
                {filterOptions.states?.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Dependent City Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                City / Location
              </label>
              <select
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={!state}
                className={`w-full border text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none transition-colors ${
                  state
                    ? 'bg-white border-slate-200 text-slate-800 focus:border-amber-500'
                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {!state ? (
                  <option value="">Select a state first</option>
                ) : (
                  <>
                    <option value="">Select a City</option>
                    {availableCities.map((ct) => (
                      <option key={ct} value={ct}>
                        {ct}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {/* Circuit Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Pilgrimage Circuit
              </label>
              <select
                value={circuit}
                onChange={(e) => handleCircuitChange(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="">All Circuits</option>
                {filterOptions.circuits?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Showing <span className="text-amber-700 font-black">{temples.length}</span> Temples
          </p>
          {(search || state || city || circuit) && (
            <div className="flex flex-wrap gap-1.5 text-xs">
              {search && <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">Search: {search}</span>}
              {state && <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">State: {state}</span>}
              {city && <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">City: {city}</span>}
              {circuit && <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">Circuit: {circuit}</span>}
            </div>
          )}
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
              No Temples Found
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              We couldn't find any temples matching your selected search filters. Try clearing your filters or search keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              Reset All Filters
            </button>
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

export default Explore;
