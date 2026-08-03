const express = require('express');
const User = require('../models/User');
const Profile = require('../models/Profile');
const FoodLog = require('../models/FoodLog');
const WaterIntake = require('../models/WaterIntake');
const Streak = require('../models/Streak');
const ThemePreference = require('../models/ThemePreference');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const { sendOTPEmail } = require('../emailService');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy-client-id');

// In-memory OTP store: email -> { otp, expiresAt, verified, name }
const otpStore = new Map();

const { JWT_SECRET, authenticate } = require('../config');

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format', errorType: 'invalid_email' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists', errorType: 'user_exists' });

    const otp = crypto.randomInt(100000, 999999).toString();
    
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      verified: false,
      name
    });

    try {
      await sendOTPEmail(email, otp);
      return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (emailError) {
      // Clean up the OTP entry since email wasn't sent
      otpStore.delete(email);
      
      if (emailError.smtpErrorType === 'auth') {
        return res.status(503).json({ 
          message: 'Email service is temporarily unavailable. Please try again later or use Google Sign-In.', 
          errorType: 'smtp_auth' 
        });
      } else if (emailError.smtpErrorType === 'network') {
        return res.status(503).json({ 
          message: 'Unable to connect to email service. Please check your internet connection and try again.', 
          errorType: 'smtp_network' 
        });
      } else {
        return res.status(503).json({ 
          message: 'Failed to send verification email. Please try again later or use Google Sign-In.', 
          errorType: 'smtp_error' 
        });
      }
    }
  } catch (err) {
    console.error('Send OTP route error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    const storeEntry = otpStore.get(email);
    if (!storeEntry) {
      return res.status(400).json({ message: 'No OTP found for this email. Please request a new one.' });
    }

    if (Date.now() > storeEntry.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (storeEntry.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    storeEntry.verified = true;
    otpStore.set(email, storeEntry);
    
    return res.status(200).json({ message: 'Email verified successfully', verified: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, otp } = req.body;

    const storeEntry = otpStore.get(email);
    if (!storeEntry || !storeEntry.verified) {
      return res.status(400).json({ message: 'Email not verified. Please complete OTP verification first.' });
    }
    if (storeEntry.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
    if (Date.now() > storeEntry.expiresAt) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ email, password: hashedPassword, name });

    // Create empty profile
    await Profile.create({ userId: user.id });

    otpStore.delete(email);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Ensure user has a password (they might be a Google user)
    if (!user.password) return res.status(400).json({ message: 'Please login with Google' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, profilePicture: user.profilePicture } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Google Auth
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
    });
    const payload = ticket.getPayload();
    const { email, name, sub, picture } = payload;

    let user = await User.findOne({ where: { email } });

    if (user) {
      // User exists, update googleId and profilePicture if missing
      if (!user.googleId) {
        user.googleId = sub;
        user.authProvider = 'google';
        user.profilePicture = picture || user.profilePicture;
        await user.save();
      }
    } else {
      // User doesn't exist, create
      user = await User.create({
        email,
        name,
        authProvider: 'google',
        googleId: sub,
        profilePicture: picture,
        password: null // No password for Google users
      });
      // Create empty profile
      await Profile.create({ userId: user.id });
    }

    const appToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token: appToken, user: { id: user.id, email: user.email, name: user.name, profilePicture: user.profilePicture } });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(400).json({ message: 'Invalid Google Token' });
  }
});

// Delete Account
router.delete('/account', authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    // Delete all associated data
    await Profile.destroy({ where: { userId } });
    await FoodLog.destroy({ where: { userId } });
    await WaterIntake.destroy({ where: { userId } });
    await Streak.destroy({ where: { userId } });
    await ThemePreference.destroy({ where: { userId } });

    // Finally delete the user
    await User.destroy({ where: { id: userId } });

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { router, JWT_SECRET, authenticate };
