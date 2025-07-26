const express = require('express');
const router = express.Router();
const profileController = require('./profileController');

// Save or update profile
router.post('/profile', profileController.saveProfile);

// Get profile by userId
router.get('/profile/:userId', profileController.getProfile);

module.exports = router;
