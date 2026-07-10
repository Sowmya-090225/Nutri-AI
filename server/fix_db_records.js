const Profile = require('./models/Profile');
const sequelize = require('./db');

async function fixRecords() {
  try {
    await sequelize.sync();
    
    const profiles = await Profile.findAll();
    console.log(`Checking ${profiles.length} profiles...`);

    for (const profile of profiles) {
      let changed = false;
      const updates = {};

      // Fix gender (case-insensitive)
      if (profile.gender && !['male', 'female', 'other'].includes(profile.gender)) {
        const lower = profile.gender.toLowerCase();
        if (['male', 'female', 'other'].includes(lower)) {
          updates.gender = lower;
          changed = true;
        } else {
          updates.gender = 'other'; // default to other if invalid string
          changed = true;
        }
      }

      // Fix goal
      if (profile.goal && !['weight_loss', 'weight_gain', 'maintenance'].includes(profile.goal)) {
        const lower = profile.goal.toLowerCase();
        if (['weight_loss', 'weight_gain', 'maintenance'].includes(lower)) {
          updates.goal = lower;
          changed = true;
        } else if (profile.goal === 'Weight Loss') {
          updates.goal = 'weight_loss';
          changed = true;
        } else if (profile.goal === 'Weight Gain') {
          updates.goal = 'weight_gain';
          changed = true;
        } else {
          updates.goal = 'maintenance';
          changed = true;
        }
      }

      // Fix dietaryPreference
      if (profile.dietaryPreference && !['veg', 'non-veg', 'vegan'].includes(profile.dietaryPreference)) {
        const lower = profile.dietaryPreference.toLowerCase();
        if (['veg', 'non-veg', 'vegan'].includes(lower)) {
          updates.dietaryPreference = lower;
          changed = true;
        } else if (lower === 'vegetarian') {
          updates.dietaryPreference = 'veg';
          changed = true;
        } else if (lower === 'non-vegetarian') {
          updates.dietaryPreference = 'non-veg';
          changed = true;
        } else {
          updates.dietaryPreference = 'veg';
          changed = true;
        }
      }

      if (changed) {
        console.log(`Updating profile ID ${profile.id}:`, updates);
        await profile.update(updates);
      }
    }

    console.log('Database cleanup complete.');
    process.exit(0);
  } catch (err) {
    console.error('Cleanup failed:', err);
    process.exit(1);
  }
}

fixRecords();
