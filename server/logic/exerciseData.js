/**
 * Exercise Data Library
 */
const exercises = [
  {
    "id": "push_up",
    "name": "Standard Push-Up",
    "slug": "standard-push-up",
    "description": "A classic bodyweight resistance exercise that builds pectoral strength and core stability without equipment.",
    "primaryMuscles": [
      "Chest",
      "Triceps"
    ],
    "secondaryMuscles": [
      "Shoulders",
      "Core"
    ],
    "category": [
      "chest",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Assume a high plank position with palms flat on the floor directly beneath shoulders.",
      "Engage your abdominal wall and glutes to keep your spine neutral from crown to heels.",
      "Inhale as you lower your chest toward the floor, keeping elbows at a 45-degree angle.",
      "Exhale and firmly press the ground away to return to the starting position."
    ],
    "formTips": [
      "Do not allow lower back to sag.",
      "Keep neck neutral by gazing 6 inches ahead of your hands."
    ],
    "safetyNotes": "Wrist discomfort can be mitigated by performing on push-up handles or dumbbells.",
    "imageUrl": null,
    "imageAlt": "Illustration of standard push-up form",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "general_fitness",
      "muscle_growth",
      "strength",
      "endurance"
    ],
    "exerciseVariations": [
      "Incline Push-Up",
      "Knee Push-Up",
      "Decline Push-Up"
    ],
    "alternativeExerciseIds": [
      "dumbbell_bench_press",
      "incline_push_up"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "dumbbell_bench_press",
    "name": "Dumbbell Flat Bench Press",
    "slug": "dumbbell-flat-bench-press",
    "description": "Bilateral chest press utilizing dumbbells to develop balanced chest activation and shoulder stability.",
    "primaryMuscles": [
      "Chest"
    ],
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "category": [
      "chest",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Lie flat on a sturdy bench with dumbbells held at chest level, palms forward.",
      "Plant your feet firmly on the ground with a slight natural arch in the lower back.",
      "Press the dumbbells upward in a controlled arc until arms are extended but not locked.",
      "Slowly lower the weights until your elbows reach roughly bench height."
    ],
    "formTips": [
      "Keep shoulder blades retracted against the bench.",
      "Do not bang dumbbells together at the top."
    ],
    "safetyNotes": "Choose a load you can manage safely. Never compromise form for weight.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell flat bench press",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 10,
    "suitableGoals": [
      "muscle_growth",
      "strength"
    ],
    "exerciseVariations": [
      "Incline Dumbbell Press",
      "Floor Press"
    ],
    "alternativeExerciseIds": [
      "push_up",
      "incline_push_up"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "incline_push_up",
    "name": "Incline Push-Up",
    "slug": "incline-push-up",
    "description": "An elevated bodyweight press that gently reduces load on the upper body, ideal for beginners.",
    "primaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "secondaryMuscles": [
      "Triceps",
      "Core"
    ],
    "category": [
      "chest",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Place hands slightly wider than shoulder-width on an elevated bench, wall, or sturdy step.",
      "Step feet back until your body forms a straight line from heels to shoulders.",
      "Lower your chest to touch the edge of the elevated surface under control.",
      "Push back up smoothly to full arm extension."
    ],
    "formTips": [
      "Adjust height to decrease resistance.",
      "Maintain active core tension throughout."
    ],
    "safetyNotes": "Ensure the elevating surface is stable and will not slide.",
    "imageUrl": null,
    "imageAlt": "Illustration of incline push-up against elevated surface",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "general_fitness",
      "endurance"
    ],
    "exerciseVariations": [
      "Wall Push-Up",
      "Standard Push-Up"
    ],
    "alternativeExerciseIds": [
      "push_up"
    ],
    "supportedTrainingLevels": [
      "beginner"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "dumbbell_chest_fly",
    "name": "Dumbbell Chest Fly",
    "slug": "dumbbell-chest-fly",
    "description": "An isolation movement providing deep horizontal adduction and stretch across the pectoralis major.",
    "primaryMuscles": [
      "Chest"
    ],
    "secondaryMuscles": [
      "Shoulders"
    ],
    "category": [
      "chest",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Lie supine on a flat bench holding dumbbells with palms facing each other above your chest.",
      "Maintain a slight 10-15 degree bend in your elbows throughout.",
      "Lower dumbbells in a wide arc outward until you feel a comfortable chest stretch.",
      "Squeeze your chest muscles to bring dumbbells back up over the center line."
    ],
    "formTips": [
      "Do not drop elbows below shoulder plane to protect the rotator cuff."
    ],
    "safetyNotes": "Use light-to-moderate resistance. Never overload isolation movements.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell chest fly",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Cable Chest Fly",
      "Resistance Band Fly"
    ],
    "alternativeExerciseIds": [
      "push_up",
      "dumbbell_bench_press"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "chest_press_machine",
    "name": "Seated Chest Press Machine",
    "slug": "seated-chest-press-machine",
    "description": "Guided resistance movement that isolates chest musculature with fixed movement path security.",
    "primaryMuscles": [
      "Chest"
    ],
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "category": [
      "chest",
      "gym_equipment",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "gym_machine",
    "instructions": [
      "Adjust seat height so handles align with mid-chest level.",
      "Keep back flat against the pad and grip handles firmly.",
      "Smoothly press handles forward until arms are almost fully extended.",
      "Slowly return to start without allowing weight stack to crash."
    ],
    "formTips": [
      "Keep shoulders back and down throughout."
    ],
    "safetyNotes": "Set safety pin appropriately and start with minimal weight.",
    "imageUrl": null,
    "imageAlt": "Illustration of seated chest press machine",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Incline Machine Press"
    ],
    "alternativeExerciseIds": [
      "dumbbell_bench_press"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "dumbbell_bicep_curl",
    "name": "Standing Dumbbell Biceps Curl",
    "slug": "standing-dumbbell-biceps-curl",
    "description": "Fundamental arm exercise targeting elbow flexion and forearm supination.",
    "primaryMuscles": [
      "Biceps"
    ],
    "secondaryMuscles": [
      "Forearms"
    ],
    "category": [
      "arms_biceps",
      "dumbbell",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Stand upright with feet hip-width apart holding dumbbells at sides, palms facing inward.",
      "Pin elbows beside your ribcage throughout the repetition.",
      "Curl the dumbbells upward, supinating palms toward shoulders at peak contraction.",
      "Lower weights steadily under eccentric control."
    ],
    "formTips": [
      "Do not swing your torso or use momentum."
    ],
    "safetyNotes": "Choose a manageable load and stop if you experience elbow tendon discomfort.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell bicep curl",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Hammer Curl",
      "Incline Curl"
    ],
    "alternativeExerciseIds": [
      "hammer_curl",
      "resistance_band_curl"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e67e22",
    "active": true
  },
  {
    "id": "hammer_curl",
    "name": "Neutral Grip Hammer Curl",
    "slug": "neutral-grip-hammer-curl",
    "description": "Curl variation targeting the brachialis and brachioradialis for complete arm balance.",
    "primaryMuscles": [
      "Biceps"
    ],
    "secondaryMuscles": [
      "Forearms"
    ],
    "category": [
      "arms_biceps",
      "dumbbell"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Hold dumbbells with palms facing each other (neutral grip).",
      "Keeping elbows stationary, curl dumbbells upward toward shoulder level.",
      "Pause for a second at the top to emphasize contraction.",
      "Lower slowly back to start."
    ],
    "formTips": [
      "Keep wrists locked neutral."
    ],
    "safetyNotes": "Avoid leaning backward during heavy sets.",
    "imageUrl": null,
    "imageAlt": "Illustration of hammer curl",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Cross-Body Hammer Curl"
    ],
    "alternativeExerciseIds": [
      "dumbbell_bicep_curl"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e67e22",
    "active": true
  },
  {
    "id": "concentration_curl",
    "name": "Seated Concentration Curl",
    "slug": "seated-concentration-curl",
    "description": "Strict seated curl where the elbow is braced against inner thigh to eliminate all momentum.",
    "primaryMuscles": [
      "Biceps"
    ],
    "secondaryMuscles": [
      "Forearms"
    ],
    "category": [
      "arms_biceps",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Sit on a bench with legs open and lean slightly forward.",
      "Rest the back of your right elbow against the inner part of your right thigh.",
      "Curl the dumbbell up toward your chest with complete isolation.",
      "Lower all the way down under strict control."
    ],
    "formTips": [
      "Keep upper arm still."
    ],
    "safetyNotes": "Do not hyperextend at the bottom of the movement.",
    "imageUrl": null,
    "imageAlt": "Illustration of concentration curl",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Preacher Curl"
    ],
    "alternativeExerciseIds": [
      "dumbbell_bicep_curl"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e67e22",
    "active": true
  },
  {
    "id": "resistance_band_curl",
    "name": "Resistance Band Bicep Curl",
    "slug": "resistance-band-bicep-curl",
    "description": "Joint-friendly arm curl using continuous band tension without heavy joint load.",
    "primaryMuscles": [
      "Biceps"
    ],
    "secondaryMuscles": [
      "Forearms"
    ],
    "category": [
      "arms_biceps",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "resistance_band",
    "instructions": [
      "Stand on center of a resistance band with feet hip-width.",
      "Grasp handles with palms forward and elbows tight to body.",
      "Curl handles upward toward shoulders, resisting the elasticity.",
      "Slowly lower back down with complete control."
    ],
    "formTips": [
      "Focus on peak squeeze at top."
    ],
    "safetyNotes": "Inspect bands for tears before starting.",
    "imageUrl": null,
    "imageAlt": "Illustration of resistance band curl",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 12,
      "max": 16
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness",
      "endurance"
    ],
    "exerciseVariations": [
      "Single Arm Band Curl"
    ],
    "alternativeExerciseIds": [
      "dumbbell_bicep_curl"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e67e22",
    "active": true
  },
  {
    "id": "cable_bicep_curl",
    "name": "Cable Biceps Curl",
    "slug": "cable-biceps-curl",
    "description": "Cable pulley movement providing linear resistance curve throughout the full range of motion.",
    "primaryMuscles": [
      "Biceps"
    ],
    "secondaryMuscles": [
      "Forearms"
    ],
    "category": [
      "arms_biceps",
      "gym_equipment"
    ],
    "difficulty": "intermediate",
    "equipment": "cable_machine",
    "instructions": [
      "Attach a straight or EZ bar to low pulley on cable column.",
      "Stand upright holding bar with underhand grip.",
      "Curl the bar upward toward shoulders without swinging spine.",
      "Lower smoothly against constant cable pull."
    ],
    "formTips": [
      "Keep elbows tucked in."
    ],
    "safetyNotes": "Do not bend back at lumbar spine to initiate pull.",
    "imageUrl": null,
    "imageAlt": "Illustration of cable bicep curl",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "High Cable Curl"
    ],
    "alternativeExerciseIds": [
      "dumbbell_bicep_curl"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#e67e22",
    "active": true
  },
  {
    "id": "tricep_bench_dips",
    "name": "Bench Triceps Dips",
    "slug": "bench-triceps-dips",
    "description": "Bodyweight exercise leveraging a sturdy bench or chair to strengthen triceps and upper arms.",
    "primaryMuscles": [
      "Triceps"
    ],
    "secondaryMuscles": [
      "Shoulders",
      "Chest"
    ],
    "category": [
      "triceps",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "bench",
    "instructions": [
      "Sit on edge of bench, placing hands next to hips with fingers forward.",
      "Slide hips off bench with knees bent at 90 degrees and feet flat.",
      "Bend elbows to lower hips until upper arms are parallel to floor.",
      "Press through heels of hands to return to starting height."
    ],
    "formTips": [
      "Keep back close to the bench to minimize shoulder strain."
    ],
    "safetyNotes": "Do not drop below 90-degree elbow bend if you have history of shoulder impingement.",
    "imageUrl": null,
    "imageAlt": "Illustration of bench triceps dips",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "general_fitness",
      "endurance"
    ],
    "exerciseVariations": [
      "Straight-Leg Dips",
      "Chair Dips"
    ],
    "alternativeExerciseIds": [
      "tricep_overhead_extension",
      "tricep_kickback"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#f39c12",
    "active": true
  },
  {
    "id": "tricep_overhead_extension",
    "name": "Overhead Dumbbell Triceps Extension",
    "slug": "overhead-dumbbell-triceps-extension",
    "description": "Overhead movement loading the long head of the triceps in its lengthened position.",
    "primaryMuscles": [
      "Triceps"
    ],
    "secondaryMuscles": [
      "Core"
    ],
    "category": [
      "triceps",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Stand or sit upright holding a single dumbbell vertically with both hands overhead.",
      "Keep elbows pointing forward and close to head.",
      "Slowly lower the weight behind your head by bending at elbows.",
      "Extend arms fully overhead to contract triceps."
    ],
    "formTips": [
      "Keep ribs down and core braced to avoid hyperextending lumbar."
    ],
    "safetyNotes": "Secure dumbbell firmly with both palms under top bell weight plate.",
    "imageUrl": null,
    "imageAlt": "Illustration of overhead dumbbell triceps extension",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Single Arm Overhead Extension"
    ],
    "alternativeExerciseIds": [
      "tricep_bench_dips",
      "tricep_pushdown"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#f39c12",
    "active": true
  },
  {
    "id": "tricep_kickback",
    "name": "Dumbbell Triceps Kickback",
    "slug": "dumbbell-triceps-kickback",
    "description": "Hinged triceps isolation exercise emphasizing peak contraction in full elbow extension.",
    "primaryMuscles": [
      "Triceps"
    ],
    "secondaryMuscles": [
      "Shoulders"
    ],
    "category": [
      "triceps",
      "dumbbell"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Hinge forward at hips with spine straight, holding dumbbell in right hand.",
      "Raise upper arm parallel to torso, bending elbow at 90 degrees.",
      "Extend forearm straight back until arm is fully extended parallel to torso.",
      "Pause at peak extension then return forearm to 90 degrees."
    ],
    "formTips": [
      "Keep upper arm motionless, only move forearm."
    ],
    "safetyNotes": "Use lighter weight to avoid swinging.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell tricep kickback",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 12,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "general_fitness",
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Cable Kickback"
    ],
    "alternativeExerciseIds": [
      "tricep_bench_dips"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#f39c12",
    "active": true
  },
  {
    "id": "tricep_pushdown",
    "name": "Cable Triceps Rope Pushdown",
    "slug": "cable-triceps-rope-pushdown",
    "description": "High cable rope movement allowing wrist flaring at bottom for maximum tricep contraction.",
    "primaryMuscles": [
      "Triceps"
    ],
    "secondaryMuscles": [
      "Forearms"
    ],
    "category": [
      "triceps",
      "gym_equipment"
    ],
    "difficulty": "beginner",
    "equipment": "cable_machine",
    "instructions": [
      "Stand facing cable station with rope attachment pinned high.",
      "Grasp rope ends with elbows pinned beside ribs.",
      "Push rope downward, spreading ends apart at full extension.",
      "Return up to 90 degree elbow bend smoothly."
    ],
    "formTips": [
      "Do not shrug shoulders."
    ],
    "safetyNotes": "Keep torso still; do not bounce bodyweight into cable.",
    "imageUrl": null,
    "imageAlt": "Illustration of cable tricep rope pushdown",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Straight Bar Pushdown"
    ],
    "alternativeExerciseIds": [
      "tricep_overhead_extension"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#f39c12",
    "active": true
  },
  {
    "id": "dumbbell_overhead_press",
    "name": "Seated Dumbbell Shoulder Press",
    "slug": "seated-dumbbell-shoulder-press",
    "description": "Fundamental vertical pressing movement building deltoid strength and overhead capability.",
    "primaryMuscles": [
      "Shoulders"
    ],
    "secondaryMuscles": [
      "Triceps"
    ],
    "category": [
      "shoulders",
      "dumbbell",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Sit on an upright bench holding dumbbells at ear level, elbows at 90 degrees.",
      "Maintain upright posture with feet flat on the floor.",
      "Press dumbbells smoothly overhead until arms are extended but not locked.",
      "Lower weights under control back to starting ear height."
    ],
    "formTips": [
      "Avoid excessive lower back arching."
    ],
    "safetyNotes": "If you have shoulder impingement, use neutral grip (palms facing each other).",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell shoulder press",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 9,
    "suitableGoals": [
      "muscle_growth",
      "strength",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Standing Dumbbell Press",
      "Arnold Press"
    ],
    "alternativeExerciseIds": [
      "lateral_raise",
      "front_raise"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "lateral_raise",
    "name": "Dumbbell Lateral Raise",
    "slug": "dumbbell-lateral-raise",
    "description": "Isolation exercise targeting lateral deltoids for shoulder width and definition.",
    "primaryMuscles": [
      "Shoulders"
    ],
    "secondaryMuscles": [
      "Traps"
    ],
    "category": [
      "shoulders",
      "dumbbell"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Stand upright holding dumbbells at sides with slight forward lean.",
      "Maintain a subtle 10-degree bend in elbows.",
      "Raise dumbbells out to sides until arms are parallel to floor.",
      "Lower weights steadily down without resting at bottom."
    ],
    "formTips": [
      "Lead with elbows rather than wrists.",
      "Do not use hip bounce."
    ],
    "safetyNotes": "Keep weights modest to avoid neck tension.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell lateral raise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 12,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Cable Lateral Raise",
      "Seated Lateral Raise"
    ],
    "alternativeExerciseIds": [
      "dumbbell_overhead_press"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "front_raise",
    "name": "Dumbbell Front Raise",
    "slug": "dumbbell-front-raise",
    "description": "Isolation movement targeting anterior deltoids through controlled forward flexion.",
    "primaryMuscles": [
      "Shoulders"
    ],
    "secondaryMuscles": [
      "Chest"
    ],
    "category": [
      "shoulders",
      "dumbbell"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Stand with dumbbells resting on front of thighs, palms facing you.",
      "Keep arms extended with soft elbows.",
      "Raise dumbbells forward up to shoulder level.",
      "Lower under control to start."
    ],
    "formTips": [
      "Do not lean back as weights rise."
    ],
    "safetyNotes": "Stop if sharp anterior shoulder twinges occur.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell front raise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "general_fitness"
    ],
    "exerciseVariations": [
      "Plate Front Raise"
    ],
    "alternativeExerciseIds": [
      "lateral_raise"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "face_pull",
    "name": "Cable Face Pull",
    "slug": "cable-face-pull",
    "description": "Vital corrective exercise targeting rear deltoids, rhomboids, and rotator cuff stabilizers.",
    "primaryMuscles": [
      "Shoulders",
      "Back"
    ],
    "secondaryMuscles": [
      "Traps"
    ],
    "category": [
      "shoulders",
      "back",
      "gym_equipment"
    ],
    "difficulty": "intermediate",
    "equipment": "cable_machine",
    "instructions": [
      "Set cable pulley at eye level with rope attachment.",
      "Grip rope with thumbs facing backward.",
      "Step back, pull rope directly toward eye/nose level, pulling handles apart.",
      "External rotate shoulders at finish, holding for 1 second."
    ],
    "formTips": [
      "Focus on pulling with rear shoulders, not lower back."
    ],
    "safetyNotes": "Prioritize form and external rotation over high weight loads.",
    "imageUrl": null,
    "imageAlt": "Illustration of cable face pull",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 12,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "general_fitness",
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Band Face Pull"
    ],
    "alternativeExerciseIds": [
      "rear_delt_fly"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "rear_delt_fly",
    "name": "Bent-Over Dumbbell Rear Delt Fly",
    "slug": "bent-over-dumbbell-rear-delt-fly",
    "description": "Postural strengthening exercise addressing posterior shoulder heads and scapular retractors.",
    "primaryMuscles": [
      "Shoulders",
      "Back"
    ],
    "secondaryMuscles": [
      "Traps"
    ],
    "category": [
      "shoulders",
      "back",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Hinge at hips until torso is nearly parallel to ground, knees soft.",
      "Hold light dumbbells hanging beneath chest.",
      "Raise arms laterally out to sides, pinching rear deltoids together.",
      "Lower under steady control."
    ],
    "formTips": [
      "Keep neck neutral, do not look up."
    ],
    "safetyNotes": "Maintain flat spine throughout.",
    "imageUrl": null,
    "imageAlt": "Illustration of bent over rear delt fly",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 12,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "general_fitness",
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Reverse Pec Deck"
    ],
    "alternativeExerciseIds": [
      "face_pull"
    ],
    "supportedTrainingLevels": [
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "dumbbell_row",
    "name": "Single-Arm Dumbbell Row",
    "slug": "single-arm-dumbbell-row",
    "description": "Compound pulling exercise targeting latissimus dorsi, rhomboids, and bicep integrity.",
    "primaryMuscles": [
      "Back"
    ],
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "category": [
      "back",
      "dumbbell",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Place left knee and left hand on a bench for support with spine flat.",
      "Hold dumbbell in right hand hanging straight down.",
      "Pull dumbbell up toward right hip, driving elbow toward ceiling.",
      "Lower weight slowly until arm is fully extended."
    ],
    "formTips": [
      "Keep torso steady without rotating hips or chest."
    ],
    "safetyNotes": "Do not jerk weight up with momentum.",
    "imageUrl": null,
    "imageAlt": "Illustration of single-arm dumbbell row",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 9,
    "suitableGoals": [
      "muscle_growth",
      "strength",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Chest-Supported Row",
      "Barbell Row"
    ],
    "alternativeExerciseIds": [
      "lat_pulldown",
      "seated_cable_row"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "lat_pulldown",
    "name": "Cable Lat Pulldown",
    "slug": "cable-lat-pulldown",
    "description": "Classic vertical pull machine exercise developing back width and upper body pulling strength.",
    "primaryMuscles": [
      "Back"
    ],
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "category": [
      "back",
      "gym_equipment",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "gym_machine",
    "instructions": [
      "Sit comfortably at lat pulldown machine with thigh pads snug over knees.",
      "Grasp wide bar with overhand grip slightly wider than shoulders.",
      "Lean back very slightly (10 degrees) and pull bar down toward upper collarbone.",
      "Slowly allow bar to return to full overhead stretch."
    ],
    "formTips": [
      "Squeeze shoulder blades down and together."
    ],
    "safetyNotes": "Never pull bar behind neck as this compromises cervical spine and rotator cuff.",
    "imageUrl": null,
    "imageAlt": "Illustration of lat pulldown exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Close Grip Pulldown",
      "Neutral Grip Pulldown"
    ],
    "alternativeExerciseIds": [
      "dumbbell_row"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "seated_cable_row",
    "name": "Seated Cable Row",
    "slug": "seated-cable-row",
    "description": "Horizontal pull providing direct stimulus to rhomboids, middle trapezius, and lats.",
    "primaryMuscles": [
      "Back"
    ],
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "category": [
      "back",
      "gym_equipment"
    ],
    "difficulty": "intermediate",
    "equipment": "gym_machine",
    "instructions": [
      "Sit with knees slightly bent and feet secured on footplates.",
      "Grasp V-bar handle with neutral grip and maintain tall upright spine.",
      "Pull handle into abdomen by driving elbows backward.",
      "Extend arms forward under control to feel a mid-back stretch."
    ],
    "formTips": [
      "Avoid rocking back and forth from lower back."
    ],
    "safetyNotes": "Keep knees soft, never lock knee joints.",
    "imageUrl": null,
    "imageAlt": "Illustration of seated cable row",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "strength"
    ],
    "exerciseVariations": [
      "Wide Grip Cable Row"
    ],
    "alternativeExerciseIds": [
      "dumbbell_row"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "superman_hold",
    "name": "Prone Superman Extension",
    "slug": "prone-superman-extension",
    "description": "Bodyweight posterior chain exercise strengthening erector spinae, glutes, and upper back.",
    "primaryMuscles": [
      "Back"
    ],
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "category": [
      "back",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Lie face down on floor with arms extended overhead and legs straight.",
      "Simultaneously lift arms, chest, and thighs 2-4 inches off the floor.",
      "Hold the contraction briefly while breathing steadily.",
      "Gently lower back down to the floor."
    ],
    "formTips": [
      "Keep head neutral by gazing at the floor, do not crane neck."
    ],
    "safetyNotes": "Do not hyperextend aggressively if you have acute lower back sensitivity.",
    "imageUrl": null,
    "imageAlt": "Illustration of superman back extension",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness",
      "flexibility"
    ],
    "exerciseVariations": [
      "Alternating Bird Dog"
    ],
    "alternativeExerciseIds": [
      "dumbbell_row"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "bird_dog",
    "name": "Quadruped Bird-Dog",
    "slug": "quadruped-bird-dog",
    "description": "Rehabilitation-grade spinal stability movement reinforcing diagonal core and posterior balance.",
    "primaryMuscles": [
      "Back",
      "Core"
    ],
    "secondaryMuscles": [
      "Glutes",
      "Shoulders"
    ],
    "category": [
      "back",
      "abs_core",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Begin on all fours with hands under shoulders and knees under hips.",
      "Simultaneously reach right arm forward and left leg straight back.",
      "Hold for 2 seconds with flat back and hips level with floor.",
      "Return to starting position and switch to opposite diagonal."
    ],
    "formTips": [
      "Imagine balancing a cup of water on your lower back."
    ],
    "safetyNotes": "Perform deliberately with complete balance.",
    "imageUrl": null,
    "imageAlt": "Illustration of bird dog exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness",
      "flexibility"
    ],
    "exerciseVariations": [
      "Bird Dog with Band"
    ],
    "alternativeExerciseIds": [
      "superman_hold"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "forearm_plank",
    "name": "Forearm Plank Hold",
    "slug": "forearm-plank-hold",
    "description": "Static isometric pillar strengthening rectus abdominis, transversus abdominis, and spinal stabilizers. Note: Core exercises strengthen muscle but do not selectively burn belly fat; overall fat loss relies on broader energy balance.",
    "primaryMuscles": [
      "Core"
    ],
    "secondaryMuscles": [
      "Shoulders",
      "Glutes"
    ],
    "category": [
      "abs_core",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Rest forearms on ground with elbows directly under shoulders.",
      "Extend legs back on toes, creating a rigid straight line from head to heels.",
      "Engage glutes and pull navel gently inward toward spine.",
      "Hold this position while breathing rhythmically."
    ],
    "formTips": [
      "Do not let lower back sag or hips hike upwards."
    ],
    "safetyNotes": "Release hold if you feel pressure in lower back.",
    "imageUrl": null,
    "imageAlt": "Illustration of forearm plank hold",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": null,
    "durationSeconds": 30,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness",
      "endurance"
    ],
    "exerciseVariations": [
      "Side Plank",
      "Knee Plank"
    ],
    "alternativeExerciseIds": [
      "deadbug",
      "side_plank"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#1abc9c",
    "active": true
  },
  {
    "id": "deadbug",
    "name": "Dead Bug Contralateral Movement",
    "slug": "dead-bug-contralateral-movement",
    "description": "Supine anti-extension exercise teaching lumbo-pelvic control and deep core engagement.",
    "primaryMuscles": [
      "Core"
    ],
    "secondaryMuscles": [
      "Hips"
    ],
    "category": [
      "abs_core",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Lie on back with arms pointing straight up and knees bent at 90 degrees above hips.",
      "Flatten lower back firmly into the floor.",
      "Slowly extend right arm overhead while extending left leg straight out just above floor.",
      "Return to center and repeat on opposite arm and leg."
    ],
    "formTips": [
      "Maintain lower back contact with floor continuously."
    ],
    "safetyNotes": "Shorten leg extension if lower back lifts.",
    "imageUrl": null,
    "imageAlt": "Illustration of dead bug exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness"
    ],
    "exerciseVariations": [
      "Deadbug with Stability Ball"
    ],
    "alternativeExerciseIds": [
      "forearm_plank"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#1abc9c",
    "active": true
  },
  {
    "id": "side_plank",
    "name": "Side Plank Oblique Hold",
    "slug": "side-plank-oblique-hold",
    "description": "Lateral core endurance exercise building stability in obliques, quadratus lumborum, and hip abductors.",
    "primaryMuscles": [
      "Core"
    ],
    "secondaryMuscles": [
      "Glutes",
      "Shoulders"
    ],
    "category": [
      "abs_core",
      "bodyweight"
    ],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Lie on right side with legs straight and feet stacked.",
      "Prop upper body up on right forearm with elbow directly below shoulder.",
      "Elevate hips until body forms a straight diagonal line.",
      "Hold position with steady respiration, then switch sides."
    ],
    "formTips": [
      "Do not allow top hip to rotate forward or drop."
    ],
    "safetyNotes": "Perform from knees if balance or shoulder stability is compromised.",
    "imageUrl": null,
    "imageAlt": "Illustration of side plank",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": null,
    "durationSeconds": 25,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness",
      "endurance"
    ],
    "exerciseVariations": [
      "Knee Side Plank"
    ],
    "alternativeExerciseIds": [
      "forearm_plank"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#1abc9c",
    "active": true
  },
  {
    "id": "bicycle_crunch",
    "name": "Controlled Bicycle Crunch",
    "slug": "controlled-bicycle-crunch",
    "description": "Dynamic rotational core exercise targeting rectus abdominis and internal/external obliques.",
    "primaryMuscles": [
      "Core"
    ],
    "secondaryMuscles": [
      "Hips"
    ],
    "category": [
      "abs_core",
      "bodyweight"
    ],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Lie on back with hands lightly touching sides of head and knees lifted at 90 degrees.",
      "Rotate torso to bring right elbow toward incoming left knee while right leg extends straight.",
      "Pause for 1 second at full rotation.",
      "Alternate fluidly to bring left elbow toward right knee."
    ],
    "formTips": [
      "Do not pull or yank on your neck; lead with your armpit and shoulder."
    ],
    "safetyNotes": "Prioritize slow deliberate rotation over frantic speed.",
    "imageUrl": null,
    "imageAlt": "Illustration of bicycle crunch",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 12,
      "max": 16
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "general_fitness",
      "endurance"
    ],
    "exerciseVariations": [
      "Slow Motion Bicycle"
    ],
    "alternativeExerciseIds": [
      "deadbug"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#1abc9c",
    "active": true
  },
  {
    "id": "hanging_knee_raise",
    "name": "Captain Chair Hanging Knee Raise",
    "slug": "captain-chair-hanging-knee-raise",
    "description": "Vertical core movement engaging lower abdominal fibers and hip flexors.",
    "primaryMuscles": [
      "Core"
    ],
    "secondaryMuscles": [
      "Forearms"
    ],
    "category": [
      "abs_core",
      "gym_equipment"
    ],
    "difficulty": "intermediate",
    "equipment": "gym_machine",
    "instructions": [
      "Step into captain chair with forearms padded and back flat against backrest.",
      "Allow legs to hang straight down.",
      "Flex hips and draw knees smoothly up toward chest level.",
      "Slowly lower legs back down without swinging body."
    ],
    "formTips": [
      "Roll pelvis upward slightly at top for maximum abdominal contraction."
    ],
    "safetyNotes": "Avoid swinging momentum.",
    "imageUrl": null,
    "imageAlt": "Illustration of hanging knee raise on machine",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Hanging Leg Raise"
    ],
    "alternativeExerciseIds": [
      "deadbug",
      "forearm_plank"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#1abc9c",
    "active": true
  },
  {
    "id": "mountain_climber",
    "name": "Dynamic Mountain Climber",
    "slug": "dynamic-mountain-climber",
    "description": "High plank cardiovascular and core hybrid that elevates heart rate while conditioning the abdominal wall.",
    "primaryMuscles": [
      "Core"
    ],
    "secondaryMuscles": [
      "Shoulders",
      "Cardiovascular"
    ],
    "category": [
      "abs_core",
      "cardio",
      "bodyweight"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Begin in high plank position with hands directly under shoulders.",
      "Drive right knee forward toward chest without lifting hips high.",
      "Quickly step right foot back while driving left knee forward.",
      "Maintain an even cadence while stabilizing core."
    ],
    "formTips": [
      "Keep shoulders stacked directly over wrists."
    ],
    "safetyNotes": "Begin slowly to build wrist and shoulder stamina.",
    "imageUrl": null,
    "imageAlt": "Illustration of mountain climber exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": null,
    "durationSeconds": 30,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "weight_loss",
      "endurance",
      "cardio"
    ],
    "exerciseVariations": [
      "Cross-Body Mountain Climber"
    ],
    "alternativeExerciseIds": [
      "forearm_plank"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#1abc9c",
    "active": true
  },
  {
    "id": "bodyweight_squat",
    "name": "Bodyweight Air Squat",
    "slug": "bodyweight-air-squat",
    "description": "Foundational lower body compound movement recruiting quadriceps, hamstrings, and gluteal complexes.",
    "primaryMuscles": [
      "Quadriceps",
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Calves",
      "Core"
    ],
    "category": [
      "legs_quadriceps",
      "glutes",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Stand with feet shoulder-width apart, toes turned outward 10-15 degrees.",
      "Hinge hips back and bend knees, lowering hips as if sitting into an invisible chair.",
      "Descend until thighs are parallel to ground or to comfortable depth.",
      "Drive through mid-foot and heels to return to tall standing posture."
    ],
    "formTips": [
      "Keep chest lifted and knees tracking in line with toes."
    ],
    "safetyNotes": "Never allow knees to collapse inward.",
    "imageUrl": null,
    "imageAlt": "Illustration of bodyweight squat",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 4
    },
    "repRange": {
      "min": 10,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "general_fitness",
      "endurance",
      "strength"
    ],
    "exerciseVariations": [
      "Box Squat",
      "Goblet Squat"
    ],
    "alternativeExerciseIds": [
      "goblet_squat",
      "walking_lunge"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#2ecc71",
    "active": true
  },
  {
    "id": "goblet_squat",
    "name": "Dumbbell Goblet Squat",
    "slug": "dumbbell-goblet-squat",
    "description": "Front-loaded squat variation reinforcing upright torso mechanics and deep quad activation.",
    "primaryMuscles": [
      "Quadriceps",
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Core"
    ],
    "category": [
      "legs_quadriceps",
      "glutes",
      "dumbbell"
    ],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Cup a single dumbbell vertically against your sternum with both hands.",
      "Stand with feet slightly wider than shoulder width.",
      "Squat deeply between your hips while keeping elbows pointed down inside knees.",
      "Drive forcefully out of the bottom position to stand tall."
    ],
    "formTips": [
      "Keep weight in close contact with chest."
    ],
    "safetyNotes": "Choose a load that allows full depth with heel contact.",
    "imageUrl": null,
    "imageAlt": "Illustration of goblet squat with dumbbell",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 9,
    "suitableGoals": [
      "muscle_growth",
      "strength"
    ],
    "exerciseVariations": [
      "Kettlebell Goblet Squat"
    ],
    "alternativeExerciseIds": [
      "bodyweight_squat",
      "leg_press"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#2ecc71",
    "active": true
  },
  {
    "id": "walking_lunge",
    "name": "Bodyweight Walking Lunge",
    "slug": "bodyweight-walking-lunge",
    "description": "Unilateral leg conditioning exercise challenging balance, quad strength, and hip extension.",
    "primaryMuscles": [
      "Quadriceps",
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Calves",
      "Core"
    ],
    "category": [
      "legs_quadriceps",
      "glutes",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Take a large, controlled step forward with right leg.",
      "Lower hips until both front and back knees form 90-degree angles.",
      "Push off front right foot and step left leg directly into next forward lunge.",
      "Maintain steady rhythmic pace with hands on hips."
    ],
    "formTips": [
      "Keep torso tall and perpendicular to floor."
    ],
    "safetyNotes": "Avoid slamming back knee into floor; keep it hovering 1 inch above.",
    "imageUrl": null,
    "imageAlt": "Illustration of walking lunge",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "general_fitness",
      "endurance",
      "weight_loss"
    ],
    "exerciseVariations": [
      "Reverse Lunge",
      "Dumbbell Walking Lunge"
    ],
    "alternativeExerciseIds": [
      "bodyweight_squat"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#2ecc71",
    "active": true
  },
  {
    "id": "leg_press",
    "name": "45-Degree Machine Leg Press",
    "slug": "45-degree-machine-leg-press",
    "description": "Heavy compound machine exercise providing high quad loading with supported lumbar spine.",
    "primaryMuscles": [
      "Quadriceps",
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "category": [
      "legs_quadriceps",
      "gym_equipment"
    ],
    "difficulty": "intermediate",
    "equipment": "gym_machine",
    "instructions": [
      "Sit comfortably on sled seat with back flush against pad.",
      "Place feet shoulder-width on footplate.",
      "Release safety handles and lower sled until knees bend at 90 degrees.",
      "Press sled back up smoothly without locking knees at apex."
    ],
    "formTips": [
      "Do not allow lower back or tailbone to round off seat."
    ],
    "safetyNotes": "Never fully lock out knee joints under heavy load.",
    "imageUrl": null,
    "imageAlt": "Illustration of 45-degree leg press machine",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 90,
    "estimatedDurationMinutes": 10,
    "suitableGoals": [
      "muscle_growth",
      "strength"
    ],
    "exerciseVariations": [
      "Single Leg Press"
    ],
    "alternativeExerciseIds": [
      "goblet_squat"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#2ecc71",
    "active": true
  },
  {
    "id": "leg_extension",
    "name": "Seated Leg Extension Machine",
    "slug": "seated-leg-extension-machine",
    "description": "Open chain quadriceps isolation machine exercise focusing strictly on knee extension.",
    "primaryMuscles": [
      "Quadriceps"
    ],
    "secondaryMuscles": [],
    "category": [
      "legs_quadriceps",
      "gym_equipment"
    ],
    "difficulty": "beginner",
    "equipment": "gym_machine",
    "instructions": [
      "Adjust back pad so knees line up with pivot point of machine.",
      "Hook shins behind lower roller pad.",
      "Extend legs upward until legs are straight, squeezing quadriceps.",
      "Lower weight stack slowly back down."
    ],
    "formTips": [
      "Keep back firmly against seat."
    ],
    "safetyNotes": "Avoid ballistic kicking or hyperextending knees.",
    "imageUrl": null,
    "imageAlt": "Illustration of seated leg extension machine",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Single Leg Extension"
    ],
    "alternativeExerciseIds": [
      "bodyweight_squat"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#2ecc71",
    "active": true
  },
  {
    "id": "dumbbell_romanian_deadlift",
    "name": "Dumbbell Romanian Deadlift (RDL)",
    "slug": "dumbbell-romanian-deadlift",
    "description": "Hip-hinge pattern loading the posterior chain, producing deep eccentric hamstring tension.",
    "primaryMuscles": [
      "Hamstrings",
      "Glutes"
    ],
    "secondaryMuscles": [
      "Lower Back",
      "Core"
    ],
    "category": [
      "hamstrings",
      "glutes",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Stand holding dumbbells at thighs with slight knee softness (15 degrees).",
      "Hinge backward at hips, sliding dumbbells down along shins.",
      "Stop when you feel full hamstring stretch (usually mid-shin level).",
      "Drive hips forward and contract glutes to return to standing."
    ],
    "formTips": [
      "Keep spine rigid and neutral throughout; do not round back."
    ],
    "safetyNotes": "Movement is a hip hinge, not a knee squat.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell Romanian deadlift",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 9,
    "suitableGoals": [
      "muscle_growth",
      "strength",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Single Leg RDL",
      "Barbell RDL"
    ],
    "alternativeExerciseIds": [
      "glute_bridge",
      "lying_leg_curl"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#27ae60",
    "active": true
  },
  {
    "id": "lying_leg_curl",
    "name": "Lying Hamstring Leg Curl",
    "slug": "lying-hamstring-leg-curl",
    "description": "Isolation machine movement training knee flexion against constant resistance.",
    "primaryMuscles": [
      "Hamstrings"
    ],
    "secondaryMuscles": [
      "Calves"
    ],
    "category": [
      "hamstrings",
      "gym_equipment"
    ],
    "difficulty": "beginner",
    "equipment": "gym_machine",
    "instructions": [
      "Lie face down on machine with roller pad resting just below calves.",
      "Grip side handles and press hips down into pad.",
      "Curl heels toward buttocks through full range of motion.",
      "Slowly extend legs back to starting point."
    ],
    "formTips": [
      "Do not allow hips to lift off bench as knees curl."
    ],
    "safetyNotes": "Choose a weight that permits smooth execution.",
    "imageUrl": null,
    "imageAlt": "Illustration of lying hamstring curl machine",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 14
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Seated Hamstring Curl"
    ],
    "alternativeExerciseIds": [
      "dumbbell_romanian_deadlift"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#27ae60",
    "active": true
  },
  {
    "id": "single_leg_rdl",
    "name": "Bodyweight Single-Leg Romanian Deadlift",
    "slug": "bodyweight-single-leg-romanian-deadlift",
    "description": "Unilateral hinge developing ankle balance, hamstring stretch tolerance, and glute stabilization.",
    "primaryMuscles": [
      "Hamstrings",
      "Glutes"
    ],
    "secondaryMuscles": [
      "Calves",
      "Core"
    ],
    "category": [
      "hamstrings",
      "glutes",
      "bodyweight"
    ],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Stand balancing on right leg with left foot slightly lifted.",
      "Hinge at hips, reaching left leg back while extending right hand toward floor.",
      "Maintain level hips with floor.",
      "Engage right glute and hamstring to stand back up."
    ],
    "formTips": [
      "Keep standing knee softly bent."
    ],
    "safetyNotes": "Lightly touch wall if balance is unsteady.",
    "imageUrl": null,
    "imageAlt": "Illustration of single leg Romanian deadlift",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "general_fitness",
      "flexibility"
    ],
    "exerciseVariations": [
      "Dumbbell Single Leg RDL"
    ],
    "alternativeExerciseIds": [
      "dumbbell_romanian_deadlift"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#27ae60",
    "active": true
  },
  {
    "id": "good_morning_band",
    "name": "Resistance Band Good Morning",
    "slug": "resistance-band-good-morning",
    "description": "Hip hinge movement loading hamstrings and spinal erectors with progressive band tension.",
    "primaryMuscles": [
      "Hamstrings"
    ],
    "secondaryMuscles": [
      "Glutes",
      "Lower Back"
    ],
    "category": [
      "hamstrings",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "resistance_band",
    "instructions": [
      "Stand on center of loop band with feet shoulder-width.",
      "Place top loop around upper back/neck, holding with hands.",
      "Hinge at hips, sending glutes back with flat spine.",
      "Drive hips forward to return to standing."
    ],
    "formTips": [
      "Keep spine locked straight."
    ],
    "safetyNotes": "Do not bend lower back.",
    "imageUrl": null,
    "imageAlt": "Illustration of resistance band good morning",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness"
    ],
    "exerciseVariations": [
      "Barbell Good Morning"
    ],
    "alternativeExerciseIds": [
      "dumbbell_romanian_deadlift"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#27ae60",
    "active": true
  },
  {
    "id": "glute_bridge",
    "name": "Floor Glute Bridge",
    "slug": "floor-glute-bridge",
    "description": "Foundational glute activation movement isolating hip extension with zero spinal axial loading.",
    "primaryMuscles": [
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Core"
    ],
    "category": [
      "glutes",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Lie on back with knees bent at 90 degrees and feet flat, hip-width apart.",
      "Drive through your heels to elevate hips toward ceiling.",
      "Squeeze glutes firmly at peak elevation for 1-2 seconds.",
      "Lower hips slowly without completely resting on floor between reps."
    ],
    "formTips": [
      "Avoid overarching lower back; keep ribs drawn down."
    ],
    "safetyNotes": "Keep movement centered in glutes, not lower back.",
    "imageUrl": null,
    "imageAlt": "Illustration of floor glute bridge",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 4
    },
    "repRange": {
      "min": 12,
      "max": 20
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 7,
    "suitableGoals": [
      "general_fitness",
      "endurance",
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Single Leg Glute Bridge",
      "Banded Glute Bridge"
    ],
    "alternativeExerciseIds": [
      "hip_thrust",
      "bodyweight_squat"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "women",
      "men"
    ],
    "muscleGroupColor": "#e91e63",
    "active": true
  },
  {
    "id": "hip_thrust",
    "name": "Dumbbell Bench Hip Thrust",
    "slug": "dumbbell-bench-hip-thrust",
    "description": "Premier glute hypertrophy movement providing maximum horizontal hip extension torque.",
    "primaryMuscles": [
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Quadriceps"
    ],
    "category": [
      "glutes",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "bench",
    "instructions": [
      "Rest upper back across bench with knees bent and feet flat on floor.",
      "Place dumbbell securely across hip crease with hands holding it.",
      "Lower hips toward floor, then drive forcefully through heels upward.",
      "Lock out hips at horizontal height with strong glute squeeze."
    ],
    "formTips": [
      "Keep chin tucked looking forward throughout movement."
    ],
    "safetyNotes": "Pad dumbbell if uncomfortable on pelvic bones.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell hip thrust on bench",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 9,
    "suitableGoals": [
      "muscle_growth",
      "strength"
    ],
    "exerciseVariations": [
      "Barbell Hip Thrust",
      "Banded Hip Thrust"
    ],
    "alternativeExerciseIds": [
      "glute_bridge"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "women",
      "men"
    ],
    "muscleGroupColor": "#e91e63",
    "active": true
  },
  {
    "id": "clamshell",
    "name": "Side-Lying Clamshell",
    "slug": "side-lying-clamshell",
    "description": "Targeted gluteus medius strengthening drill promoting pelvic alignment and knee stability.",
    "primaryMuscles": [
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hips"
    ],
    "category": [
      "glutes",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Lie on side with head resting on arm, knees bent at 90 degrees and feet stacked.",
      "Keeping heels together, rotate top knee upward toward ceiling.",
      "Pause at top without letting hips roll backward.",
      "Lower knee smoothly and repeat before switching sides."
    ],
    "formTips": [
      "Stack hips vertically to avoid cheating."
    ],
    "safetyNotes": "Keep movement slow and controlled.",
    "imageUrl": null,
    "imageAlt": "Illustration of side lying clamshell",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 12,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness"
    ],
    "exerciseVariations": [
      "Banded Clamshell"
    ],
    "alternativeExerciseIds": [
      "glute_bridge"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "women",
      "men"
    ],
    "muscleGroupColor": "#e91e63",
    "active": true
  },
  {
    "id": "cable_glute_kickback",
    "name": "Cable Glute Kickback",
    "slug": "cable-glute-kickback",
    "description": "Standing cable movement isolating gluteus maximus through direct posterior hip extension.",
    "primaryMuscles": [
      "Glutes"
    ],
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "category": [
      "glutes",
      "gym_equipment"
    ],
    "difficulty": "intermediate",
    "equipment": "cable_machine",
    "instructions": [
      "Fasten ankle cuff to low pulley on cable station.",
      "Face machine, lightly holding support bar with torso hinged forward.",
      "Drive cuffed heel backward and slightly outward into full glute contraction.",
      "Return foot forward under control without touching floor."
    ],
    "formTips": [
      "Do not arch lumbar spine to generate range."
    ],
    "safetyNotes": "Start with light resistance.",
    "imageUrl": null,
    "imageAlt": "Illustration of cable glute kickback",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 10,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Band Kickback"
    ],
    "alternativeExerciseIds": [
      "glute_bridge",
      "hip_thrust"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "women",
      "men"
    ],
    "muscleGroupColor": "#e91e63",
    "active": true
  },
  {
    "id": "bulgarian_split_squat",
    "name": "Dumbbell Bulgarian Split Squat",
    "slug": "dumbbell-bulgarian-split-squat",
    "description": "Challenging rear-foot elevated split squat placing immense demand on front leg glutes and quads.",
    "primaryMuscles": [
      "Glutes",
      "Quadriceps"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Calves",
      "Core"
    ],
    "category": [
      "glutes",
      "legs_quadriceps",
      "dumbbell"
    ],
    "difficulty": "advanced",
    "equipment": "bench",
    "instructions": [
      "Stand facing away from bench, placing top of rear foot flat on bench surface.",
      "Position front foot roughly 2-3 feet ahead.",
      "Lower hips straight down until front thigh is parallel to ground.",
      "Press through front heel to return upward."
    ],
    "formTips": [
      "Keep torso slightly hinged forward to maximize glute recruitment."
    ],
    "safetyNotes": "Master with bodyweight before adding dumbbells.",
    "imageUrl": null,
    "imageAlt": "Illustration of Bulgarian split squat",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 9,
    "suitableGoals": [
      "muscle_growth",
      "strength"
    ],
    "exerciseVariations": [
      "Bodyweight Bulgarian Split Squat"
    ],
    "alternativeExerciseIds": [
      "walking_lunge"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "women",
      "men"
    ],
    "muscleGroupColor": "#e91e63",
    "active": true
  },
  {
    "id": "burpee",
    "name": "Full-Body Burpee",
    "slug": "full-body-burpee",
    "description": "Dynamic conditioning exercise that recruits nearly all major muscle groups and tests cardiovascular stamina.",
    "primaryMuscles": [
      "Full Body"
    ],
    "secondaryMuscles": [
      "Chest",
      "Quadriceps",
      "Core",
      "Cardiovascular"
    ],
    "category": [
      "full_body",
      "cardio",
      "bodyweight"
    ],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "From standing, drop into squat and place hands flat on floor.",
      "Kick feet back into high plank position.",
      "Perform optional push-up, then jump feet back toward hands.",
      "Explode upward into vertical jump with hands reaching overhead."
    ],
    "formTips": [
      "Land softly on mid-foot with knees bent."
    ],
    "safetyNotes": "Step back instead of jumping if you need a low-impact variation.",
    "imageUrl": null,
    "imageAlt": "Illustration of burpee movement",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "weight_loss",
      "endurance",
      "cardio"
    ],
    "exerciseVariations": [
      "Step-Back Burpee",
      "No-Pushup Burpee"
    ],
    "alternativeExerciseIds": [
      "jumping_jack",
      "mountain_climber"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#ff9800",
    "active": true
  },
  {
    "id": "kettlebell_swing",
    "name": "Kettlebell Russian Swing",
    "slug": "kettlebell-russian-swing",
    "description": "Ballistic hip hinge developing explosive posterior chain power, core bracing, and conditioning.",
    "primaryMuscles": [
      "Full Body"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Glutes",
      "Core",
      "Shoulders"
    ],
    "category": [
      "full_body",
      "cardio",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "kettlebell",
    "instructions": [
      "Stand with feet wider than shoulder-width, kettlebell on floor in front.",
      "Hinge hips and pull bell back between thighs.",
      "Snap hips forward violently, allowing bell to swing up to chest height.",
      "Guide bell back into hinge and repeat seamlessly."
    ],
    "formTips": [
      "Power originates from hips and glutes, not arm lifting."
    ],
    "safetyNotes": "Never squat the swing or round lower back.",
    "imageUrl": null,
    "imageAlt": "Illustration of kettlebell swing",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": {
      "min": 12,
      "max": 15
    },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": [
      "weight_loss",
      "strength",
      "endurance"
    ],
    "exerciseVariations": [
      "Single Arm Swing"
    ],
    "alternativeExerciseIds": [
      "burpee"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#ff9800",
    "active": true
  },
  {
    "id": "dumbbell_thruster",
    "name": "Dumbbell Thruster (Squat to Press)",
    "slug": "dumbbell-thruster",
    "description": "High metabolic demand compound movement combining deep squat with overhead press.",
    "primaryMuscles": [
      "Full Body"
    ],
    "secondaryMuscles": [
      "Quadriceps",
      "Shoulders",
      "Triceps",
      "Core"
    ],
    "category": [
      "full_body",
      "dumbbell"
    ],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Hold dumbbells at shoulder height while standing shoulder-width apart.",
      "Squat down to parallel depth.",
      "Drive powerfully out of squat and transfer momentum directly into overhead press.",
      "Lower dumbbells back to shoulders as you descend into the next squat."
    ],
    "formTips": [
      "Keep movement seamless and connected."
    ],
    "safetyNotes": "Do not attempt if experiencing knee or shoulder pain.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell thruster",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 9,
    "suitableGoals": [
      "weight_loss",
      "muscle_growth",
      "endurance"
    ],
    "exerciseVariations": [
      "Single Arm Thruster"
    ],
    "alternativeExerciseIds": [
      "bodyweight_squat",
      "dumbbell_overhead_press"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#ff9800",
    "active": true
  },
  {
    "id": "bear_crawl",
    "name": "Quadruped Bear Crawl",
    "slug": "quadruped-bear-crawl",
    "description": "Functional ground-based crawling pattern promoting cross-body coordination and shoulder stability.",
    "primaryMuscles": [
      "Full Body"
    ],
    "secondaryMuscles": [
      "Core",
      "Shoulders",
      "Quadriceps"
    ],
    "category": [
      "full_body",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Start on hands and knees with knees hovering 1-2 inches above ground.",
      "Crawl forward by moving opposite hand and foot simultaneously.",
      "Keep back flat and hips down at ribcage level.",
      "Crawl forward 10 paces, then reverse backward."
    ],
    "formTips": [
      "Avoid swaying hips excessively."
    ],
    "safetyNotes": "Stop if wrist pressure builds up.",
    "imageUrl": null,
    "imageAlt": "Illustration of bear crawl exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": null,
    "durationSeconds": 30,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "general_fitness",
      "endurance"
    ],
    "exerciseVariations": [
      "Lateral Bear Crawl"
    ],
    "alternativeExerciseIds": [
      "forearm_plank"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#ff9800",
    "active": true
  },
  {
    "id": "clean_and_press",
    "name": "Dumbbell Clean and Press",
    "slug": "dumbbell-clean-and-press",
    "description": "Ground-to-overhead dynamic lift developing whole-body coordination, power, and grip endurance.",
    "primaryMuscles": [
      "Full Body"
    ],
    "secondaryMuscles": [
      "Back",
      "Shoulders",
      "Hamstrings",
      "Glutes"
    ],
    "category": [
      "full_body",
      "dumbbell"
    ],
    "difficulty": "advanced",
    "equipment": "dumbbells",
    "instructions": [
      "Stand with dumbbells in hands hanging just below knees in hip hinge.",
      "Explosively extend hips and shrug shoulders, pulling dumbbells up to shoulders.",
      "Catch dumbbells at shoulder height in quarter squat.",
      "Press dumbbells overhead, then return weights down under control."
    ],
    "formTips": [
      "Keep weights close to body during pull."
    ],
    "safetyNotes": "Requires sound form and shoulder mobility.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell clean and press",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": {
      "min": 6,
      "max": 10
    },
    "durationSeconds": null,
    "restSeconds": 90,
    "estimatedDurationMinutes": 10,
    "suitableGoals": [
      "strength",
      "muscle_growth"
    ],
    "exerciseVariations": [
      "Kettlebell Clean and Press"
    ],
    "alternativeExerciseIds": [
      "dumbbell_thruster"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#ff9800",
    "active": true
  },
  {
    "id": "jumping_jack",
    "name": "Classic Jumping Jacks",
    "slug": "classic-jumping-jacks",
    "description": "Accessible whole-body calisthenic movement elevating resting metabolic rate and heart rate.",
    "primaryMuscles": [
      "Cardiovascular"
    ],
    "secondaryMuscles": [
      "Calves",
      "Shoulders"
    ],
    "category": [
      "cardio",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Stand upright with feet together and arms at sides.",
      "Jump feet out to shoulder width while clapping hands overhead.",
      "Quickly jump feet back together as hands return to sides.",
      "Continue at a brisk, sustained rhythm."
    ],
    "formTips": [
      "Land gently on balls of feet."
    ],
    "safetyNotes": "Step out laterally one foot at a time for low-impact alternative.",
    "imageUrl": null,
    "imageAlt": "Illustration of jumping jacks",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": null,
    "durationSeconds": 45,
    "restSeconds": 30,
    "estimatedDurationMinutes": 5,
    "suitableGoals": [
      "cardio",
      "weight_loss",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Step Jacks"
    ],
    "alternativeExerciseIds": [
      "high_knees"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "high_knees",
    "name": "Stationary High Knees",
    "slug": "stationary-high-knees",
    "description": "Cardiovascular sprint drill developing hip flexor power and foot speed.",
    "primaryMuscles": [
      "Cardiovascular"
    ],
    "secondaryMuscles": [
      "Quadriceps",
      "Calves",
      "Core"
    ],
    "category": [
      "cardio",
      "bodyweight"
    ],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Stand tall with feet hip-width apart.",
      "Run in place, driving knees up toward hip height with each stride.",
      "Pump arms rhythmically in coordination with leg drive.",
      "Maintain an upright posture and light ground contact."
    ],
    "formTips": [
      "Avoid leaning backward."
    ],
    "safetyNotes": "March in place if high-impact jumping is contraindicated.",
    "imageUrl": null,
    "imageAlt": "Illustration of high knees exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": null,
    "durationSeconds": 30,
    "restSeconds": 30,
    "estimatedDurationMinutes": 5,
    "suitableGoals": [
      "cardio",
      "weight_loss"
    ],
    "exerciseVariations": [
      "Marching High Knees"
    ],
    "alternativeExerciseIds": [
      "jumping_jack"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "jump_rope_simulated",
    "name": "Shadow / Simulated Jump Rope",
    "slug": "shadow-simulated-jump-rope",
    "description": "Rhythmic aerobic exercise improving calf elasticity, timing, and cardiovascular output.",
    "primaryMuscles": [
      "Cardiovascular"
    ],
    "secondaryMuscles": [
      "Calves",
      "Forearms",
      "Core"
    ],
    "category": [
      "cardio",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Stand on balls of feet with elbows tucked close to ribcage.",
      "Rotate wrists as if holding an invisible jump rope.",
      "Perform light, rhythmic hops 1-2 inches off the floor.",
      "Breathe smoothly and maintain consistent cadence."
    ],
    "formTips": [
      "Keep knees slightly springy, never stiff."
    ],
    "safetyNotes": "Wear supportive shoes on hard flooring.",
    "imageUrl": null,
    "imageAlt": "Illustration of simulated jump rope",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 4
    },
    "repRange": null,
    "durationSeconds": 45,
    "restSeconds": 30,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "cardio",
      "weight_loss"
    ],
    "exerciseVariations": [
      "Real Jump Rope"
    ],
    "alternativeExerciseIds": [
      "jumping_jack"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "skater_jumps",
    "name": "Lateral Skater Hops",
    "slug": "lateral-skater-hops",
    "description": "Side-to-side plyometric drill developing lateral power, glute stabilization, and aerobic conditioning.",
    "primaryMuscles": [
      "Cardiovascular",
      "Glutes"
    ],
    "secondaryMuscles": [
      "Quadriceps",
      "Calves",
      "Core"
    ],
    "category": [
      "cardio",
      "bodyweight"
    ],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Start on right leg and jump laterally to the left, landing softly on left foot.",
      "Sweep right leg behind left ankle like a speed skater.",
      "Immediately bound back to the right, landing on right foot.",
      "Swing arms across body in rhythm."
    ],
    "formTips": [
      "Absorb each landing with a soft knee."
    ],
    "safetyNotes": "Step laterally rather than jumping if balance is challenging.",
    "imageUrl": null,
    "imageAlt": "Illustration of lateral skater hops",
    "videoUrl": null,
    "recommendedSets": {
      "min": 3,
      "max": 3
    },
    "repRange": null,
    "durationSeconds": 30,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": [
      "cardio",
      "weight_loss",
      "endurance"
    ],
    "exerciseVariations": [
      "Lateral Step-and-Tap"
    ],
    "alternativeExerciseIds": [
      "high_knees"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "stationary_bike",
    "name": "Stationary Cycling Ergometer",
    "slug": "stationary-cycling-ergometer",
    "description": "Low-impact cardiovascular session protecting joints while supporting aerobic conditioning.",
    "primaryMuscles": [
      "Cardiovascular"
    ],
    "secondaryMuscles": [
      "Quadriceps",
      "Hamstrings",
      "Calves"
    ],
    "category": [
      "cardio",
      "gym_equipment",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "gym_machine",
    "instructions": [
      "Adjust seat height so knee has slight 5-10 degree bend at bottom of pedal stroke.",
      "Pedal at a steady cadence of 70-90 RPM with moderate resistance.",
      "Keep upper body relaxed without white-knuckling handlebars.",
      "Cool down with 2 minutes of effortless spinning."
    ],
    "formTips": [
      "Keep shoulders away from ears."
    ],
    "safetyNotes": "Adjust seat height carefully to avoid patellar tendon strain.",
    "imageUrl": null,
    "imageAlt": "Illustration of stationary cycling machine",
    "videoUrl": null,
    "recommendedSets": {
      "min": 1,
      "max": 1
    },
    "repRange": null,
    "durationSeconds": 600,
    "restSeconds": 60,
    "estimatedDurationMinutes": 12,
    "suitableGoals": [
      "cardio",
      "weight_loss",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Interval Cycling"
    ],
    "alternativeExerciseIds": [
      "jumping_jack"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "cat_cow_stretch",
    "name": "Cat-Cow Spinal Mobility",
    "slug": "cat-cow-spinal-mobility",
    "description": "Gentle spinal warm-up moving through flexion and extension to enhance vertebral fluid exchange.",
    "primaryMuscles": [
      "Flexibility"
    ],
    "secondaryMuscles": [
      "Back",
      "Core",
      "Face & Neck"
    ],
    "category": [
      "flexibility",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Start on hands and knees with flat back.",
      "Inhale: drop belly toward floor, look up slightly, and lift tailbone (Cow).",
      "Exhale: round spine upward toward ceiling, tucking chin and pelvis (Cat).",
      "Move fluidly between postures synchronized with your breath."
    ],
    "formTips": [
      "Do not force end ranges; keep motions gentle."
    ],
    "safetyNotes": "Move comfortably within pain-free boundaries.",
    "imageUrl": null,
    "imageAlt": "Illustration of cat cow spinal stretch",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 3
    },
    "repRange": {
      "min": 8,
      "max": 10
    },
    "durationSeconds": null,
    "restSeconds": 30,
    "estimatedDurationMinutes": 5,
    "suitableGoals": [
      "flexibility",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Seated Cat-Cow"
    ],
    "alternativeExerciseIds": [
      "childs_pose"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#8e44ad",
    "active": true
  },
  {
    "id": "childs_pose",
    "name": "Balasana (Child's Pose)",
    "slug": "balasana-childs-pose",
    "description": "Restorative yoga posture that elongates the spine, opens the hips, and eases lower back tightness.",
    "primaryMuscles": [
      "Flexibility"
    ],
    "secondaryMuscles": [
      "Back",
      "Hips",
      "Shoulders"
    ],
    "category": [
      "flexibility",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Kneel on floor with big toes touching and knees spread comfortably wide.",
      "Sit hips back onto heels while extending arms forward along floor.",
      "Rest forehead gently on ground.",
      "Take deep diaphragmatic breaths and relax completely into posture."
    ],
    "formTips": [
      "Allow chest to sink between thighs."
    ],
    "safetyNotes": "Place cushion under knees if joint compression is sensitive.",
    "imageUrl": null,
    "imageAlt": "Illustration of childs pose",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": null,
    "durationSeconds": 45,
    "restSeconds": 30,
    "estimatedDurationMinutes": 4,
    "suitableGoals": [
      "flexibility",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Child's Pose with Side Reach"
    ],
    "alternativeExerciseIds": [
      "cat_cow_stretch"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#8e44ad",
    "active": true
  },
  {
    "id": "worlds_greatest_stretch",
    "name": "World's Greatest Stretch",
    "slug": "worlds-greatest-stretch",
    "description": "Dynamic multi-joint mobility movement opening ankles, hips, thoracic spine, and hamstrings.",
    "primaryMuscles": [
      "Flexibility"
    ],
    "secondaryMuscles": [
      "Hips",
      "Hamstrings"
    ],
    "category": [
      "flexibility",
      "bodyweight"
    ],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Step forward into a deep lunge with right foot outside right hand.",
      "Rest left knee on floor or hover off ground.",
      "Rotate right arm and chest upward toward ceiling, gazing at thumb.",
      "Return hand down, shift hips back into hamstring stretch, then switch sides."
    ],
    "formTips": [
      "Keep back knee cushioned."
    ],
    "safetyNotes": "Do not force thoracic rotation if spine feels restricted.",
    "imageUrl": null,
    "imageAlt": "Illustration of worlds greatest stretch",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": {
      "min": 5,
      "max": 6
    },
    "durationSeconds": null,
    "restSeconds": 30,
    "estimatedDurationMinutes": 5,
    "suitableGoals": [
      "flexibility",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Kneeling T-Spine Opener"
    ],
    "alternativeExerciseIds": [
      "cat_cow_stretch"
    ],
    "supportedTrainingLevels": [
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#8e44ad",
    "active": true
  },
  {
    "id": "standing_hamstring_stretch",
    "name": "Standing Single-Leg Hamstring Stretch",
    "slug": "standing-single-leg-hamstring-stretch",
    "description": "Static stretch restoring length to shortened hamstrings without requiring floor mats.",
    "primaryMuscles": [
      "Flexibility"
    ],
    "secondaryMuscles": [
      "Hamstrings",
      "Calves"
    ],
    "category": [
      "flexibility",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Stand with right heel placed forward on floor with toes pointing up.",
      "Hinge hips back and bend left knee slightly.",
      "Place hands on left thigh and lean forward with a flat back.",
      "Hold the stretch when a gentle pull is felt in right hamstring."
    ],
    "formTips": [
      "Keep spine long; do not hunch shoulders."
    ],
    "safetyNotes": "Never bounce during static holds.",
    "imageUrl": null,
    "imageAlt": "Illustration of standing hamstring stretch",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": null,
    "durationSeconds": 30,
    "restSeconds": 20,
    "estimatedDurationMinutes": 4,
    "suitableGoals": [
      "flexibility"
    ],
    "exerciseVariations": [
      "Seated Hamstring Stretch"
    ],
    "alternativeExerciseIds": [
      "childs_pose"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#8e44ad",
    "active": true
  },
  {
    "id": "doorway_chest_stretch",
    "name": "Doorway Pectoral Stretch",
    "slug": "doorway-pectoral-stretch",
    "description": "Postural corrective stretch counteracting rounded forward shoulders from prolonged desk sitting.",
    "primaryMuscles": [
      "Flexibility"
    ],
    "secondaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "category": [
      "flexibility",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Stand in open doorway with forearms placed against door jambs at 90 degrees.",
      "Take a small step forward with one foot until you feel a gentle chest stretch.",
      "Keep head neutral and breathe deeply for 30 seconds.",
      "Step back gently to release."
    ],
    "formTips": [
      "Do not shrug shoulders."
    ],
    "safetyNotes": "Stop immediately if anterior shoulder pain occurs.",
    "imageUrl": null,
    "imageAlt": "Illustration of doorway pectoral stretch",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": null,
    "durationSeconds": 30,
    "restSeconds": 20,
    "estimatedDurationMinutes": 3,
    "suitableGoals": [
      "flexibility"
    ],
    "exerciseVariations": [
      "Single Arm Corner Stretch"
    ],
    "alternativeExerciseIds": [
      "cat_cow_stretch"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#8e44ad",
    "active": true
  },
  {
    "id": "gentle_chin_tuck",
    "name": "Cervical Chin Tuck",
    "slug": "cervical-chin-tuck",
    "description": "Gentle postural exercise strengthening deep neck flexors to counter forward head carriage. Note: Face and neck exercises support mobility and posture; they do not selectively burn facial fat or guarantee cosmetic alterations.",
    "primaryMuscles": [
      "Face & Neck"
    ],
    "secondaryMuscles": [
      "Back"
    ],
    "category": [
      "face_neck",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Sit or stand upright with shoulders relaxed and gazing forward.",
      "Gently draw your chin straight back as if making a subtle double chin.",
      "Hold the gentle contraction for 3-5 seconds without tilting head down.",
      "Relax smoothly back to neutral."
    ],
    "formTips": [
      "Motion is purely horizontal retraction, like sliding a drawer back."
    ],
    "safetyNotes": "Never force the movement or compress the throat. Stop if dizziness or numbness arises.",
    "imageUrl": null,
    "imageAlt": "Illustration of cervical chin tuck exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": {
      "min": 8,
      "max": 10
    },
    "durationSeconds": null,
    "restSeconds": 30,
    "estimatedDurationMinutes": 4,
    "suitableGoals": [
      "general_fitness",
      "flexibility"
    ],
    "exerciseVariations": [
      "Supine Chin Tuck"
    ],
    "alternativeExerciseIds": [
      "neck_rotations"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#95a5a6",
    "active": true
  },
  {
    "id": "neck_rotations",
    "name": "Controlled Neck Rotations",
    "slug": "controlled-neck-rotations",
    "description": "Slow cervical rotation drill maintaining pain-free active range of motion.",
    "primaryMuscles": [
      "Face & Neck"
    ],
    "secondaryMuscles": [
      "Traps"
    ],
    "category": [
      "face_neck",
      "bodyweight",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Sit comfortably upright with shoulders dropped away from ears.",
      "Slowly turn head to look over right shoulder until gentle stretch is felt.",
      "Hold for 2 seconds, then smoothly return to center.",
      "Repeat on left side in a calm, deliberate rhythm."
    ],
    "formTips": [
      "Keep chin level with floor throughout rotation."
    ],
    "safetyNotes": "Do not roll neck backward or make violent jerking motions. Stop if clicking or dizzy spells occur.",
    "imageUrl": null,
    "imageAlt": "Illustration of controlled neck rotations",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": {
      "min": 6,
      "max": 8
    },
    "durationSeconds": null,
    "restSeconds": 30,
    "estimatedDurationMinutes": 4,
    "suitableGoals": [
      "flexibility"
    ],
    "exerciseVariations": [
      "Seated Neck Tilts"
    ],
    "alternativeExerciseIds": [
      "gentle_chin_tuck"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#95a5a6",
    "active": true
  },
  {
    "id": "jaw_relaxation",
    "name": "TMJ & Jaw Relaxation Drill",
    "slug": "tmj-jaw-relaxation-drill",
    "description": "Gentle temporomandibular relaxation drill relieving tension from stress clenching.",
    "primaryMuscles": [
      "Face & Neck"
    ],
    "secondaryMuscles": [],
    "category": [
      "face_neck",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Place tip of tongue gently on roof of mouth right behind upper front teeth.",
      "Allow teeth to part naturally and let lower jaw hang slack.",
      "Take 5 slow deep breaths in through nose and out through mouth.",
      "Relax facial muscles completely."
    ],
    "formTips": [
      "Keep facial muscles soft, without squinting or furrowing brow."
    ],
    "safetyNotes": "Do not force jaw open or click the joint.",
    "imageUrl": null,
    "imageAlt": "Illustration of jaw relaxation exercise",
    "videoUrl": null,
    "recommendedSets": {
      "min": 1,
      "max": 2
    },
    "repRange": null,
    "durationSeconds": 45,
    "restSeconds": 20,
    "estimatedDurationMinutes": 3,
    "suitableGoals": [
      "flexibility",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Gentle Masseter Massage"
    ],
    "alternativeExerciseIds": [
      "gentle_chin_tuck"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#95a5a6",
    "active": true
  },
  {
    "id": "lateral_neck_stretch",
    "name": "Lateral Upper Trap & Neck Stretch",
    "slug": "lateral-upper-trap-neck-stretch",
    "description": "Gentle lateral cervical flexion releasing tension along the sternocleidomastoid and upper trapezius.",
    "primaryMuscles": [
      "Face & Neck"
    ],
    "secondaryMuscles": [
      "Traps"
    ],
    "category": [
      "face_neck",
      "flexibility",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Sit tall with right hand holding edge of chair seat.",
      "Gently tilt left ear toward left shoulder until a mild stretch is felt on right side of neck.",
      "Hold position comfortably while breathing naturally.",
      "Release smoothly and repeat on opposite side."
    ],
    "formTips": [
      "Do not yank with your hand; gravity and chair anchor provide sufficient stretch."
    ],
    "safetyNotes": "Never pull forcefully on the head or neck.",
    "imageUrl": null,
    "imageAlt": "Illustration of lateral neck stretch",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": null,
    "durationSeconds": 25,
    "restSeconds": 20,
    "estimatedDurationMinutes": 3,
    "suitableGoals": [
      "flexibility"
    ],
    "exerciseVariations": [
      "Levator Scapulae Stretch"
    ],
    "alternativeExerciseIds": [
      "neck_rotations"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#95a5a6",
    "active": true
  },
  {
    "id": "shoulder_shrug_rolls",
    "name": "Gentle Shoulder & Neck Shrug Rolls",
    "slug": "gentle-shoulder-neck-shrug-rolls",
    "description": "Circulation and mobility exercise for upper trapezius and cervicothoracic junction.",
    "primaryMuscles": [
      "Face & Neck"
    ],
    "secondaryMuscles": [
      "Traps",
      "Shoulders"
    ],
    "category": [
      "face_neck",
      "flexibility",
      "beginner"
    ],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Sit tall with hands resting on thighs.",
      "Inhale and shrug shoulders up toward ears.",
      "Roll shoulders backward, squeezing shoulder blades together.",
      "Exhale and slide shoulders all the way down away from ears."
    ],
    "formTips": [
      "Perform smooth continuous circular arcs."
    ],
    "safetyNotes": "Move gently without straining.",
    "imageUrl": null,
    "imageAlt": "Illustration of shoulder shrug rolls",
    "videoUrl": null,
    "recommendedSets": {
      "min": 2,
      "max": 2
    },
    "repRange": {
      "min": 10,
      "max": 12
    },
    "durationSeconds": null,
    "restSeconds": 20,
    "estimatedDurationMinutes": 3,
    "suitableGoals": [
      "flexibility",
      "general_fitness"
    ],
    "exerciseVariations": [
      "Forward Shoulder Rolls"
    ],
    "alternativeExerciseIds": [
      "gentle_chin_tuck"
    ],
    "supportedTrainingLevels": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "genderGuideTags": [
      "men",
      "women"
    ],
    "muscleGroupColor": "#95a5a6",
    "active": true
  },
  {
    "id": "incline_dumbbell_press",
    "name": "Incline Dumbbell Bench Press",
    "slug": "incline-dumbbell-bench-press",
    "description": "Upper chest compound movement performed on a 30-45 degree incline bench, promoting clavicular head hypertrophy.",
    "primaryMuscles": ["Chest"],
    "secondaryMuscles": ["Shoulders", "Triceps"],
    "category": ["chest", "dumbbell", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Set an adjustable bench to a 30-degree incline.",
      "Sit with dumbbells resting on thighs, then kick them up as you lie back.",
      "Press the dumbbells up in an inward arc without clanking them at the top.",
      "Lower under control until you feel a comfortable stretch across the upper pectorals."
    ],
    "formTips": ["Keep wrists stacked directly over elbows.", "Maintain feet firmly on the ground."],
    "safetyNotes": "Do not set incline too steep (>45 deg) to prevent front deltoid overload.",
    "imageUrl": null,
    "imageAlt": "Illustration of incline dumbbell bench press",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 8, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 8,
    "suitableGoals": ["muscle_growth", "strength"],
    "exerciseVariations": ["Incline Barbell Press", "Low-to-High Cable Fly"],
    "alternativeExerciseIds": ["dumbbell_bench_press", "push_up"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "decline_pushup",
    "name": "Feet-Elevated Decline Push-Up",
    "slug": "feet-elevated-decline-push-up",
    "description": "Advanced bodyweight push-up variation with elevated feet, shifting mechanical load toward the upper pectorals and anterior deltoids.",
    "primaryMuscles": ["Chest", "Shoulders"],
    "secondaryMuscles": ["Triceps", "Core"],
    "category": ["chest", "bodyweight", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Place toes on an elevated bench or sturdy chair, hands flat on floor beneath shoulders.",
      "Maintain a rigid plank line from shoulders to heels.",
      "Lower chest toward the floor keeping elbows at roughly 45 degrees.",
      "Press through your palms to lockout."
    ],
    "formTips": ["Avoid hyperextending your lower back.", "Keep neck aligned with spine."],
    "safetyNotes": "Ensure surface beneath feet is completely stable and slip-resistant.",
    "imageUrl": null,
    "imageAlt": "Illustration of decline push up",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 10, "max": 15 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["muscle_growth", "strength", "general_fitness"],
    "exerciseVariations": ["Standard Push-Up", "Pike Push-Up"],
    "alternativeExerciseIds": ["push_up", "incline_dumbbell_press"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "cable_chest_fly",
    "name": "Standing Cable Chest Fly",
    "slug": "standing-cable-chest-fly",
    "description": "Continuous-tension isolation exercise for the pectorals providing deep stretch and peak contraction at convergence.",
    "primaryMuscles": ["Chest"],
    "secondaryMuscles": ["Shoulders"],
    "category": ["chest", "gym_equipment", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "cable_machine",
    "instructions": [
      "Position cable pulleys at chest height with D-handles attached.",
      "Take one step forward in a staggered stance, maintaining a slight forward torso lean.",
      "With slightly bent elbows, sweep your hands forward and together in a wide hugging motion.",
      "Squeeze your chest at the midpoint, then control the eccentric stretch backward."
    ],
    "formTips": ["Keep the bend in your elbows static throughout the movement."],
    "safetyNotes": "Do not overstretch past your natural active shoulder range of motion.",
    "imageUrl": null,
    "imageAlt": "Illustration of cable chest fly",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 12, "max": 15 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 7,
    "suitableGoals": ["muscle_growth", "general_fitness"],
    "exerciseVariations": ["Dumbbell Fly", "High-to-Low Cable Fly"],
    "alternativeExerciseIds": ["dumbbell_bench_press", "push_up"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#e74c3c",
    "active": true
  },
  {
    "id": "lat_pulldown_wide_grip",
    "name": "Wide-Grip Lat Pulldown",
    "slug": "wide-grip-lat-pulldown",
    "description": "Vertical pulling exercise targeting the latissimus dorsi, developing back width and scapular depression control.",
    "primaryMuscles": ["Back"],
    "secondaryMuscles": ["Arms", "Shoulders"],
    "category": ["back", "gym_equipment", "beginner"],
    "difficulty": "beginner",
    "equipment": "cable_machine",
    "instructions": [
      "Sit with thighs secured snugly under the padded support.",
      "Grasp the bar with an overhand grip slightly wider than shoulder width.",
      "Lean torso back very slightly (10-15 degrees) and pull the bar smoothly down to your upper clavicle.",
      "Control the return as arms fully extend overhead."
    ],
    "formTips": ["Lead the pull with your elbows, driving them down toward back pockets."],
    "safetyNotes": "Never pull the bar behind your neck to protect the cervical spine.",
    "imageUrl": null,
    "imageAlt": "Illustration of wide-grip lat pulldown",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 10, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": ["muscle_growth", "strength", "general_fitness"],
    "exerciseVariations": ["Close-Grip Lat Pulldown", "Pull-Up"],
    "alternativeExerciseIds": ["pull_up", "single_arm_dumbbell_row"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "single_arm_dumbbell_row",
    "name": "One-Arm Supported Dumbbell Row",
    "slug": "one-arm-supported-dumbbell-row",
    "description": "Unilateral horizontal pull that isolates each lat and mid-back side while eliminating spinal loading through bench support.",
    "primaryMuscles": ["Back"],
    "secondaryMuscles": ["Arms", "Shoulders"],
    "category": ["back", "dumbbell", "beginner"],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Place same-side knee and hand on a flat bench for firm support.",
      "Hold dumbbell in opposite hand with arm hanging straight down.",
      "Pull the dumbbell up toward your hip crease, tucking your elbow close to torso.",
      "Lower under control for full stretch."
    ],
    "formTips": ["Do not twist or rotate torso excessively at the top of the pull."],
    "safetyNotes": "Keep spine neutral and eyes focused slightly ahead on the bench.",
    "imageUrl": null,
    "imageAlt": "Illustration of one arm dumbbell row",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 10, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": ["muscle_growth", "strength", "general_fitness"],
    "exerciseVariations": ["Bent-Over Barbell Row", "Incline Chest-Supported Row"],
    "alternativeExerciseIds": ["lat_pulldown_wide_grip", "t_bar_chest_supported_row"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "t_bar_chest_supported_row",
    "name": "Chest-Supported T-Bar Row",
    "slug": "chest-supported-t-bar-row",
    "description": "Mid-back and rhomboid mass builder with complete lower-back support, allowing maximum upper-back loading.",
    "primaryMuscles": ["Back"],
    "secondaryMuscles": ["Arms", "Shoulders"],
    "category": ["back", "gym_equipment", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "gym_equipment",
    "instructions": [
      "Lie face down on the angled chest pad with feet firmly planted on footplates.",
      "Grasp handles with neutral or overhand grip.",
      "Retract shoulder blades and pull the weight up, driving elbows behind you.",
      "Pause briefly at peak contraction before slowly lowering."
    ],
    "formTips": ["Keep your chest pinned securely to the pad throughout."],
    "safetyNotes": "Avoid using momentum or jerking the weight upward.",
    "imageUrl": null,
    "imageAlt": "Illustration of chest supported t-bar row",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 8, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 8,
    "suitableGoals": ["muscle_growth", "strength"],
    "exerciseVariations": ["Seated Cable Row", "Incline Dumbbell Row"],
    "alternativeExerciseIds": ["single_arm_dumbbell_row", "lat_pulldown_wide_grip"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#3498db",
    "active": true
  },
  {
    "id": "dumbbell_arnold_press",
    "name": "Seated Arnold Press",
    "slug": "seated-arnold-press",
    "description": "Rotational shoulder press pioneered by Arnold Schwarzenegger that engages all three deltoid heads through an extended arc of motion.",
    "primaryMuscles": ["Shoulders"],
    "secondaryMuscles": ["Triceps", "Upper Chest"],
    "category": ["shoulders", "dumbbell", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Sit on an upright bench holding dumbbells at chin height with palms facing your chest.",
      "As you press overhead, rotate your wrists outward so palms face forward at the top.",
      "Lock out gently overhead without arching lower back.",
      "Reverse the rotational motion as you return to starting position."
    ],
    "formTips": ["Perform the rotation fluidly throughout the entire upward drive."],
    "safetyNotes": "Use lighter dumbbells than standard overhead presses to protect rotator cuff.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell Arnold press",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 10, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 7,
    "suitableGoals": ["muscle_growth", "strength"],
    "exerciseVariations": ["Seated Overhead Dumbbell Press", "Standing Military Press"],
    "alternativeExerciseIds": ["dumbbell_lateral_raise", "cable_face_pull_high"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#f39c12",
    "active": true
  },
  {
    "id": "dumbbell_lateral_raise",
    "name": "Standing Dumbbell Lateral Raise",
    "slug": "standing-dumbbell-lateral-raise",
    "description": "Essential isolation drill targeting the lateral (side) deltoid head to build upper-body width and shoulder definition.",
    "primaryMuscles": ["Shoulders"],
    "secondaryMuscles": ["Upper Back"],
    "category": ["shoulders", "dumbbell", "beginner"],
    "difficulty": "beginner",
    "equipment": "dumbbells",
    "instructions": [
      "Stand with feet shoulder-width apart, holding light dumbbells by your sides.",
      "With elbows slightly unlocked, raise arms out to the sides until parallel with the floor.",
      "Pour invisible water slightly with pinkies higher than thumbs at apex.",
      "Lower smoothly with resistance; do not drop weights."
    ],
    "formTips": ["Do not swing or use leg drive to launch dumbbells up."],
    "safetyNotes": "Avoid shrugging your traps up toward ears during the raise.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell lateral raise",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 12, "max": 15 },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["muscle_growth", "general_fitness"],
    "exerciseVariations": ["Cable Lateral Raise", "Seated Lateral Raise"],
    "alternativeExerciseIds": ["dumbbell_arnold_press", "cable_face_pull_high"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#f39c12",
    "active": true
  },
  {
    "id": "cable_face_pull_high",
    "name": "High-Pulley Cable Face Pull",
    "slug": "high-pulley-cable-face-pull",
    "description": "Premier posture restoration and posterior deltoid movement that builds rear shoulders and external rotator cuffs.",
    "primaryMuscles": ["Shoulders", "Back"],
    "secondaryMuscles": ["Upper Back"],
    "category": ["shoulders", "back", "gym_equipment", "beginner"],
    "difficulty": "beginner",
    "equipment": "cable_machine",
    "instructions": [
      "Attach a rope attachment to high cable pulley set at eye height.",
      "Grasp rope ends with thumbs pointing backward.",
      "Step back and pull the rope directly toward your face while separating ends apart.",
      "Externally rotate your shoulders so knuckles point back at the finish."
    ],
    "formTips": ["Emphasize pulling with your rear deltoids rather than biceps."],
    "safetyNotes": "Maintain moderate weight; quality of external rotation trumps heavy loading.",
    "imageUrl": null,
    "imageAlt": "Illustration of cable face pull",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 12, "max": 15 },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["general_fitness", "muscle_growth", "flexibility"],
    "exerciseVariations": ["Resistance Band Face Pull"],
    "alternativeExerciseIds": ["dumbbell_lateral_raise", "single_arm_dumbbell_row"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#f39c12",
    "active": true
  },
  {
    "id": "incline_bicep_curl",
    "name": "Incline Bench Dumbbell Bicep Curl",
    "slug": "incline-bench-dumbbell-bicep-curl",
    "description": "Places the long head of the biceps under significant passive stretch, maximizing hypertrophy and peak development.",
    "primaryMuscles": ["Arms"],
    "secondaryMuscles": ["Forearms"],
    "category": ["arms_biceps", "dumbbell", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Sit back on an incline bench angled at roughly 45 to 60 degrees.",
      "Let dumbbells hang straight down with palms facing each other.",
      "Curl weights upward while supinating wrists so palms face your shoulders at top.",
      "Lower slowly to full bottom elbow extension."
    ],
    "formTips": ["Keep elbows pointing toward floor throughout the curl."],
    "safetyNotes": "Avoid swinging elbows forward to take tension off the biceps.",
    "imageUrl": null,
    "imageAlt": "Illustration of incline dumbbell bicep curl",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 10, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["muscle_growth", "general_fitness"],
    "exerciseVariations": ["Standing Dumbbell Curl", "Preacher Curl"],
    "alternativeExerciseIds": ["skull_crushers_dumbbell", "overhead_tricep_rope_extension"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "skull_crushers_dumbbell",
    "name": "Flat Bench Dumbbell Skull Crusher",
    "slug": "flat-bench-dumbbell-skull-crusher",
    "description": "Tricep isolation exercise targeting the medial and lateral heads with joint-friendly neutral dumbbell grips.",
    "primaryMuscles": ["Arms"],
    "secondaryMuscles": ["Chest"],
    "category": ["triceps", "dumbbell", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Lie flat on bench holding dumbbells with arms extended perpendicular to floor.",
      "Hinge strictly at elbows to lower weights toward sides of forehead/ears.",
      "Keep upper arms stationary and vertical.",
      "Extend forearms forcefully back to top position."
    ],
    "formTips": ["Do not let elbows flare outward wide."],
    "safetyNotes": "Use controlled eccentric tempo to avoid dropping weights near face.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell skull crushers",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 10, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 7,
    "suitableGoals": ["muscle_growth", "strength"],
    "exerciseVariations": ["EZ-Bar Skull Crusher", "Cable Tricep Pushdown"],
    "alternativeExerciseIds": ["overhead_tricep_rope_extension", "incline_bicep_curl"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "overhead_tricep_rope_extension",
    "name": "Cable Overhead Tricep Extension",
    "slug": "cable-overhead-tricep-extension",
    "description": "Cable movement that places the long head of the triceps in full stretch over head, optimizing muscular development.",
    "primaryMuscles": ["Arms"],
    "secondaryMuscles": ["Shoulders"],
    "category": ["triceps", "gym_equipment", "beginner"],
    "difficulty": "beginner",
    "equipment": "cable_machine",
    "instructions": [
      "Attach rope to mid/low pulley, face away from machine in staggered stance.",
      "Hold rope behind head with elbows bent at 90 degrees.",
      "Extend arms forward and upward overhead, spreading rope ends at apex.",
      "Return slowly to 90-degree flexion."
    ],
    "formTips": ["Keep core engaged to prevent arching your lower back."],
    "safetyNotes": "Keep upper arms close to ears without straining neck posture.",
    "imageUrl": null,
    "imageAlt": "Illustration of cable overhead tricep extension",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 12, "max": 15 },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["muscle_growth", "general_fitness"],
    "exerciseVariations": ["Dumbbell Overhead Extension", "Tricep Dips"],
    "alternativeExerciseIds": ["skull_crushers_dumbbell", "incline_bicep_curl"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#00bcd4",
    "active": true
  },
  {
    "id": "dumbbell_romanian_deadlift",
    "name": "Dumbbell Romanian Deadlift (RDL)",
    "slug": "dumbbell-romanian-deadlift-rdl",
    "description": "Premier posterior-chain hinge exercise strengthening hamstrings, gluteus maximus, and spinal erectors safely.",
    "primaryMuscles": ["Hamstrings", "Glutes"],
    "secondaryMuscles": ["Back", "Core"],
    "category": ["hamstrings", "glutes", "dumbbell", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "dumbbells",
    "instructions": [
      "Stand tall holding dumbbells in front of thighs with feet hip-width apart.",
      "Keep soft bend in knees and hinge hips backward as if touching a wall behind you.",
      "Slide dumbbells down along shins until hamstrings are deeply loaded.",
      "Drive hips forward through glute contraction to stand tall."
    ],
    "formTips": ["Maintain proud chest and flat neutral spine throughout."],
    "safetyNotes": "Do not round lower back; stop descent when hips cease moving backward.",
    "imageUrl": null,
    "imageAlt": "Illustration of dumbbell Romanian deadlift",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 8, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 75,
    "estimatedDurationMinutes": 8,
    "suitableGoals": ["strength", "muscle_growth", "general_fitness"],
    "exerciseVariations": ["Barbell RDL", "Single-Leg RDL"],
    "alternativeExerciseIds": ["bulgarian_split_squat", "bodyweight_squat"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "bulgarian_split_squat",
    "name": "Bulgarian Split Squat",
    "slug": "bulgarian-split-squat",
    "description": "High-intensity unilateral leg exercise with rear foot elevated, building quadriceps, glutes, and balance.",
    "primaryMuscles": ["Legs", "Glutes"],
    "secondaryMuscles": ["Hamstrings", "Core"],
    "category": ["legs_quadriceps", "glutes", "bodyweight", "dumbbell", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "none",
    "instructions": [
      "Stand 2-3 feet in front of a bench; rest top of rear foot on bench behind you.",
      "Lower hips downward until front thigh is parallel to floor and back knee hovers above ground.",
      "Keep front knee tracking in line with second toe.",
      "Push forcefully through front heel to return to top."
    ],
    "formTips": ["Slight forward torso angle helps engage glutes effectively."],
    "safetyNotes": "Find proper foot distance first with bodyweight before adding dumbbells.",
    "imageUrl": null,
    "imageAlt": "Illustration of Bulgarian split squat",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 8, "max": 12 },
    "durationSeconds": null,
    "restSeconds": 60,
    "estimatedDurationMinutes": 8,
    "suitableGoals": ["muscle_growth", "strength", "general_fitness"],
    "exerciseVariations": ["Walking Lunges", "Step-Ups"],
    "alternativeExerciseIds": ["dumbbell_romanian_deadlift", "bodyweight_squat"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "standing_calf_raise_bodyweight",
    "name": "Standing Single-Leg Calf Raise",
    "slug": "standing-single-leg-calf-raise",
    "description": "Calf muscle strengthening drill targeting the gastrocnemius through maximum plantarflexion and dorsiflexion.",
    "primaryMuscles": ["Legs"],
    "secondaryMuscles": ["Ankles"],
    "category": ["legs_quadriceps", "bodyweight", "beginner"],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Stand on the edge of a sturdy step with heels hanging off; hold wall for balance.",
      "Lower heels below step level for a full calf stretch.",
      "Rise up as high as possible onto balls of feet.",
      "Hold peak contraction for 1 full second before lowering."
    ],
    "formTips": ["Control the descent for 2-3 seconds on every rep."],
    "safetyNotes": "Never bounce at the bottom to protect the Achilles tendon.",
    "imageUrl": null,
    "imageAlt": "Illustration of standing calf raise",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 15, "max": 20 },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["general_fitness", "muscle_growth"],
    "exerciseVariations": ["Seated Calf Raise", "Double-Leg Calf Raise"],
    "alternativeExerciseIds": ["bulgarian_split_squat", "dumbbell_romanian_deadlift"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "hanging_knee_tuck",
    "name": "Hanging Knee Tuck",
    "slug": "hanging-knee-tuck",
    "description": "Functional lower abdominal and hip flexor exercise performed from an overhead pull-up bar, strengthening grip and core.",
    "primaryMuscles": ["Core"],
    "secondaryMuscles": ["Arms", "Forearms"],
    "category": ["abs_core", "bodyweight", "intermediate"],
    "difficulty": "intermediate",
    "equipment": "gym_equipment",
    "instructions": [
      "Hang with overhand grip from pull-up bar with arms fully extended.",
      "Engage lats and abdominal wall to prevent body swinging.",
      "Roll pelvis upward and drive knees toward chest.",
      "Lower legs slowly back to dead hang with control."
    ],
    "formTips": ["Think of rolling your pelvis up toward your ribcage."],
    "safetyNotes": "Do not swing legs backward with momentum.",
    "imageUrl": null,
    "imageAlt": "Illustration of hanging knee tuck",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 10, "max": 15 },
    "durationSeconds": null,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["general_fitness", "muscle_growth", "strength"],
    "exerciseVariations": ["Captain's Chair Knee Raise", "Hanging Leg Raise"],
    "alternativeExerciseIds": ["plank", "mountain_climbers_tempo"],
    "supportedTrainingLevels": ["intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#2ecc71",
    "active": true
  },
  {
    "id": "mountain_climbers_tempo",
    "name": "Controlled Tempo Mountain Climbers",
    "slug": "controlled-tempo-mountain-climbers",
    "description": "Dynamic core and cardiovascular conditioning exercise that engages the entire anterior chain and elevates heart rate.",
    "primaryMuscles": ["Core", "Cardio"],
    "secondaryMuscles": ["Shoulders", "Legs"],
    "category": ["cardio", "abs_core", "bodyweight", "beginner"],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Begin in high plank position with shoulders stacked over hands.",
      "Drive right knee toward chest without letting hips pike upward.",
      "Return right foot and immediately drive left knee forward.",
      "Maintain brisk rhythmic cadence while keeping shoulders stable."
    ],
    "formTips": ["Keep hips level with shoulders throughout."],
    "safetyNotes": "Keep wrists directly beneath shoulders to avoid wrist strain.",
    "imageUrl": null,
    "imageAlt": "Illustration of tempo mountain climbers",
    "videoUrl": null,
    "recommendedSets": { "min": 3, "max": 4 },
    "repRange": { "min": 20, "max": 30 },
    "durationSeconds": 30,
    "restSeconds": 45,
    "estimatedDurationMinutes": 6,
    "suitableGoals": ["general_fitness", "cardio", "weight_loss"],
    "exerciseVariations": ["Cross-Body Mountain Climbers"],
    "alternativeExerciseIds": ["hanging_knee_tuck", "plank"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#e67e22",
    "active": true
  },
  {
    "id": "jaw_isometric_release",
    "name": "Gentle TMJ & Jaw Posture Drill",
    "slug": "gentle-tmj-jaw-posture-drill",
    "description": "Gentle postural reset drill targeting jaw clenching, TMJ tension, and forward-head postural compensation.",
    "primaryMuscles": ["Face & Neck"],
    "secondaryMuscles": ["Neck"],
    "category": ["face_neck", "bodyweight", "beginner"],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Sit upright with back supported and shoulders relaxed.",
      "Place tip of tongue on roof of mouth just behind upper teeth.",
      "Gently open mouth slowly while keeping tongue in contact with palate.",
      "Hold for 3-5 seconds, then close mouth gently without clenching teeth."
    ],
    "formTips": ["Keep movement smooth and pain-free; never force mouth open wide."],
    "safetyNotes": "Disclaimers: Non-medical postural & relaxation drill. Do not exert heavy pressure against the jaw joint. Consult a specialist for chronic TMJ pain.",
    "imageUrl": null,
    "imageAlt": "Illustration of TMJ jaw relaxation drill",
    "videoUrl": null,
    "recommendedSets": { "min": 2, "max": 3 },
    "repRange": { "min": 5, "max": 8 },
    "durationSeconds": null,
    "restSeconds": 30,
    "estimatedDurationMinutes": 3,
    "suitableGoals": ["general_fitness", "flexibility"],
    "exerciseVariations": ["Gentle Chin Tuck"],
    "alternativeExerciseIds": ["sternocleidomastoid_gentle_stretch"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "sternocleidomastoid_gentle_stretch",
    "name": "SCM & Lateral Neck Release",
    "slug": "scm-lateral-neck-release",
    "description": "Gentle lateral cervical mobility drill designed to relieve tension in the sternocleidomastoid muscle from prolonged screen usage.",
    "primaryMuscles": ["Face & Neck"],
    "secondaryMuscles": ["Upper Back"],
    "category": ["face_neck", "flexibility", "beginner"],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Sit upright with shoulders relaxed and hands resting in lap.",
      "Slowly turn head 45 degrees to the right, then gently tilt chin down toward right collarbone.",
      "Feel a mild, comfortable lengthening along the left side of your neck.",
      "Hold for 15-20 seconds with steady breathing, then repeat gently on opposite side."
    ],
    "formTips": ["Never pull or yank on your head with hands; let gentle gravity guide the stretch."],
    "safetyNotes": "Disclaimers: Gentle mobility drill only. Cease immediately if you experience dizziness, sharp tingling, or lightheadedness.",
    "imageUrl": null,
    "imageAlt": "Illustration of lateral neck release",
    "videoUrl": null,
    "recommendedSets": { "min": 2, "max": 2 },
    "repRange": { "min": 2, "max": 3 },
    "durationSeconds": 20,
    "restSeconds": 20,
    "estimatedDurationMinutes": 3,
    "suitableGoals": ["flexibility", "general_fitness"],
    "exerciseVariations": ["Upper Trap Stretch"],
    "alternativeExerciseIds": ["jaw_isometric_release"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#9b59b6",
    "active": true
  },
  {
    "id": "worlds_greatest_thoracic_stretch",
    "name": "World's Greatest Thoracic Opener",
    "slug": "worlds-greatest-thoracic-opener",
    "description": "Multi-joint global mobility drill targeting hip flexors, adductors, thoracic spine rotation, and hamstring flexibility in one smooth flow.",
    "primaryMuscles": ["Full Body", "Back"],
    "secondaryMuscles": ["Legs", "Hips", "Shoulders"],
    "category": ["flexibility", "full_body", "bodyweight", "beginner"],
    "difficulty": "beginner",
    "equipment": "none",
    "instructions": [
      "Step forward into a deep runner's lunge with left foot outside left hand.",
      "Keep back right leg straight with knee lifted slightly off floor.",
      "Rotate left arm upward toward ceiling, following fingertips with your eyes.",
      "Hold for 2 seconds, return hand down, and switch sides."
    ],
    "formTips": ["Keep front foot completely flat on the floor."],
    "safetyNotes": "Move through comfortable joint range without forcing lumbar spine rotation.",
    "imageUrl": null,
    "imageAlt": "Illustration of world's greatest thoracic mobility drill",
    "videoUrl": null,
    "recommendedSets": { "min": 2, "max": 3 },
    "repRange": { "min": 6, "max": 8 },
    "durationSeconds": null,
    "restSeconds": 30,
    "estimatedDurationMinutes": 5,
    "suitableGoals": ["flexibility", "general_fitness"],
    "exerciseVariations": ["Kneeling Thoracic Rotation"],
    "alternativeExerciseIds": ["sternocleidomastoid_gentle_stretch"],
    "supportedTrainingLevels": ["beginner", "intermediate", "advanced"],
    "genderGuideTags": ["men", "women"],
    "muscleGroupColor": "#1abc9c",
    "active": true
  }
];
module.exports = exercises;
