const sequelize = require('./db');
const User = require('./models/User');

async function fixSchema() {
  try {
    await User.sync({ alter: true });
    console.log('User table altered successfully.');
  } catch (err) {
    console.error('Failed to alter User table:', err);
  } finally {
    process.exit(0);
  }
}

fixSchema();
