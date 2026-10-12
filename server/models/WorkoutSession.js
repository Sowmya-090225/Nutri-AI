const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const WorkoutSession = sequelize.define('WorkoutSession', {
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
  workoutType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exercises: {
    type: DataTypes.TEXT, // JSON string: [{ exerciseId, name, sets: [{ reps, weight, completed }], completed }]
    allowNull: true,
    get() {
      const raw = this.getDataValue('exercises');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('exercises', val ? JSON.stringify(val) : null);
    }
  },
  totalExercises: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completedExercises: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalSets: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completedSets: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  durationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  planDayId: {
    type: DataTypes.INTEGER, // references WorkoutPlan.id if started from planner
    allowNull: true
  }
});

WorkoutSession.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = WorkoutSession;
