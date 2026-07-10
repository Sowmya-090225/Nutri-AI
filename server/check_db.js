const sequelize = require('./db');
const Profile = require('./models/Profile');

async function checkSchema() {
  try {
    const [results] = await sequelize.query("PRAGMA table_info(Profiles);");
    console.log('--- Profiles Table Schema ---');
    results.forEach(col => {
      console.log(`${col.name}: ${col.type} (PK: ${col.pk}, Null: ${col.notnull === 0})`);
    });
    
    const count = await Profile.count();
    console.log('\nTotal profiles in DB:', count);
    
    process.exit(0);
  } catch (err) {
    console.error('Error checking schema:', err);
    process.exit(1);
  }
}

checkSchema();
