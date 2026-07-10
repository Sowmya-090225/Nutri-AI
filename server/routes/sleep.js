const express = require('express');
const SleepLog = require('../models/SleepLog');
const { authenticate } = require('./profile');
const { updateStreak } = require('./streak');
const router = express.Router();

// Get today's sleep log
router.get('/', authenticate, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const [sleepRecord] = await SleepLog.findOrCreate({
      where: { userId: req.userId, date: today },
      defaults: { hours: 0 }
    });

    res.json(sleepRecord);
  } catch (err) {
    console.error('Error fetching sleep log:', err);
    res.status(500).json({ message: 'Failed to fetch sleep data', error: err.message });
  }
});

// Update today's sleep log
router.post('/', authenticate, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { hours } = req.body;

    console.log(`[Sleep Log Update] User: ${req.userId}, Date: ${today}, Received Hours: ${hours}`);

    if (hours === undefined || isNaN(hours)) {
      return res.status(400).json({ message: 'hours is required and must be a number' });
    }

    const [sleepRecord] = await SleepLog.findOrCreate({
      where: { userId: req.userId, date: today },
      defaults: { hours: 0 }
    });

    sleepRecord.hours = parseFloat(hours);
    await sleepRecord.save();
    
    // Increment or maintain the user's daily streak
    try {
      await updateStreak(req.userId);
    } catch (streakErr) {
      console.error('Non-critical error updating streak:', streakErr);
    }

    // Explicitly reload to get the most accurate state from DB
    await sleepRecord.reload();
    console.log(`[Sleep Log Success] New Hours: ${sleepRecord.hours}`);

    res.json(sleepRecord);
  } catch (err) {
    console.error('Error updating sleep log:', err);
    res.status(500).json({ message: 'Failed to update sleep data', error: err.message });
  }
});

module.exports = router;
