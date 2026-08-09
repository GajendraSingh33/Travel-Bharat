import express from 'express';
import { getCircuits, getCircuitByIdOrSlug, createCircuit } from '../controllers/circuitController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCircuits);
router.get('/:id', getCircuitByIdOrSlug);
router.post('/', protect, adminOnly, createCircuit);

export default router;
