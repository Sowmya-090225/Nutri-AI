/**
 * Fitness Engine Business Logic
 * Provides transparent, validated calculations for BMR, TDEE, BMI,
 * weight management recommendations, weekly workout plans, exercise recommendations,
 * and progressive overload suggestions.
 */

/**
 * Calculates Basal Metabolic Rate using the validated Mifflin-St Jeor equation.
 * @param {Object} profile - User profile { age, weight, height, gender }
 * @returns {number|null} BMR in kcal/day
 */
const calculateBMR = (profile) => {
  const { age, weight, height, gender } = profile || {};
  if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
    return null;
  }

  // Mifflin-St Jeor
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else if (gender === 'female') {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  } else {
    // Balanced average for 'other' or unspecified
    const male = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    const female = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    return (male + female) / 2;
  }
};

/**
 * Calculates Total Daily Energy Expenditure (TDEE).
 * @param {Object} profile - User profile with activityLevel
 * @returns {number|null} TDEE in kcal/day
 */
const calculateTDEE = (profile) => {
  const bmr = calculateBMR(profile);
  if (bmr === null) return null;

  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const level = (profile.activityLevel || 'sedentary').toLowerCase();
  const mult = multipliers[level] || 1.2;
  return Math.round(bmr * mult);
};

/**
 * Calculates BMI and standard classification for adults.
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {Object} { bmi: number, category: string, isHealthy: boolean }
 */
