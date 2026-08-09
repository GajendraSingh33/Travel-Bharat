import Temple from '../models/Temple.js';
import { sampleTemples } from '../seedData.js';
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

export const getTemples = async (req, res) => {
  try {
    const { search, state, city, deity, circuit, isApproved, isFeatured } = req.query;

    if (isDbConnected()) {
      let query = {};

      if (isApproved !== undefined) {
        query.isApproved = isApproved === 'true';
      } else {
        query.isApproved = true; // Default to approved for public
      }

      if (isFeatured !== undefined) {
        query.isFeatured = isFeatured === 'true';
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
        query.circuitTags = { $regex: circuit, $options: 'i' };
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { state: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          { 'deity.name': { $regex: search, $options: 'i' } },
          { history: { $regex: search, $options: 'i' } },
        ];
      }

      const temples = await Temple.find(query).sort({ isFeatured: -1, createdAt: -1 });
      return res.json(temples);
    }

    // Fallback to sample seed data if DB not connected
    let results = sampleTemples;

    if (state) {
      results = results.filter((t) => t.state.toLowerCase().includes(state.toLowerCase()));
    }
    if (city) {
      results = results.filter((t) => t.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (deity) {
      results = results.filter((t) => t.deity.name.toLowerCase().includes(deity.toLowerCase()));
    }
    if (circuit) {
      results = results.filter((t) => t.circuitTags.some((c) => c.toLowerCase().includes(circuit.toLowerCase())));
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q) ||
          t.deity.name.toLowerCase().includes(q) ||
          t.history.toLowerCase().includes(q)
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
    if (isDbConnected()) {
      const states = await Temple.distinct('state');
      const cities = await Temple.distinct('city');
      const deities = await Temple.distinct('deity.name');
      const circuits = await Temple.distinct('circuitTags');
      return res.json({ states, cities, deities, circuits });
    }

    const states = [...new Set(sampleTemples.map((t) => t.state))];
    const cities = [...new Set(sampleTemples.map((t) => t.city))];
    const deities = [...new Set(sampleTemples.map((t) => t.deity.name))];
    const circuits = [...new Set(sampleTemples.flatMap((t) => t.circuitTags))];
    res.json({ states, cities, deities, circuits });
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
    res.status(400).json({ message: error.message });
  }
};

export const updateTemple = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const updated = await Temple.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
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
    res.status(400).json({ message: error.message });
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
