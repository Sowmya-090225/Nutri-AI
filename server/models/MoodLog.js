const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MoodLog = sequelize.define('MoodLog', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'date']
    }
  ]
});

module.exports = MoodLog;
