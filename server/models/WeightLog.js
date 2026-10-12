const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const WeightLog = sequelize.define('WeightLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  weight: {
    type: DataTypes.FLOAT, // in kg
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

WeightLog.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = WeightLog;
