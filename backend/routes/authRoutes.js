import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getSavedTemples,
  toggleSavedTemple,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile);
router.get('/saved-temples', protect, getSavedTemples);
router.patch('/saved-temples/:templeId', protect, toggleSavedTemple);

export default router;
