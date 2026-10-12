const express = require('express');
const { authenticate } = require('./profile');
const Profile = require('../models/Profile');
const WorkoutPlan = require('../models/WorkoutPlan');
const WorkoutSession = require('../models/WorkoutSession');
const WeightLog = require('../models/WeightLog');
const exercises = require('../logic/exerciseData');
const {
  calculateBMI,
  calculateTDEE,
  getGoalCalories,
  getWeightManagementRecommendation,
  getRecommendedWeeklyWorkouts,
  generateWeeklyWorkoutPlan,
  getExerciseRecommendations,
  getRecommendedSetsReps,
  suggestProgression
} = require('../logic/fitnessEngine');

const router = express.Router();

/**
 * GET /api/fitness/exercises
 * Search, filter and sort exercise library
 */
router.get('/exercises', (req, res) => {
  try {
    let result = [...exercises];
    const { category, gender, difficulty, equipment, search, sort } = req.query;

    if (category && category !== 'all') {
      result = result.filter(ex => Array.isArray(ex.category) && ex.category.includes(category));
    }

    if (gender && (gender === 'men' || gender === 'women')) {
      result = result.filter(ex => Array.isArray(ex.genderGuideTags) && ex.genderGuideTags.includes(gender));
    }

    if (difficulty && difficulty !== 'all') {
      result = result.filter(ex => ex.difficulty === difficulty.toLowerCase());
    }

    if (equipment && equipment !== 'all') {
      result = result.filter(ex => ex.equipment === equipment.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(ex =>
        ex.name.toLowerCase().includes(q) ||
        (ex.primaryMuscles || []).some(m => m.toLowerCase().includes(q)) ||
        (ex.secondaryMuscles || []).some(m => m.toLowerCase().includes(q)) ||
        (ex.category || []).some(c => c.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sort === 'alpha') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'duration') {
      result.sort((a, b) => (a.estimatedDurationMinutes || 10) - (b.estimatedDurationMinutes || 10));
    }

    res.json({
      count: result.length,
      exercises: result
    });
  } catch (err) {
    console.error('Error in /exercises:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/fitness/exercises/:id
 * Retrieve specific exercise details and variations
 */
router.get('/exercises/:id', (req, res) => {
  try {
    const { id } = req.params;
    const exercise = exercises.find(ex => ex.id === id || ex.slug === id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Resolve alternatives
    const alternatives = (exercise.alternativeExerciseIds || [])
      .map(altId => exercises.find(e => e.id === altId))
      .filter(Boolean);

    res.json({
      ...exercise,
      alternatives
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/fitness/recommendation
 * Provides transparent, safe weight-management guidance based on authenticated user profile
 */
router.get('/recommendation', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.userId } });
    if (!profile) {
      return res.json(getWeightManagementRecommendation(null));
    }
    const profileData = profile.toJSON ? profile.toJSON() : profile;
    const rec = getWeightManagementRecommendation(profileData);
    res.json(rec);
  } catch (err) {
    console.error('Error in /recommendation:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/fitness/overview
 * Top-level dashboard summary card data for the fitness page
 */
router.get('/overview', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.userId } });
    const profileData = profile ? (profile.toJSON ? profile.toJSON() : profile) : null;

    const bmiData = profileData ? calculateBMI(profileData.weight, profileData.height) : null;
    const energyData = profileData ? getGoalCalories(profileData) : null;
    const weeklyTargetDays = profileData ? getRecommendedWeeklyWorkouts(profileData) : 3;

    // Get current week's workout stats
    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7; // 0=Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek);
    const weekStartDate = monday.toISOString().split('T')[0];

    const weeklyPlans = await WorkoutPlan.findAll({
      where: { userId: req.userId, weekStartDate }
    });

    const completedDays = weeklyPlans.filter(p => p.completed).length;
    const todayPlan = weeklyPlans.find(p => p.dayOfWeek === dayOfWeek);

    // Total lifetime completed workouts
    const totalSessions = await WorkoutSession.count({ where: { userId: req.userId } });

    res.json({
      profile: {
        age: profileData?.age || null,
        weight: profileData?.weight || null,
        height: profileData?.height || null,
        gender: profileData?.gender || null,
        goal: profileData?.goal || 'maintenance',
        activityLevel: profileData?.activityLevel || 'sedentary',
        fitnessExperience: profileData?.fitnessExperience || 'beginner',
        targetWeight: profileData?.targetWeight || null
      },
      bmi: bmiData,
      energy: energyData,
      weeklyStats: {
        targetDays: weeklyTargetDays,
        completedDays,
        completionRate: weeklyTargetDays > 0 ? Math.round((completedDays / weeklyTargetDays) * 100) : 0,
        weekStartDate
      },
      todayWorkout: todayPlan ? {
        id: todayPlan.id,
        workoutType: todayPlan.workoutType,
        isRestDay: todayPlan.isRestDay,
        completed: todayPlan.completed,
        exercises: todayPlan.exercises || [],
        estimatedDurationMinutes: todayPlan.estimatedDurationMinutes
      } : null,
      totalWorkoutsCompleted: totalSessions
    });
  } catch (err) {
    console.error('Error in /overview:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/fitness/weekly-plan
 * Get or automatically generate the current week's workout plan
 */
router.get('/weekly-plan', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.userId } });
    const profileData = profile ? (profile.toJSON ? profile.toJSON() : profile) : {};

    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7; // 0=Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek);
    const weekStartDate = monday.toISOString().split('T')[0];

    let plans = await WorkoutPlan.findAll({
      where: { userId: req.userId, weekStartDate },
      order: [['dayOfWeek', 'ASC']]
    });

    // If no plan exists for this week, generate and save automatically
    if (plans.length === 0) {
      const generated = generateWeeklyWorkoutPlan(profileData, exercises);
      const recordsToCreate = generated.map(day => ({
        userId: req.userId,
        weekStartDate,
        dayOfWeek: day.dayOfWeek,
        dayName: day.dayName,
        workoutType: day.workoutType,
        isRestDay: day.isRestDay,
        exercises: day.exercises,
        estimatedDurationMinutes: day.estimatedDurationMinutes,
        completed: false
      }));

      plans = await WorkoutPlan.bulkCreate(recordsToCreate);
    }

    res.json({
      weekStartDate,
      plans
    });
  } catch (err) {
    console.error('Error in GET /weekly-plan:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/fitness/weekly-plan/regenerate
 * Force regeneration of weekly workout plan
 */
router.post('/weekly-plan/regenerate', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.userId } });
    const profileData = profile ? (profile.toJSON ? profile.toJSON() : profile) : {};

    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek);
    const weekStartDate = monday.toISOString().split('T')[0];

    // Remove existing plans for this week
    await WorkoutPlan.destroy({ where: { userId: req.userId, weekStartDate } });

    const generated = generateWeeklyWorkoutPlan(profileData, exercises);
    const recordsToCreate = generated.map(day => ({
      userId: req.userId,
      weekStartDate,
      dayOfWeek: day.dayOfWeek,
      dayName: day.dayName,
      workoutType: day.workoutType,
      isRestDay: day.isRestDay,
      exercises: day.exercises,
      estimatedDurationMinutes: day.estimatedDurationMinutes,
      completed: false
    }));

    const plans = await WorkoutPlan.bulkCreate(recordsToCreate);
    res.json({ message: 'Plan regenerated successfully', plans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/fitness/weekly-plan
 * Save or update weekly workout plan
 */
router.post('/weekly-plan', authenticate, async (req, res) => {
  try {
    const { weekStartDate, plans } = req.body;
    if (!weekStartDate || !Array.isArray(plans)) {
      return res.status(400).json({ message: 'weekStartDate and plans array are required' });
    }

    const savedPlans = [];
    for (const item of plans) {
      const [record, created] = await WorkoutPlan.findOrCreate({
        where: {
          userId: req.userId,
          weekStartDate,
          dayOfWeek: item.dayOfWeek
        },
        defaults: {
          dayName: item.dayName || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][item.dayOfWeek] || 'Day',
          workoutType: item.workoutType || 'Rest & Recovery',
          isRestDay: !!item.isRestDay,
          exercises: item.exercises || [],
          estimatedDurationMinutes: item.estimatedDurationMinutes || 0,
          completed: !!item.completed,
          completedAt: item.completed ? new Date() : null
        }
      });

      if (!created) {
        if (item.dayName !== undefined) record.dayName = item.dayName;
        if (item.workoutType !== undefined) record.workoutType = item.workoutType;
        if (item.isRestDay !== undefined) record.isRestDay = item.isRestDay;
        if (item.exercises !== undefined) record.exercises = item.exercises;
        if (item.estimatedDurationMinutes !== undefined) record.estimatedDurationMinutes = item.estimatedDurationMinutes;
        if (item.completed !== undefined) {
          record.completed = item.completed;
          record.completedAt = item.completed ? (record.completedAt || new Date()) : null;
        }
        await record.save();
      }
      savedPlans.push(record);
    }

    res.json({ message: 'Weekly plan saved successfully', plans: savedPlans });
  } catch (err) {
    console.error('Error in POST /weekly-plan:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /api/fitness/weekly-plan/:id
 * Update/customise a single day in the weekly plan (replace exercises, reschedule, mark complete)
 */
router.put('/weekly-plan/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await WorkoutPlan.findOne({ where: { id, userId: req.userId } });
    if (!plan) {
      return res.status(404).json({ message: 'Workout day not found' });
    }

    const { exercises: newExercises, workoutType, isRestDay, completed, estimatedDurationMinutes } = req.body;

    if (newExercises !== undefined) plan.exercises = newExercises;
    if (workoutType !== undefined) plan.workoutType = workoutType;
    if (isRestDay !== undefined) plan.isRestDay = isRestDay;
    if (estimatedDurationMinutes !== undefined) plan.estimatedDurationMinutes = estimatedDurationMinutes;
    if (completed !== undefined) {
      plan.completed = completed;
      plan.completedAt = completed ? new Date() : null;
    }

    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/fitness/workout-session
 * Save a completed interactive workout session and persist history
 */
router.post('/workout-session', authenticate, async (req, res) => {
  try {
    const {
      workoutType,
      exercises: sessionExercises,
      durationMinutes,
      notes,
      planDayId
    } = req.body;

    const totalExercises = Array.isArray(sessionExercises) ? sessionExercises.length : 0;
    const completedExercises = Array.isArray(sessionExercises)
      ? sessionExercises.filter(e => e.completed).length
      : 0;

    let totalSets = 0;
    let completedSets = 0;
    if (Array.isArray(sessionExercises)) {
      sessionExercises.forEach(e => {
        if (Array.isArray(e.sets)) {
          totalSets += e.sets.length;
          completedSets += e.sets.filter(s => s.completed).length;
        }
      });
    }

    const session = await WorkoutSession.create({
      userId: req.userId,
      date: new Date().toISOString().split('T')[0],
      workoutType: workoutType || 'Workout Session',
      exercises: sessionExercises,
      totalExercises,
      completedExercises,
      totalSets,
      completedSets,
      durationMinutes: durationMinutes || 0,
      notes: notes || '',
      planDayId: planDayId || null
    });

    // If connected to weekly plan day, mark that day as completed
    if (planDayId) {
      const planDay = await WorkoutPlan.findOne({ where: { id: planDayId, userId: req.userId } });
      if (planDay) {
        planDay.completed = true;
        planDay.completedAt = new Date();
        await planDay.save();
      }
    }

    res.status(201).json(session);
  } catch (err) {
    console.error('Error in POST /workout-session:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/fitness/workout-history
 * Fetch historical completed workout sessions with optional date filtering
 */
router.get('/workout-history', authenticate, async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const sessions = await WorkoutSession.findAll({
      where: { userId: req.userId },
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/fitness/progress
 * Aggregated analytics: consistency, total workouts, volume trends, progression advice
 */
router.get('/progress', authenticate, async (req, res) => {
  try {
    const sessions = await WorkoutSession.findAll({
      where: { userId: req.userId },
      order: [['date', 'ASC']]
    });

    const weightLogs = await WeightLog.findAll({
      where: { userId: req.userId },
      order: [['date', 'ASC']]
    });

    const totalWorkouts = sessions.length;
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const progressionAdvice = suggestProgression(sessions);

    // Group workouts by last 7 days
    const recentActivity = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const match = sessions.filter(s => s.date === dateStr);
      recentActivity.push({
        date: dateStr,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: match.length > 0,
        workoutsCount: match.length,
        durationMinutes: match.reduce((sum, s) => sum + (s.durationMinutes || 0), 0)
      });
    }

    res.json({
      totalWorkouts,
      totalMinutes,
      averageDuration: totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0,
      progressionAdvice,
      recentActivity,
      weightHistory: weightLogs.map(w => ({ date: w.date, weight: w.weight }))
    });
  } catch (err) {
    console.error('Error in /progress:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/fitness/weight-log
 * Log daily bodyweight entry
 */
router.post('/weight-log', authenticate, async (req, res) => {
  try {
    const { weight, date } = req.body;
    if (!weight || isNaN(parseFloat(weight))) {
      return res.status(400).json({ message: 'Valid weight value is required' });
    }
    const logDate = date || new Date().toISOString().split('T')[0];

    const [entry, created] = await WeightLog.findOrCreate({
      where: { userId: req.userId, date: logDate },
      defaults: { weight: parseFloat(weight) }
    });

    if (!created) {
      entry.weight = parseFloat(weight);
      await entry.save();
    }

    // Also update Profile current weight
    const profile = await Profile.findOne({ where: { userId: req.userId } });
    if (profile) {
      profile.weight = parseFloat(weight);
      await profile.save();
    }

    res.json({ message: 'Weight logged successfully', entry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/fitness/weight-log
 * Get bodyweight history
 */
router.get('/weight-log', authenticate, async (req, res) => {
  try {
    const { limit = 30 } = req.query;
    const logs = await WeightLog.findAll({
      where: { userId: req.userId },
      order: [['date', 'ASC']],
      limit: parseInt(limit)
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
