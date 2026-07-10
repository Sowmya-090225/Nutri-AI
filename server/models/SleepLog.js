const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SleepLog = sequelize.define('SleepLog', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hours: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'date']
    }
  ]
});

module.exports = SleepLog;
