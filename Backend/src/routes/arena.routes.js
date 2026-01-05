import express from 'express';
import * as arenaController from '../controllers/arena.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All arena routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/arena/start
 * @desc    Start a new Sudden Death session
 * @access  Private
 */
router.post('/start', arenaController.startSession);

/**
 * @route   POST /api/v1/arena/submit
 * @desc    Submit code for the current arena level
 * @access  Private
 */
router.post('/submit', arenaController.submitArenaCode);

/**
 * @route   GET /api/v1/arena/status
 * @desc    Get active session status
 * @access  Private
 */
router.get('/status', arenaController.getSessionStatus);

/**
 * @route   POST /api/v1/arena/fail
 * @desc    Explicitly fail an active session
 * @access  Private
 */
router.post('/fail', arenaController.failSession);

/**
 * @route   GET /api/v1/arena/lockouts
 * @desc    Get lockout status for all languages
 * @access  Private
 */
router.get('/lockouts', arenaController.getLockouts);

export default router;
