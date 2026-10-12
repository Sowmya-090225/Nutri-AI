const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const ExerciseLog = sequelize.define('ExerciseLog', {
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
  exerciseId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exerciseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  setsCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  repsCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  weightKg: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

ExerciseLog.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = ExerciseLog;
