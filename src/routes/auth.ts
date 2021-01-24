import { Router } from 'express';

const router = Router();
const authController = require('../controllers').auth;

/**
 * Register Route
 * Accepts username, password in request body
 * level is currently an arbitrary parameter set to 0, to be user later
 */
router.post('/register', authController.register);

/**
 * Login Route
 * Accepts username, password in request body
 * Checks whether there's a matching record in the database
 * Rejects with error status 400 and a message if not found
 * Accepts with user record and a signed JWT
 */
router.post('/login', authController.login);