const sequelize = require('./db');
async function checkSql() {
  try {
    const [results] = await sequelize.query("SELECT sql FROM sqlite_master WHERE name='Profiles'");
    console.log(results[0].sql);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkSql();
