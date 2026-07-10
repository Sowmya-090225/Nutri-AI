const Profile = require('./models/Profile');
const sequelize = require('./db');
const { v4: uuidv4 } = require('uuid');

async function test() {
  try {
    await sequelize.sync();
    const userId = uuidv4();
    
    console.log('Testing with valid data...');
    const p1 = await Profile.create({
      userId,
      age: 25,
      weight: 70,
      height: 175,
      gender: 'male',
      goal: 'maintenance',
      dietaryPreference: 'veg'
    });
    console.log('Valid data saved successfully');

    console.log('Testing with invalid gender (capitalized)...');
    try {
      await p1.update({ gender: 'Male' });
      console.log('Invalid gender saved? (Should have failed)');
    } catch (err) {
      console.log('Caught expected error for gender:', err.message);
    }

    console.log('Testing with invalid dietary preference...');
    try {
      await p1.update({ dietaryPreference: 'vegetarian' }); // Should be 'veg'
      console.log('Invalid dietaryPreference saved? (Should have failed)');
    } catch (err) {
      console.log('Caught expected error for dietaryPreference:', err.message);
    }

    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

test();
