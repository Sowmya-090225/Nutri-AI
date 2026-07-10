const express = require('express');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const { authenticate } = require('../config');
const router = express.Router();

// Get Profile
router.get('/', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.userId } });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Profile
router.put('/', authenticate, async (req, res) => {
  try {
    const { age, weight, height, gender, goal, dietaryPreference, allergies, avatar } = req.body;
    
    // Sanitize numeric fields - handle empty strings, undefined, null
    const parseNum = (val, parser) => {
      if (val === undefined || val === null || val === '') return null;
      const parsed = parser(val);
      return isNaN(parsed) ? null : parsed;
    };

    const sanitizedAge = parseNum(age, parseInt);
    const sanitizedWeight = parseNum(weight, parseFloat);
    const sanitizedHeight = parseNum(height, parseFloat);

    // Sanitize enums to lowercase if provided
    const sanitizedGender = gender?.toLowerCase();
    const sanitizedGoal = goal?.toLowerCase();
    const sanitizedDietaryPreference = dietaryPreference?.toLowerCase();

    let profile = await Profile.findOne({ where: { userId: req.userId } });

    const profileData = { 
      age: sanitizedAge, 
      weight: sanitizedWeight, 
      height: sanitizedHeight, 
      gender: sanitizedGender, 
      goal: sanitizedGoal, 
      dietaryPreference: sanitizedDietaryPreference, 
      allergies,
      avatar
    };

    if (!profile) {
      // For creation, we must include userId
      profile = await Profile.create({ ...profileData, userId: req.userId });
    } else {
      // For update, we exclude userId to avoid unique constraint issues
      await profile.update(profileData);
    }

    res.json(profile);
  } catch (err) {
    console.error('Profile Update Error:', err);
    // Return a more descriptive error if available
    const errorMsg = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;
    res.status(500).json({ message: errorMsg });
  }
});

module.exports = { router, authenticate };
