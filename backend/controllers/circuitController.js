import Circuit from '../models/Circuit.js';
import { sampleCircuits } from '../seedData.js';
import mongoose from 'mongoose';

const isDbConnected = () => mongoose.connection.readyState === 1;

export const getCircuits = async (req, res) => {
  try {
    if (isDbConnected()) {
      const circuits = await Circuit.find().populate('templeIds');
      return res.json(circuits);
    }
    res.json(sampleCircuits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCircuitByIdOrSlug = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      let circuit;
      if (mongoose.Types.ObjectId.isValid(id)) {
        circuit = await Circuit.findById(id).populate('templeIds');
      }
      if (!circuit) {
        circuit = await Circuit.findOne({ slug: id }).populate('templeIds');
      }
      if (!circuit) return res.status(404).json({ message: 'Circuit not found' });
      return res.json(circuit);
    }

    const circuit = sampleCircuits.find((c) => c._id === id || c.slug === id);
    if (!circuit) return res.status(404).json({ message: 'Circuit not found' });
    res.json(circuit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCircuit = async (req, res) => {
  try {
    if (isDbConnected()) {
      const circuit = await Circuit.create(req.body);
      return res.status(201).json(circuit);
    }
    const mock = { ...req.body, _id: 'mock_circuit_' + Date.now() };
    sampleCircuits.push(mock);
    res.status(201).json(mock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
