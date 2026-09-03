import Temple from '../models/Temple.js';
import Circuit from '../models/Circuit.js';
import { sampleTemples, sampleCircuits } from '../seedData.js';
import mongoose from 'mongoose';

// Utility helper to generate slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// Check if MongoDB connection is ready
const isDbConnected = () => mongoose.connection.readyState === 1;

export const REGION_STATE_MAP = {
  'North India': ['Uttarakhand', 'Uttar Pradesh', 'Punjab', 'Himachal Pradesh', 'Jammu & Kashmir', 'Delhi', 'Haryana', 'Ladakh'],
  'South India': ['Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Kerala'],
  'West India': ['Gujarat', 'Maharashtra', 'Rajasthan', 'Goa'],
  'East India': ['Odisha', 'West Bengal', 'Jharkhand', 'Bihar', 'Assam', 'Sikkim', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura'],
  'Central India': ['Madhya Pradesh', 'Chhattisgarh']
};

export const getTemples = async (req, res) => {
  try {
    const { search, state, city, deity, circuit, region, isApproved, isFeatured } = req.query;

    if (isDbConnected()) {
      let query = {};

      if (isApproved !== undefined && isApproved !== 'all') {
        query.isApproved = isApproved === 'true';
      } else if (isApproved === undefined) {
        query.isApproved = true; // Default to approved for public
      }
      // isApproved === 'all' → no filter, return everything

      if (isFeatured !== undefined) {
        query.isFeatured = isFeatured === 'true';
      }

      if (region && REGION_STATE_MAP[region]) {
        const statesInRegion = REGION_STATE_MAP[region];
        query.state = { $in: statesInRegion.map((s) => new RegExp(`^${s}$`, 'i')) };
      }

      if (state) {
        query.state = { $regex: state, $options: 'i' };
      }

      if (city) {
        query.city = { $regex: city, $options: 'i' };
      }

      if (deity) {
        query['deity.name'] = { $regex: deity, $options: 'i' };
      }

      if (circuit) {
        const cleanCircuit = circuit.replace(/\s*\([^)]*\)/g, '').trim();
        const matchingCircuit = await Circuit.findOne({
          $or: [
            { name: { $regex: circuit, $options: 'i' } },
            { name: { $regex: cleanCircuit, $options: 'i' } },
            { slug: { $regex: circuit, $options: 'i' } },
            { slug: { $regex: slugify(cleanCircuit), $options: 'i' } },
          ],
        });

        if (matchingCircuit && matchingCircuit.templeIds && matchingCircuit.templeIds.length > 0) {
          query.$or = [
            { _id: { $in: matchingCircuit.templeIds } },
            { circuitTags: { $regex: circuit, $options: 'i' } },
            { circuitTags: { $regex: cleanCircuit, $options: 'i' } },
          ];
        } else {
          query.$or = [
            { circuitTags: { $regex: circuit, $options: 'i' } },
            { circuitTags: { $regex: cleanCircuit, $options: 'i' } },
          ];
        }
      }

      if (search) {
        const searchRegex = { $regex: search, $options: 'i' };
        const searchConditions = [
          { name: searchRegex },
          { state: searchRegex },
          { city: searchRegex },
          { 'deity.name': searchRegex },
          { history: searchRegex },
          { circuitTags: searchRegex },
        ];
        if (query.$or) {
          const circuitOr = [...query.$or];
          delete query.$or;
          query.$and = [{ $or: circuitOr }, { $or: searchConditions }];
        } else {
          query.$or = searchConditions;
        }
      }

      const temples = await Temple.find(query).sort({ isFeatured: -1, createdAt: -1 });
      return res.json(temples);
    }

    // Fallback to sample seed data if DB not connected
    let results = sampleTemples;

    if (region && REGION_STATE_MAP[region]) {
      const allowedStates = REGION_STATE_MAP[region].map((s) => s.toLowerCase());
      results = results.filter((t) => t.state && allowedStates.includes(t.state.toLowerCase()));
    }

    if (circuit) {
      const cleanCircuit = circuit.replace(/\s*\([^)]*\)/g, '').trim();
      const circuitObj = sampleCircuits.find(
        (c) =>
          c.name.toLowerCase().includes(circuit.toLowerCase()) ||
          c.name.toLowerCase().includes(cleanCircuit.toLowerCase()) ||
          c.slug.toLowerCase().includes(circuit.toLowerCase())
      );
      if (circuitObj && circuitObj.templeIds) {
        results = results.filter(
          (t) =>
            circuitObj.templeIds.includes(t._id) ||
            t.circuitTags.some(
              (cTag) =>
                cTag.toLowerCase().includes(circuit.toLowerCase()) ||
                cTag.toLowerCase().includes(cleanCircuit.toLowerCase())
            )
        );
      } else {
        results = results.filter((t) =>
          t.circuitTags.some(
            (cTag) =>
              cTag.toLowerCase().includes(circuit.toLowerCase()) ||
              cTag.toLowerCase().includes(cleanCircuit.toLowerCase())
          )
        );
      }
    }

    if (state) {
      results = results.filter((t) => t.state.toLowerCase().includes(state.toLowerCase()));
    }
    if (city) {
      results = results.filter((t) => t.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (deity) {
      results = results.filter((t) => t.deity.name.toLowerCase().includes(deity.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q) ||
          t.deity.name.toLowerCase().includes(q) ||
          t.history.toLowerCase().includes(q) ||
          (t.circuitTags && t.circuitTags.some((cTag) => cTag.toLowerCase().includes(q)))
      );
    }
    if (isFeatured === 'true') {
      results = results.filter((t) => t.isFeatured);
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedTemples = async (req, res) => {
  try {
    if (isDbConnected()) {
      const featured = await Temple.find({ isFeatured: true, isApproved: true }).limit(6);
      return res.json(featured);
    }
    const featured = sampleTemples.filter((t) => t.isFeatured).slice(0, 6);
    res.json(featured);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTempleByIdOrSlug = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      let temple;
      if (mongoose.Types.ObjectId.isValid(id)) {
        temple = await Temple.findById(id);
      }
      if (!temple) {
        temple = await Temple.findOne({ slug: id });
      }
      if (!temple) {
        return res.status(404).json({ message: 'Temple not found' });
      }
      return res.json(temple);
    }

    const temple = sampleTemples.find((t) => t._id === id || t.slug === id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    const regions = ['North India', 'South India', 'West India', 'East India', 'Central India'];

    if (isDbConnected()) {
      const states = await Temple.distinct('state');
      const cities = await Temple.distinct('city');
      const deities = await Temple.distinct('deity.name');
      const templeCircuits = await Temple.distinct('circuitTags');
      const circuitDocs = await Circuit.distinct('name');
      const circuits = [...new Set([...templeCircuits, ...circuitDocs])].filter(Boolean);

      const stateCityAgg = await Temple.aggregate([
        { $match: { isApproved: true, state: { $ne: null, $exists: true }, city: { $ne: null, $exists: true } } },
        { $group: { _id: '$state', cities: { $addToSet: '$city' } } },
        { $sort: { _id: 1 } },
      ]);

      const stateCitiesMap = {};
      stateCityAgg.forEach((item) => {
        if (item._id) {
          stateCitiesMap[item._id] = (item.cities || []).sort();
        }
      });

      return res.json({
        states: states.sort(),
        cities: cities.sort(),
        deities: deities.sort(),
        circuits: circuits.sort(),
        regions,
        stateCitiesMap,
      });
    }

    const states = [...new Set(sampleTemples.map((t) => t.state))].sort();
    const cities = [...new Set(sampleTemples.map((t) => t.city))].sort();
    const deities = [...new Set(sampleTemples.map((t) => t.deity.name))].sort();
    const circuits = [...new Set([...sampleTemples.flatMap((t) => t.circuitTags), ...sampleCircuits.map((c) => c.name)])].sort();

    const stateCitiesMap = {};
    sampleTemples.forEach((t) => {
      if (t.state && t.city) {
        if (!stateCitiesMap[t.state]) {
          stateCitiesMap[t.state] = [];
        }
        if (!stateCitiesMap[t.state].includes(t.city)) {
          stateCitiesMap[t.state].push(t.city);
        }
      }
    });
    Object.keys(stateCitiesMap).forEach((st) => stateCitiesMap[st].sort());

    res.json({ states, cities, deities, circuits, regions, stateCitiesMap });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTemple = async (req, res) => {
  try {
    const templeData = req.body;
    if (!templeData.slug) {
      templeData.slug = slugify(templeData.name);
    }

    if (isDbConnected()) {
      // Handle duplicate slug by appending timestamp
      const existingSlug = await Temple.findOne({ slug: templeData.slug });
      if (existingSlug) {
        templeData.slug = templeData.slug + '-' + Date.now();
      }
      const created = await Temple.create(templeData);
      return res.status(201).json(created);
    }

    // In-memory mock response
    const mockCreated = {
      ...templeData,
      _id: 'mock_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    sampleTemples.unshift(mockCreated);
    res.status(201).json(mockCreated);
  } catch (error) {
    const statusCode = error.name === 'ValidationError' || error.code === 11000 ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

export const updateTemple = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Auto-generate slug from name if name is updated but slug isn't provided
    if (updateData.name && !updateData.slug) {
      const existing = await Temple.findById(id);
      if (existing) {
        updateData.slug = existing.slug; // Keep existing slug to avoid duplicate
      }
    }

    if (isDbConnected()) {
      // Use $set to avoid runValidators requiring all required fields
      const updated = await Temple.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ message: 'Temple not found' });
      return res.json(updated);
    }

    const idx = sampleTemples.findIndex((t) => t._id === id || t.slug === id);
    if (idx !== -1) {
      sampleTemples[idx] = { ...sampleTemples[idx], ...req.body };
      return res.json(sampleTemples[idx]);
    }
    res.status(404).json({ message: 'Temple not found' });
  } catch (error) {
    const statusCode = error.name === 'ValidationError' || error.code === 11000 ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

export const deleteTemple = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Temple.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Temple not found' });
      return res.json({ message: 'Temple deleted successfully' });
    }

    const idx = sampleTemples.findIndex((t) => t._id === id);
    if (idx !== -1) {
      sampleTemples.splice(idx, 1);
      return res.json({ message: 'Temple deleted successfully' });
    }
    res.status(404).json({ message: 'Temple not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveTemple = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    if (isDbConnected()) {
      const temple = await Temple.findByIdAndUpdate(id, { isApproved }, { new: true });
      return res.json(temple);
    }

    const temple = sampleTemples.find((t) => t._id === id);
    if (temple) {
      temple.isApproved = isApproved;
      return res.json(temple);
    }
    res.status(404).json({ message: 'Temple not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleFeaturedTemple = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const temple = await Temple.findById(id);
      if (!temple) return res.status(404).json({ message: 'Temple not found' });
      temple.isFeatured = !temple.isFeatured;
      await temple.save();
      return res.json(temple);
    }

    const temple = sampleTemples.find((t) => t._id === id);
    if (temple) {
      temple.isFeatured = !temple.isFeatured;
      return res.json(temple);
    }
    res.status(404).json({ message: 'Temple not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
