import React from 'react';
import { Target, Scale, CalendarCheck, Flame, Award, Dumbbell, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FitnessOverviewCards = ({ overview, onStartTodayWorkout, onViewPlanner }) => {
  const { t } = useLanguage();

  if (!overview) return null;

  const { profile, bmi, energy, weeklyStats, todayWorkout, totalWorkoutsCompleted } = overview;

  // Format goal text
  const goalLabels = {
    weight_loss: t('Weight Loss'),
    weight_gain: t('Weight Gain'),
    maintenance: t('Maintenance')
  };
  const goalText = goalLabels[profile?.goal] || t('Maintenance');

  // Format weight text
  const currentWeight = profile?.weight ? `${profile.weight} kg` : t('Not set');
  const targetWeight = profile?.targetWeight ? `${profile.targetWeight} kg` : t('Not set');

  // Completion rate
  const completionRate = weeklyStats?.completionRate || 0;
  const targetDays = weeklyStats?.targetDays || 3;
  const completedDays = weeklyStats?.completedDays || 0;

  // Fitness level
  const experienceLabels = {
    beginner: t('Beginner'),
    intermediate: t('Intermediate'),
    advanced: t('Advanced')
  };
  const fitnessLevel = experienceLabels[profile?.fitnessExperience] || t('Beginner');

  return (
    <div className="fitness-overview-grid">
      {/* 1. Fitness Goal Card */}
      <div className="fitness-card">
        <div className="fitness-card-header">
          <span className="fitness-card-title">{t('Fitness Goal')}</span>
          <div className="fitness-card-icon" style={{ background: 'rgba(52, 152, 219, 0.15)', color: '#3498db' }}>
            <Target size={18} />
          </div>
        </div>
        <div>
          <div className="fitness-card-value" style={{ fontSize: '1.45rem' }}>{goalText}</div>
          <div className="fitness-card-sub">
            {energy?.goalCalories
              ? `${energy.goalCalories} kcal / day target`
              : t('Energy balance focus')}
          </div>
        </div>
      </div>

      {/* 2. Current vs Target Weight Card */}
      <div className="fitness-card">
        <div className="fitness-card-header">
          <span className="fitness-card-title">{t('Body Weight')}</span>
          <div className="fitness-card-icon" style={{ background: 'rgba(155, 89, 182, 0.15)', color: '#9b59b6' }}>
            <Scale size={18} />
          </div>
        </div>
        <div>
          <div className="fitness-card-value" style={{ fontSize: '1.45rem' }}>
            {currentWeight}
          </div>
          <div className="fitness-card-sub">
            {t('Target')}: {targetWeight} {bmi?.bmi ? `(BMI ${bmi.bmi})` : ''}
          </div>
        </div>
      </div>

      {/* 3. Weekly Workouts */}
      <div className="fitness-card">
        <div className="fitness-card-header">
          <span className="fitness-card-title">{t('Weekly Target')}</span>
          <div className="fitness-card-icon" style={{ background: 'rgba(46, 204, 113, 0.15)', color: 'var(--primary)' }}>
            <CalendarCheck size={18} />
          </div>
        </div>
        <div>
          <div className="fitness-card-value" style={{ fontSize: '1.45rem' }}>
            {completedDays} / {targetDays} <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-muted)' }}>{t('days')}</span>
          </div>
          <div className="fitness-card-sub">
            {targetDays - completedDays > 0
              ? `${targetDays - completedDays} ${t('workouts remaining this week')}`
              : t('Target achieved for this week!')}
          </div>
        </div>
      </div>

      {/* 4. Today's Workout */}
      <div className="fitness-card" style={{ borderLeft: todayWorkout && !todayWorkout.completed ? '4px solid var(--primary)' : '1px solid var(--divider)' }}>
        <div className="fitness-card-header">
          <span className="fitness-card-title">{t("Today's Plan")}</span>
          <div className="fitness-card-icon" style={{ background: 'rgba(243, 156, 18, 0.15)', color: '#f39c12' }}>
            <Dumbbell size={18} />
          </div>
        </div>
        <div>
          <div className="fitness-card-value" style={{ fontSize: '1.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {todayWorkout ? (todayWorkout.isRestDay ? t('Rest & Recovery') : todayWorkout.workoutType) : t('No Workout Scheduled')}
          </div>
          <div className="fitness-card-sub" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
            <span>
              {todayWorkout?.isRestDay
                ? t('Active recovery')
                : (todayWorkout?.completed ? t('Completed today! 🎉') : `${todayWorkout?.estimatedDurationMinutes || 30} mins`)}
            </span>
            {todayWorkout && !todayWorkout.isRestDay && !todayWorkout.completed && (
              <button
                type="button"
                onClick={onStartTodayWorkout}
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                {t('Start')} <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5. Completion Progress */}
      <div className="fitness-card">
        <div className="fitness-card-header">
          <span className="fitness-card-title">{t('Week Progress')}</span>
          <div className="fitness-card-icon" style={{ background: 'rgba(230, 126, 34, 0.15)', color: '#e67e22' }}>
            <Flame size={18} />
          </div>
        </div>
        <div>
          <div className="fitness-card-value" style={{ fontSize: '1.45rem' }}>
            {completionRate}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--input-bg)', borderRadius: '10px', overflow: 'hidden', marginTop: '0.4rem' }}>
            <div style={{ width: `${Math.min(100, completionRate)}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      {/* 6. Fitness Level & Lifetime */}
      <div className="fitness-card">
        <div className="fitness-card-header">
          <span className="fitness-card-title">{t('Fitness Level')}</span>
          <div className="fitness-card-icon" style={{ background: 'rgba(39, 174, 96, 0.15)', color: '#27ae60' }}>
            <Award size={18} />
          </div>
        </div>
        <div>
          <div className="fitness-card-value" style={{ fontSize: '1.45rem' }}>
            {fitnessLevel}
          </div>
          <div className="fitness-card-sub">
            {totalWorkoutsCompleted} {t('total workouts logged')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessOverviewCards;
