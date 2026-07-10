const express = require('express');
const { Op } = require('sequelize');
const MoodLog = require('../models/MoodLog');
const { authenticate } = require('../config');
const { updateStreak } = require('./streak');
const router = express.Router();

// Get today's mood log and the previous mood log
router.get('/', authenticate, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const moodRecord = await MoodLog.findOne({
      where: { userId: req.userId, date: today }
    });

    const previousMoodRecord = await MoodLog.findOne({
      where: {
        userId: req.userId,
        date: { [Op.lt]: today }
      },
      order: [['date', 'DESC']]
    });

    res.json({
      todayMood: moodRecord ? moodRecord.mood : null,
      previousMood: previousMoodRecord ? previousMoodRecord.mood : null,
      previousDate: previousMoodRecord ? previousMoodRecord.date : null
    });
  } catch (err) {
    console.error('Error fetching mood log:', err);
    res.status(500).json({ message: 'Failed to fetch mood data', error: err.message });
  }
});

// Create or Update today's mood log
router.post('/', authenticate, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ message: 'Mood is required' });
    }

    const validMoods = ['Happy', 'Good', 'Neutral', 'Sad', 'Stressed'];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({ message: 'Invalid mood option' });
    }

    const [moodRecord, created] = await MoodLog.findOrCreate({
      where: { userId: req.userId, date: today },
      defaults: { mood }
    });

    if (!created) {
      moodRecord.mood = mood;
      await moodRecord.save();
    }

    // Update user's daily streak
    try {
      await updateStreak(req.userId);
    } catch (streakErr) {
      console.error('Non-critical error updating streak:', streakErr);
    }

    // Fetch the previous mood again to return the full state
    const previousMoodRecord = await MoodLog.findOne({
      where: {
        userId: req.userId,
        date: { [Op.lt]: today }
      },
      order: [['date', 'DESC']]
    });

    res.json({
      todayMood: moodRecord.mood,
      previousMood: previousMoodRecord ? previousMoodRecord.mood : null,
      previousDate: previousMoodRecord ? previousMoodRecord.date : null
    });
  } catch (err) {
    console.error('Error updating mood log:', err);
    res.status(500).json({ message: 'Failed to update mood data', error: err.message });
  }
});

module.exports = router;