const calculateBMI = (weight, height) => {
  if (!weight || !height || weight <= 0 || height <= 0) {
    return { bmi: null, category: 'Unknown', isHealthy: false };
  }
  const heightM = height / 100;
  const bmiVal = weight / (heightM * heightM);
  const rounded = parseFloat(bmiVal.toFixed(2));

  let category = 'Normal';
  let isHealthy = false;

  if (rounded < 18.5) {
    category = 'Underweight';
  } else if (rounded < 24.9) {
    category = 'Normal';
    isHealthy = true;
  } else if (rounded < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return { bmi: rounded, category, isHealthy };
};

/**
 * Calculates daily calorie targets with transparent deficit/surplus breakdown.
 * @param {Object} profile
 * @returns {Object}
 */
const getGoalCalories = (profile) => {
  const tdee = calculateTDEE(profile);
  if (!tdee) {
    return { tdee: null, goalCalories: null, adjustment: 0, reason: 'Profile incomplete' };
  }

  const goal = (profile.goal || 'maintenance').toLowerCase();
  let adjustment = 0;
  let reason = 'Energy balance for weight maintenance.';

  if (goal === 'weight_loss') {
    adjustment = -400; // Sustainable moderate deficit (300-500 kcal)
    reason = 'Moderate, sustainable energy deficit for progressive fat loss.';
  } else if (goal === 'weight_gain') {
    adjustment = 400; // Moderate surplus for lean mass support
    reason = 'Moderate caloric surplus to support muscular hypertrophy and healthy weight gain.';
  }

  const goalCalories = Math.max(1200, Math.round(tdee + adjustment));

  return {
    tdee,
    goalCalories,
    adjustment,
    reason,
    method: 'Mifflin-St Jeor equation with physical activity multiplier'
  };
};

/**
 * Generates an intelligent, transparent weight management recommendation.
 * Adheres strictly to safety guidelines (no extreme deficits, minor protection, non-diagnostic).
 * @param {Object} profile
 * @returns {Object}
 */
const getWeightManagementRecommendation = (profile) => {
  if (!profile || !profile.weight || !profile.height || !profile.age) {
    return {
      status: 'insufficient_data',
      direction: 'Insufficient Information',
      title: 'Additional Profile Information Required',
      explanation: 'To provide safe, accurate energy and weight recommendations, we need your age, current weight, and height.',
      profileDataUsed: {
        age: profile?.age || null,
        weight: profile?.weight || null,
        height: profile?.height || null
      },
      missingFields: [
        !profile?.age && 'Age',
        !profile?.weight && 'Weight',
        !profile?.height && 'Height'
      ].filter(Boolean),
      assumptions: [],
      suggestedNextSteps: ['Update your profile with accurate body measurements.'],
      safetyNotes: ['General wellness tool. Not intended for medical diagnosis.'],
      canChangeGoal: true
    };
  }

  // Safety check: Adolescents and Minors (< 18)
  if (profile.age < 18) {
    return {
      status: 'professional_guidance',
      direction: 'Professional Guidance Recommended',
      title: 'Individualized Guidance Recommended for Minors',
      explanation: 'Standard adult metabolic equations and automated weight-loss plans are not appropriate for individuals under 18 years of age due to active growth and development.',
      profileDataUsed: { age: profile.age },
      assumptions: ['User is under 18 years of age.'],
      suggestedNextSteps: [
        'Consult with a pediatrician, registered dietitian, or qualified healthcare professional.',
        'Focus on joyful physical activity, wholesome balanced meals, and adequate sleep without restrictive calorie targets.'
      ],
      safetyNotes: [
        'Automated caloric deficit prescriptions are restricted for young individuals to safeguard health and development.'
      ],
      canChangeGoal: true
    };
  }

  const { bmi, category } = calculateBMI(profile.weight, profile.height);
  const currentGoal = (profile.goal || 'maintenance').toLowerCase();
  const targetWeight = profile.targetWeight ? parseFloat(profile.targetWeight) : null;
  const activityLevel = profile.activityLevel || 'sedentary';
  const energyData = getGoalCalories(profile);

  // Near target weight check
  const nearTarget = targetWeight && Math.abs(profile.weight - targetWeight) <= 1.5;

  let direction = 'Weight Maintenance';
  let title = 'Maintain Current Weight & Build Fitness';
  let explanation = '';
  let status = 'success';

  if (currentGoal === 'weight_loss') {
    if (bmi < 18.5) {
      status = 'professional_guidance';
      direction = 'Professional Guidance Recommended';
      title = 'Underweight Warning: Professional Guidance Recommended';
      explanation = `Warn: You are already underweight with a BMI of ${bmi} (< 18.5). Active caloric restriction is not medically recommended. We advise consulting a qualified healthcare professional or dietitian.`;
    } else {
      direction = 'Weight Loss';
      title = 'Moderate Caloric Deficit Recommended';
      explanation = `Your selected goal is weight loss. Based on your current profile (BMI ${bmi}), we recommend a moderate caloric deficit of 400 kcal/day (within the safe 300-500 kcal range) below your maintenance level of ${energyData.tdee} kcal, paired with progressive resistance training.`;
    }
  } else if (currentGoal === 'weight_gain') {
    direction = 'Weight Gain';
    title = 'Moderate Caloric Surplus Recommended';
    explanation = `Your selected goal is weight gain. We recommend a moderate caloric surplus of 400 kcal/day (within the 300-500 kcal range) above your maintenance level of ${energyData.tdee} kcal, combined with strength training to promote lean tissue synthesis.`;
  } else {
    // Maintenance
    direction = 'Weight Maintenance';
    title = nearTarget ? 'Goal Achieved: Weight Maintenance' : 'Weight Maintenance & Body Recomposition';
    explanation = nearTarget
      ? `You have reached your target weight (${targetWeight} kg). We recommend maintaining energy balance (${energyData.tdee} kcal/day) while optimizing athletic performance, strength, and recovery.`
      : `Your goal is weight maintenance. Your estimated daily energy balance is ${energyData.tdee} kcal/day. Prioritize consistent physical activity, balanced macronutrients, and restorative sleep.`;
  }

  return {
    status,
    direction,
    title,
    explanation,
    profileDataUsed: {
      age: profile.age,
      gender: profile.gender || 'unspecified',
      heightCm: profile.height,
      weightKg: profile.weight,
      targetWeightKg: targetWeight,
      bmi,
      bmiCategory: category,
      activityLevel,
      currentGoal
    },
    assumptions: [
      `Activity level modeled as "${activityLevel}" (multiplier: ${activityLevel === 'sedentary' ? '1.2' : 'custom'}).`,
      'Calculated using the Mifflin-St Jeor formula for basal energy needs.',
      'BMI is evaluated strictly as a general screening reference, not as a diagnostic metric.'
    ],
    energyTargets: energyData,
    suggestedNextSteps: [
      'Follow your personalized weekly workout routine consistently.',
      'Track your workouts and hydration to stay accountable.',
      'Review your fitness goal whenever your lifestyle or priorities change.'
    ],
    safetyNotes: [
      'This guidance is designed for general fitness and wellness educational purposes.',
      'Individuals with chronic conditions, injuries, or eating disorders should consult a physician before adopting changes.'
    ],
    canChangeGoal: true
  };
};

/**
 * Returns recommended weekly workout frequency based on experience.
 * @param {Object} profile
 * @returns {number} Days per week
 */
const getRecommendedWeeklyWorkouts = (profile) => {
  const exp = (profile?.fitnessExperience || 'beginner').toLowerCase();
  if (exp === 'advanced') return 5;
  if (exp === 'intermediate') return 4;
  return 3; // Beginner
};

/**
 * Computes personalized sets, reps, and rest for a specific exercise and user profile.
 * IMPORTANT: Body weight is NEVER prescribed as lifting resistance.
 * @param {Object} exercise - Exercise definition
 * @param {Object} profile - User profile
 * @returns {Object}
 */
const getRecommendedSetsReps = (exercise, profile) => {
  const exp = (profile?.fitnessExperience || 'beginner').toLowerCase();
  const goal = (profile?.goal || 'maintenance').toLowerCase();

  // If timed exercise
  if (exercise.durationSeconds) {
    let dur = exercise.durationSeconds;
    if (exp === 'intermediate') dur = Math.round(dur * 1.3);
    if (exp === 'advanced') dur = Math.round(dur * 1.6);
    return {
      sets: exp === 'advanced' ? 4 : exp === 'intermediate' ? 3 : 2,
      durationSeconds: dur,
      repRange: null,
      restSeconds: exercise.restSeconds || 45,
      resistanceSuggestion: 'Bodyweight / Control movement'
    };
  }

  let sets = 3;
  let repsMin = 8;
  let repsMax = 12;
  let rest = 60;

  if (exp === 'beginner') {
    sets = 2;
    repsMin = 8;
    repsMax = 12;
    rest = 60;
  } else if (exp === 'intermediate') {
    if (goal === 'weight_gain') {
      // Hypertrophy
      sets = 3;
      repsMin = 8;
      repsMax = 12;
      rest = 75;
    } else if (goal === 'weight_loss') {
      // Density / Endurance
      sets = 3;
      repsMin = 10;
      repsMax = 15;
      rest = 45;
    } else {
      sets = 3;
      repsMin = 8;
      repsMax = 12;
      rest = 60;
    }
  } else {
    // Advanced
    if (goal === 'weight_gain') {
      sets = 4;
      repsMin = 6;
      repsMax = 10;
      rest = 90;
    } else {
      sets = 4;
      repsMin = 8;
      repsMax = 15;
      rest = 60;
    }
  }

  // Equipment guidance note
  let resistanceSuggestion = 'Bodyweight';
  if (exercise.equipment === 'dumbbells') {
    resistanceSuggestion = exp === 'beginner' ? 'Light dumbbells (2-5 kg)' : 'Moderate load with clean technique';
  } else if (exercise.equipment === 'barbell') {
    resistanceSuggestion = exp === 'beginner' ? 'Empty bar or very light plates' : 'Controlled working weight';
  } else if (exercise.equipment === 'resistance_band') {
    resistanceSuggestion = 'Light to medium resistance band';
  }

  return {
    sets,
    repRange: { min: repsMin, max: repsMax },
    durationSeconds: null,
    restSeconds: rest,
    resistanceSuggestion
  };
};

/**
 * Filter and score exercises appropriate for this user profile.
 * @param {Object} profile
 * @param {Array} exercises
 * @returns {Array} Filtered and ranked exercises
 */
const getExerciseRecommendations = (profile, exercises = []) => {
  if (!Array.isArray(exercises) || exercises.length === 0) return [];

  const exp = (profile?.fitnessExperience || 'beginner').toLowerCase();
  const goal = (profile?.goal || 'maintenance').toLowerCase();
  const restrictions = (profile?.exerciseRestrictions || '')
    .toLowerCase()
    .split(',')
    .map(r => r.trim())
    .filter(Boolean);

  return exercises
    .filter(ex => {
      // Filter out exercises that match user restrictions
      if (restrictions.length > 0) {
        const text = `${ex.name} ${ex.description} ${(ex.primaryMuscles || []).join(' ')}`.toLowerCase();
        for (const res of restrictions) {
          if (text.includes(res)) return false;
        }
      }
      return true;
    })
    .map(ex => {
      let score = 0;
      // Difficulty match
      if (ex.difficulty === exp) score += 4;
      else if (exp === 'beginner' && ex.difficulty === 'intermediate') score += 1;
      else if (exp === 'intermediate') score += 2;
      else if (exp === 'advanced') score += 2;

      // Goal match
      const suitable = ex.suitableGoals || [];
      if (goal === 'weight_loss' && (suitable.includes('weight_loss') || suitable.includes('endurance') || suitable.includes('cardio'))) {
        score += 3;
      }
      if (goal === 'weight_gain' && (suitable.includes('muscle_growth') || suitable.includes('strength'))) {
        score += 3;
      }
      if (goal === 'maintenance' && suitable.includes('general_fitness')) {
        score += 3;
      }

      // Equipment accessibility: Beginners get bonus for bodyweight
      if (exp === 'beginner' && ex.equipment === 'none') {
        score += 2;
      }

      return { ...ex, recommendationScore: score };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore);
};

/**
 * Generates a full 7-day personalized weekly workout plan.
 * @param {Object} profile - User profile
 * @param {Array} exercises - Complete exercise library
 * @returns {Array} 7-day workout plan array
 */
const generateWeeklyWorkoutPlan = (profile, exercises = []) => {
  const exp = (profile?.fitnessExperience || 'beginner').toLowerCase();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Template structure based on experience
  let schedule = [];
  if (exp === 'beginner') {
    schedule = [
      { dayOfWeek: 0, dayName: 'Monday', workoutType: 'Full Body Strength', isRestDay: false, categoryFocus: ['chest', 'back', 'legs_quadriceps', 'abs_core'] },
      { dayOfWeek: 1, dayName: 'Tuesday', workoutType: 'Rest & Active Recovery', isRestDay: true, categoryFocus: [] },
      { dayOfWeek: 2, dayName: 'Wednesday', workoutType: 'Full Body & Core', isRestDay: false, categoryFocus: ['arms_biceps', 'shoulders', 'glutes', 'abs_core'] },
      { dayOfWeek: 3, dayName: 'Thursday', workoutType: 'Light Cardio & Mobility', isRestDay: false, categoryFocus: ['cardio', 'flexibility', 'face_neck'] },
      { dayOfWeek: 4, dayName: 'Friday', workoutType: 'Full Body Strength', isRestDay: false, categoryFocus: ['chest', 'back', 'legs_quadriceps', 'bodyweight'] },
      { dayOfWeek: 5, dayName: 'Saturday', workoutType: 'Rest & Gentle Walk', isRestDay: true, categoryFocus: [] },
      { dayOfWeek: 6, dayName: 'Sunday', workoutType: 'Rest & Recovery', isRestDay: true, categoryFocus: [] }
    ];
  } else if (exp === 'intermediate') {
    schedule = [
      { dayOfWeek: 0, dayName: 'Monday', workoutType: 'Upper Body Power', isRestDay: false, categoryFocus: ['chest', 'back', 'shoulders', 'arms_biceps'] },
      { dayOfWeek: 1, dayName: 'Tuesday', workoutType: 'Lower Body & Core', isRestDay: false, categoryFocus: ['legs_quadriceps', 'hamstrings', 'glutes', 'abs_core'] },
      { dayOfWeek: 2, dayName: 'Wednesday', workoutType: 'Cardio & Active Mobility', isRestDay: false, categoryFocus: ['cardio', 'flexibility'] },
      { dayOfWeek: 3, dayName: 'Thursday', workoutType: 'Upper Body Hypertrophy', isRestDay: false, categoryFocus: ['chest', 'back', 'triceps', 'shoulders'] },
      { dayOfWeek: 4, dayName: 'Friday', workoutType: 'Lower Body & Glutes', isRestDay: false, categoryFocus: ['legs_quadriceps', 'glutes', 'hamstrings', 'abs_core'] },
      { dayOfWeek: 5, dayName: 'Saturday', workoutType: 'Rest & Recovery', isRestDay: true, categoryFocus: [] },
      { dayOfWeek: 6, dayName: 'Sunday', workoutType: 'Rest & Reset', isRestDay: true, categoryFocus: [] }
    ];
  } else {
    // Advanced (Push / Pull / Legs split)
    schedule = [
      { dayOfWeek: 0, dayName: 'Monday', workoutType: 'Push: Chest, Shoulders, Triceps', isRestDay: false, categoryFocus: ['chest', 'shoulders', 'triceps'] },
      { dayOfWeek: 1, dayName: 'Tuesday', workoutType: 'Pull: Back, Biceps, Core', isRestDay: false, categoryFocus: ['back', 'arms_biceps', 'abs_core'] },
      { dayOfWeek: 2, dayName: 'Wednesday', workoutType: 'Legs & Core', isRestDay: false, categoryFocus: ['legs_quadriceps', 'hamstrings', 'glutes', 'abs_core'] },
      { dayOfWeek: 3, dayName: 'Thursday', workoutType: 'Cardio, Mobility & Core', isRestDay: false, categoryFocus: ['cardio', 'flexibility', 'abs_core'] },
      { dayOfWeek: 4, dayName: 'Friday', workoutType: 'Upper Body Strength', isRestDay: false, categoryFocus: ['chest', 'back', 'shoulders', 'arms_biceps'] },
      { dayOfWeek: 5, dayName: 'Saturday', workoutType: 'Lower Body & High Intensity', isRestDay: false, categoryFocus: ['legs_quadriceps', 'glutes', 'cardio'] },
      { dayOfWeek: 6, dayName: 'Sunday', workoutType: 'Complete Rest & Regeneration', isRestDay: true, categoryFocus: [] }
    ];
  }

  // Populate actual exercises for non-rest days
  const recommendedExercises = getExerciseRecommendations(profile, exercises);

  return schedule.map(day => {
    if (day.isRestDay) {
      return {
        ...day,
        exercises: [],
        estimatedDurationMinutes: 0
      };
    }

    // Pick 4-5 exercises matching the day's focus
    const pickedExercises = [];
    const usedIds = new Set();

    day.categoryFocus.forEach(cat => {
      const match = recommendedExercises.find(ex =>
        !usedIds.has(ex.id) &&
        Array.isArray(ex.category) &&
        ex.category.includes(cat)
      );
      if (match) {
        usedIds.add(match.id);
        const params = getRecommendedSetsReps(match, profile);
        pickedExercises.push({
          exerciseId: match.id,
          name: match.name,
          primaryMuscles: match.primaryMuscles,
          equipment: match.equipment,
          difficulty: match.difficulty,
          sets: params.sets,
          repRange: params.repRange,
          durationSeconds: params.durationSeconds,
          restSeconds: params.restSeconds,
          resistanceSuggestion: params.resistanceSuggestion
        });
      }
    });

    // Fallback if fewer than 3 exercises found
    if (pickedExercises.length < 3) {
      for (const ex of recommendedExercises) {
        if (!usedIds.has(ex.id) && pickedExercises.length < 4) {
          usedIds.add(ex.id);
          const params = getRecommendedSetsReps(ex, profile);
          pickedExercises.push({
            exerciseId: ex.id,
            name: ex.name,
            primaryMuscles: ex.primaryMuscles,
            equipment: ex.equipment,
            difficulty: ex.difficulty,
            sets: params.sets,
            repRange: params.repRange,
            durationSeconds: params.durationSeconds,
            restSeconds: params.restSeconds,
            resistanceSuggestion: params.resistanceSuggestion
          });
        }
      }
    }

    const estimatedDurationMinutes = pickedExercises.reduce((acc, ex) => {
      const setTime = (ex.durationSeconds || 30) * ex.sets;
      const restTime = (ex.restSeconds || 60) * (ex.sets - 1);
      return acc + Math.round((setTime + restTime) / 60) + 1;
    }, 5); // 5 min warm-up buffer

    return {
      dayOfWeek: day.dayOfWeek,
      dayName: day.dayName,
      workoutType: day.workoutType,
      isRestDay: false,
      exercises: pickedExercises,
      estimatedDurationMinutes: Math.min(60, Math.max(20, estimatedDurationMinutes))
    };
  });
};

/**
 * Analyzes performance history and suggests progressive overload safely.
 * @param {Array} sessionHistory - Array of past completed workout sessions
 * @returns {Object}
 */
const suggestProgression = (sessionHistory = []) => {
  if (!Array.isArray(sessionHistory) || sessionHistory.length < 2) {
    return {
      status: 'maintain',
      message: 'Great start! Focus on mastering proper form and movement control before progressing load.'
    };
  }

  // Check last 3 sessions completion rate
  const recent = sessionHistory.slice(-3);
  const totalPlannedSets = recent.reduce((sum, s) => sum + (s.totalSets || 0), 0);
  const totalCompletedSets = recent.reduce((sum, s) => sum + (s.completedSets || 0), 0);

  if (totalPlannedSets > 0 && totalCompletedSets / totalPlannedSets >= 0.95) {
    return {
      status: 'increase',
      message: 'Consistently hitting all sets with clean form! Consider progressing by adding 1-2 repetitions or a small increment in resistance.'
    };
  } else if (totalPlannedSets > 0 && totalCompletedSets / totalPlannedSets < 0.6) {
    return {
      status: 'decrease',
      message: 'You have been pushing hard. Consider taking an extra rest day or reducing volume slightly to aid recovery.'
    };
  }

  return {
    status: 'maintain',
    message: 'Consistent training! Continue with your current volume and focus on tempo and full range of motion.'
  };
};

module.exports = {
  calculateBMR,
  calculateTDEE,
  calculateBMI,
  getGoalCalories,
  getWeightManagementRecommendation,
  getRecommendedWeeklyWorkouts,
  getRecommendedSetsReps,
  getExerciseRecommendations,
  generateWeeklyWorkoutPlan,
  suggestProgression
};
