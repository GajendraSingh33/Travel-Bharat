import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Temple from '../models/Temple.js';
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

const getPublicUserPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  savedTemples: user.savedTemples || [],
});

export const registerUser = async (req, res) => {
  try {
    if (!(await ensureAuthDbConnection(res))) return;

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Always enforce default 'user' role on public registration
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
    });

    if (user) {
      await user.populate('savedTemples');
      res.status(201).json({
        ...getPublicUserPayload(user),
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

    const { email, password, loginType } = req.body;

    const user = await User.findOne({ email }).populate('savedTemples');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Role verification strictly from database user document
    if (loginType === 'pilgrim' || !loginType) {
      if (user.role === 'admin') {
        return res.status(403).json({ message: 'Admin accounts must use Admin Login.' });
      }
    } else if (loginType === 'admin') {
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Account does not have admin privileges.' });
      }
    }

    res.json({
      ...getPublicUserPayload(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    if (!(await ensureAuthDbConnection(res))) return;

    const user = await User.findById(req.user._id).populate('savedTemples');
    if (user) {
      res.json(getPublicUserPayload(user));
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedTemples = async (req, res) => {
  try {
    if (!(await ensureAuthDbConnection(res))) return;

    const user = await User.findById(req.user._id).populate('savedTemples');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ savedTemples: user.savedTemples || [] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleSavedTemple = async (req, res) => {
  try {
    if (!(await ensureAuthDbConnection(res))) return;

    const { templeId } = req.params;
    let temple;

    if (mongoose.Types.ObjectId.isValid(templeId)) {
      temple = await Temple.findById(templeId);
    }
    if (!temple) {
      temple = await Temple.findOne({ slug: templeId });
    }

    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const targetTempleIdStr = temple._id.toString();
    const alreadySaved = user.savedTemples.some(
      (savedId) => (savedId._id ? savedId._id.toString() : savedId.toString()) === targetTempleIdStr
    );

    if (alreadySaved) {
      user.savedTemples = user.savedTemples.filter(
        (savedId) => (savedId._id ? savedId._id.toString() : savedId.toString()) !== targetTempleIdStr
      );
    } else {
      user.savedTemples.push(temple._id);
    }

    await user.save();
    await user.populate('savedTemples');

    return res.json({
      message: alreadySaved ? 'Temple removed from saved list' : 'Temple saved successfully',
      savedTemples: user.savedTemples || [],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
