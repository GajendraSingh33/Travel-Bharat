import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ensureDbConnection } from '../config/db.js';

const DB_UNAVAILABLE_MESSAGE =
  'Database connection unavailable. Please verify MongoDB Atlas configuration and try again.';

const ensureAuthDbConnection = async (res) => {
  try {
    await ensureDbConnection();
    return true;
  } catch (error) {
    console.error(`[Auth DB Error] ${error.message}`);
    res.status(503).json({ message: DB_UNAVAILABLE_MESSAGE });
    return false;
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'travel_bharat_secret_key', {
    expiresIn: '7d',
  });
};

export const registerUser = async (req, res) => {
  try {
    if (!(await ensureAuthDbConnection(res))) return;

    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedTemples: user.savedTemples,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    if (!(await ensureAuthDbConnection(res))) return;

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedTemples: user.savedTemples,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    if (!(await ensureAuthDbConnection(res))) return;

    const user = await User.findById(req.user._id).populate('savedTemples');
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedTemples: user.savedTemples,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
