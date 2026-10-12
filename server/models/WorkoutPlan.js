const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const WorkoutPlan = sequelize.define('WorkoutPlan', {
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
  weekStartDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dayOfWeek: {
    type: DataTypes.INTEGER, // 0=Monday, 6=Sunday
    allowNull: false,
    validate: {
      min: 0,
      max: 6
    }
  },
  dayName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workoutType: {
    type: DataTypes.STRING, // 'Full Body Strength', 'Upper Body', 'Cardio & Mobility', 'Rest & Recovery', etc.
    allowNull: false
  },
  isRestDay: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  exercises: {
    type: DataTypes.TEXT, // JSON string of exercise array
    allowNull: true,
    get() {
      const raw = this.getDataValue('exercises');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('exercises', val ? JSON.stringify(val) : null);
    }
  },
  estimatedDurationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  indexes: [
    {
      fields: ['userId', 'weekStartDate', 'dayOfWeek'],
      unique: true
    }
  ]
});

WorkoutPlan.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = WorkoutPlan;
