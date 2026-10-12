import React, { useState, useEffect } from 'react';
import api from '../../api';
import {
  TrendingUp, Calendar, Dumbbell, Clock, Award, Plus,
  Scale, CheckCircle2, ChevronRight, Activity, ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WorkoutProgress = () => {
  const { t } = useLanguage();
  const [progressData, setProgressData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // New weight entry form
  const [newWeight, setNewWeight] = useState('');
  const [weightDate, setWeightDate] = useState(new Date().toISOString().split('T')[0]);
  const [loggingWeight, setLoggingWeight] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [progRes, histRes] = await Promise.all([
        api.get('/fitness/progress'),
        api.get('/fitness/workout-history?limit=15')
      ]);
      setProgressData(progRes.data);
      setHistory(histRes.data || []);
    } catch (err) {
      console.error('Failed to load progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogWeight = async (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(parseFloat(newWeight))) {
      alert(t('Please enter a valid weight number'));
      return;
    }

    try {
      setLoggingWeight(true);
      await api.post('/fitness/weight-log', {
        weight: parseFloat(newWeight),
        date: weightDate
      });
      alert(t('Weight logged successfully!'));
      setNewWeight('');
      fetchData();
    } catch (err) {
      alert(t('Failed to log weight'));
    } finally {
      setLoggingWeight(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Activity size={28} className="spin" style={{ margin: '0 auto 0.5rem auto', color: 'var(--primary)' }} />
        <p>{t('Compiling workout history and fitness trends...')}</p>
      </div>
    );
  }

  const {
    totalWorkouts = 0,
    totalMinutes = 0,
    averageDuration = 0,
    progressionAdvice,
    recentActivity = [],
    weightHistory = []
  } = progressData || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Overview Stat Cards */}
      <div className="fitness-overview-grid">
        <div className="fitness-card">
          <div className="fitness-card-header">
            <span className="fitness-card-title">{t('Total Workouts')}</span>
            <div className="fitness-card-icon" style={{ background: 'rgba(46, 204, 113, 0.15)', color: 'var(--primary)' }}>
              <Dumbbell size={18} />
            </div>
          </div>
          <div>
            <div className="fitness-card-value">{totalWorkouts}</div>
            <div className="fitness-card-sub">{t('Completed training sessions')}</div>
          </div>
        </div>

        <div className="fitness-card">
          <div className="fitness-card-header">
            <span className="fitness-card-title">{t('Total Training Time')}</span>
            <div className="fitness-card-icon" style={{ background: 'rgba(52, 152, 219, 0.15)', color: '#3498db' }}>
              <Clock size={18} />
            </div>
          </div>
          <div>
            <div className="fitness-card-value">
              {Math.round(totalMinutes / 60)} <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>hrs</span> {totalMinutes % 60} <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>mins</span>
            </div>
            <div className="fitness-card-sub">{averageDuration} {t('mins average session')}</div>
          </div>
        </div>

        <div className="fitness-card">
          <div className="fitness-card-header">
            <span className="fitness-card-title">{t('Consistency (Last 7 Days)')}</span>
            <div className="fitness-card-icon" style={{ background: 'rgba(243, 156, 18, 0.15)', color: '#f39c12' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div>
            <div className="fitness-card-value">
              {recentActivity.filter(d => d.completed).length} / 7 <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{t('days')}</span>
            </div>
            <div className="fitness-card-sub">{t('Days with completed sessions')}</div>
          </div>
        </div>
      </div>

      {/* AI Progressive Overload Advice */}
      {progressionAdvice && (
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius)',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow)',
          borderLeft: `5px solid ${progressionAdvice.status === 'increase' ? 'var(--primary)' : (progressionAdvice.status === 'decrease' ? '#f39c12' : '#3498db')}`,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '10px',
            background: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {progressionAdvice.status === 'increase' && <ArrowUpRight size={24} color="var(--primary)" />}
            {progressionAdvice.status === 'decrease' && <ArrowDownRight size={24} color="#f39c12" />}
            {progressionAdvice.status === 'maintain' && <Minus size={24} color="#3498db" />}
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              {t('AI Progressive Overload Feedback')}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {progressionAdvice.message}
            </p>
          </div>
        </div>
      )}

      {/* 7-Day Consistency Bars */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--divider)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
          {t('Last 7 Days Training Activity')}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
          {recentActivity.map((day, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: '100%',
                height: '70px',
                background: 'var(--input-bg)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
                padding: '3px'
              }}>
                <div style={{
                  width: '100%',
                  height: day.completed ? '100%' : '15%',
                  background: day.completed ? 'var(--primary)' : 'rgba(0, 0, 0, 0.08)',
                  borderRadius: '5px',
                  transition: 'height 0.3s'
                }} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {day.dayName}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {day.durationMinutes ? `${day.durationMinutes}m` : '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bodyweight Tracker & History */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--divider)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scale size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {t('Bodyweight History & Tracking')}
            </h3>
          </div>

          {/* Quick weight entry form */}
          <form onSubmit={handleLogWeight} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="number"
              step="0.1"
              placeholder={t('Weight (kg)')}
              value={newWeight}
              onChange={e => setNewWeight(e.target.value)}
              required
              style={{
                width: '110px',
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                border: '1px solid var(--input-border)',
                background: 'var(--input-bg)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
            <input
              type="date"
              value={weightDate}
              onChange={e => setWeightDate(e.target.value)}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                border: '1px solid var(--input-border)',
                background: 'var(--input-bg)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
            <button
              type="submit"
              disabled={loggingWeight}
              className="btn"
              style={{
                width: 'auto',
                padding: '0.4rem 0.85rem',
                fontSize: '0.85rem',
                background: 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Plus size={15} /> {t('Log Weight')}
            </button>
          </form>
        </div>

        {/* Weight Log timeline */}
        {weightHistory.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {t('No weight records logged yet. Enter your current weight above to track body composition trends.')}
          </p>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {weightHistory.slice(-8).map((log, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: '100px',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--divider)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.date}</span>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  {log.weight} kg
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workout Sessions History Table */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--divider)'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem' }}>
          {t('Completed Workout Sessions History')}
        </h3>

        {history.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
            {t('No workout sessions logged yet. Complete a workout from the planner to start building your record!')}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {history.map((session) => (
              <div
                key={session.id}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  background: 'var(--input-bg)',
                  borderRadius: '10px',
                  border: '1px solid var(--divider)',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--primary)" />
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {session.workoutType}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                    {session.date} • {session.durationMinutes || 0} mins • {session.completedExercises || 0} exercises ({session.completedSets || 0} sets)
                  </span>
                  {session.notes && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.3rem' }}>
                      "{session.notes}"
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="exercise-tag" style={{ background: 'rgba(46, 204, 113, 0.15)', color: 'var(--primary)', fontWeight: '700' }}>
                    {t('Completed')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutProgress;
