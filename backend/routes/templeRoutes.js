import express from 'express';
import {
  getTemples,
  getFeaturedTemples,
  getTempleByIdOrSlug,
  getFilterOptions,
  createTemple,
  updateTemple,
  deleteTemple,
  approveTemple,
  toggleFeaturedTemple,
} from '../controllers/templeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTemples);
router.get('/featured', getFeaturedTemples);
router.get('/filters', getFilterOptions);
router.get('/:id', getTempleByIdOrSlug);

// Admin / Public submission routes
router.post('/', protect, adminOnly, createTemple);
router.put('/:id', protect, adminOnly, updateTemple);
router.delete('/:id', protect, adminOnly, deleteTemple);
router.patch('/:id/approve', protect, adminOnly, approveTemple);
router.patch('/:id/feature', protect, adminOnly, toggleFeaturedTemple);

export default router;
