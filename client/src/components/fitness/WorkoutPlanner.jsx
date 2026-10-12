import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Calendar, CheckCircle2, Play, RefreshCw, Moon, Clock, Dumbbell, Sparkles, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WorkoutPlanner = ({ onStartWorkout }) => {
  const { t } = useLanguage();
  const [plans, setPlans] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  // Today's day index (0=Monday, 6=Sunday)
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7;

  useEffect(() => {
    fetchWeeklyPlan();
  }, []);

  const fetchWeeklyPlan = async () => {
    try {
      setLoading(true);
      const res = await api.get('/fitness/weekly-plan');
      setPlans(res.data?.plans || []);
      setWeekStartDate(res.data?.weekStartDate || '');
    } catch (err) {
      console.error('Failed to load weekly plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!window.confirm(t('Regenerate your weekly workout plan based on your current profile?'))) return;
    try {
      setRegenerating(true);
      const res = await api.post('/fitness/weekly-plan/regenerate');
      setPlans(res.data?.plans || []);
    } catch (err) {
      alert(t('Failed to regenerate plan'));
    } finally {
      setRegenerating(false);
    }
  };

  const handleToggleComplete = async (planDay) => {
    try {
      const nextCompleted = !planDay.completed;
      const res = await api.put(`/fitness/weekly-plan/${planDay.id}`, {
        completed: nextCompleted
      });
      setPlans(prev => prev.map(p => p.id === planDay.id ? { ...p, completed: nextCompleted } : p));
    } catch (err) {
      alert(t('Failed to update workout status'));
    }
  };

  const handleToggleRestDay = async (planDay) => {
    try {
      const nextRest = !planDay.isRestDay;
      const res = await api.put(`/fitness/weekly-plan/${planDay.id}`, {
        isRestDay: nextRest,
        workoutType: nextRest ? 'Rest & Recovery' : 'Full Body Strength'
      });
      setPlans(prev => prev.map(p => p.id === planDay.id ? { ...p, isRestDay: nextRest, workoutType: nextRest ? 'Rest & Recovery' : 'Full Body Strength' } : p));
    } catch (err) {
      alert(t('Failed to toggle rest day'));
    }
  };

  // Completion calculation
  const totalWorkoutDays = plans.filter(p => !p.isRestDay).length;
  const completedWorkoutDays = plans.filter(p => !p.isRestDay && p.completed).length;
  const percentComplete = totalWorkoutDays > 0 ? Math.round((completedWorkoutDays / totalWorkoutDays) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner with Stats & Regenerate Action */}
      <div style={{
        background: 'var(--card-bg)',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--divider)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {t('Weekly Workout Planner')}
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {weekStartDate ? `${t('Week of')} ${weekStartDate}` : t('Your periodized weekly training split')}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('Weekly Completion')}</span>
            <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>
              {completedWorkoutDays} / {totalWorkoutDays} {t('Workouts')} ({percentComplete}%)
            </strong>
          </div>

          <button
            type="button"
            className="btn"
            onClick={handleRegenerate}
            disabled={regenerating}
            style={{
              width: 'auto',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              background: 'var(--input-bg)',
              color: 'var(--text-main)',
              border: '1px solid var(--divider)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={15} className={regenerating ? 'spin' : ''} />
            {t('Regenerate with AI')}
          </button>
        </div>
      </div>

      {/* Days Grid */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--primary)' }}>
          <RefreshCw size={36} className="spin" style={{ margin: '0 auto' }} />
        </div>
      ) : (
        <div className="planner-grid">
          {plans.map((day) => {
            const isToday = day.dayOfWeek === currentDayIndex;
            const exercises = day.exercises || [];

            return (
              <div
                key={day.id || day.dayOfWeek}
                className={`planner-day-card ${isToday ? 'today' : ''} ${day.completed ? 'completed' : ''}`}
              >
                {/* Header */}
                <div className="planner-day-header">
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: isToday ? 'var(--primary)' : 'var(--text-muted)' }}>
                      {isToday ? `• ${t('TODAY')}` : ''}
                    </span>
                    <h3 className="planner-day-title">{t(day.dayName)}</h3>
                  </div>

                  <span
                    className="exercise-tag"
                    style={{
                      background: day.isRestDay ? 'rgba(52, 152, 219, 0.12)' : 'rgba(46, 204, 113, 0.12)',
                      color: day.isRestDay ? '#3498db' : 'var(--primary)',
                      fontWeight: '700'
                    }}
                  >
                    {day.isRestDay ? t('Rest Day') : t(day.workoutType)}
                  </span>
                </div>

                {/* Day Content */}
                {day.isRestDay ? (
                  <div style={{
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    background: 'var(--input-bg)',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <Moon size={28} color="#3498db" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{t('Rest & Muscle Recovery')}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {t('Focus on hydration, mobility, and nourishing whole foods.')}
                    </span>
                  </div>
                ) : (
                  <div className="planner-exercise-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                      <span>{exercises.length} {t('exercises')}</span>
                      <span>~{day.estimatedDurationMinutes || 35} mins</span>
                    </div>

                    {exercises.slice(0, 4).map((ex, idx) => (
                      <div key={idx} className="planner-exercise-chip">
                        <span style={{ fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                          {ex.name}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {ex.sets || 3} × {ex.reps || 10}
                        </span>
                      </div>
                    ))}

                    {exercises.length > 4 && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        +{exercises.length - 4} {t('more exercises')}
                      </span>
                    )}
                  </div>
                )}

                {/* Day Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  {!day.isRestDay && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => onStartWorkout(day)}
                      style={{
                        padding: '0.45rem 0.8rem',
                        fontSize: '0.82rem',
                        background: 'var(--primary)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem',
                        flex: 1
                      }}
                    >
                      <Play size={14} /> {t('Start Session')}
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleToggleComplete(day)}
                    title={day.completed ? t('Mark incomplete') : t('Mark complete')}
                    style={{
                      padding: '0.45rem 0.6rem',
                      width: 'auto',
                      fontSize: '0.82rem',
                      background: day.completed ? 'rgba(46, 204, 113, 0.2)' : 'var(--input-bg)',
                      color: day.completed ? 'var(--primary)' : 'var(--text-muted)',
                      border: '1px solid var(--divider)'
                    }}
                  >
                    <Check size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleToggleRestDay(day)}
                    title={day.isRestDay ? t('Switch to workout') : t('Switch to rest day')}
                    style={{
                      padding: '0.45rem 0.6rem',
                      width: 'auto',
                      fontSize: '0.82rem',
                      background: 'var(--input-bg)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--divider)'
                    }}
                  >
                    <Moon size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
