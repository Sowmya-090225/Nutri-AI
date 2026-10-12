import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import {
  Play, Pause, SkipForward, ChevronLeft, ChevronRight, CheckCircle2,
  Clock, Dumbbell, Award, Flame, RefreshCw, X, RotateCcw
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WorkoutSession = ({ workoutPlanDay, onFinish, onCancel }) => {
  const { t } = useLanguage();

  // Initialize exercises with structured sets
  const [exercises, setExercises] = useState(() => {
    const raw = workoutPlanDay?.exercises || [];
    if (raw.length === 0) {
      return [
        {
          id: 'push_up',
          name: 'Standard Push-Up',
          primaryMuscles: ['Chest', 'Triceps'],
          equipment: 'none',
          restSeconds: 60,
          sets: [
            { setNumber: 1, reps: 10, weightKg: 0, completed: false },
            { setNumber: 2, reps: 10, weightKg: 0, completed: false },
            { setNumber: 3, reps: 10, weightKg: 0, completed: false }
          ]
        }
      ];
    }

    return raw.map(ex => {
      const setCount = typeof ex.sets === 'number' ? ex.sets : (ex.recommendedSets?.min || 3);
      const repCount = typeof ex.reps === 'number' ? ex.reps : (ex.repRange?.min || 10);
      const setList = [];
      for (let i = 1; i <= setCount; i++) {
        setList.push({
          setNumber: i,
          reps: repCount,
          weightKg: 0,
          completed: false
        });
      }
      return {
        ...ex,
        sets: setList,
        completed: false
      };
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [restSecondsLeft, setRestSecondsLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  // Overall workout elapsed timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  // Rest countdown timer
  useEffect(() => {
    let timer;
    if (isTimerRunning && restSecondsLeft > 0) {
      timer = setInterval(() => {
        setRestSecondsLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, restSecondsLeft]);

  const currentExercise = exercises[currentIndex] || exercises[0];

  const handleToggleSet = (setIdx) => {
    setExercises(prev => {
      const updated = [...prev];
      const ex = { ...updated[currentIndex] };
      const currentSets = [...ex.sets];
      const setObj = { ...currentSets[setIdx] };
      const willBeCompleted = !setObj.completed;
      setObj.completed = willBeCompleted;
      currentSets[setIdx] = setObj;

      ex.sets = currentSets;
      ex.completed = currentSets.every(s => s.completed);
      updated[currentIndex] = ex;

      // If set was completed, trigger rest countdown
      if (willBeCompleted) {
        const rest = ex.restSeconds || 60;
        setRestSecondsLeft(rest);
        setIsTimerRunning(true);
      }

      return updated;
    });
  };

  const handleSetChange = (setIdx, field, val) => {
    setExercises(prev => {
      const updated = [...prev];
      const ex = { ...updated[currentIndex] };
      const currentSets = [...ex.sets];
      currentSets[setIdx] = { ...currentSets[setIdx], [field]: val };
      ex.sets = currentSets;
      updated[currentIndex] = ex;
      return updated;
    });
  };

  const handleNextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsTimerRunning(false);
      setRestSecondsLeft(0);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsTimerRunning(false);
      setRestSecondsLeft(0);
    }
  };

  const handleSaveSession = async () => {
    try {
      setSaving(true);
      const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

      const payload = {
        workoutType: workoutPlanDay?.workoutType || 'Workout Session',
        exercises,
        durationMinutes,
        notes,
        planDayId: workoutPlanDay?.id || null
      };

      await api.post('/fitness/workout-session', payload);
      alert(t('Workout session recorded successfully! Great work!'));
      if (onFinish) onFinish();
    } catch (err) {
      console.error('Failed to save workout session:', err);
      alert(t('Error saving session. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  // Completion summary view
  if (isFinished) {
    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
    const completedSets = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
    const completedExercisesCount = exercises.filter(ex => ex.completed).length;

    return (
      <div className="session-container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'rgba(46, 204, 113, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'
          }}>
            <Award size={48} />
          </div>
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)' }}>
          {t('Workout Complete!')}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {t('Incredible effort! You crushed your routine.')}
        </p>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          margin: '1.5rem 0',
          background: 'var(--input-bg)',
          padding: '1.25rem',
          borderRadius: '12px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('Duration')}</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {formatTime(elapsedSeconds)}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('Exercises')}</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {completedExercisesCount}/{exercises.length}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('Sets Done')}</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {completedSets}/{totalSets}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'block' }}>
            {t('Workout Notes & Reflection (Optional)')}
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder={t('How did the weights feel? Energy level, fatigue, highlights...')}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--input-border)',
              background: 'var(--card-bg)',
              color: 'var(--text-main)',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn"
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: '1px solid var(--divider)',
              color: 'var(--text-muted)',
              flex: 1
            }}
          >
            {t('Discard')}
          </button>
          <button
            type="button"
            className="btn"
            disabled={saving}
            onClick={handleSaveSession}
            style={{
              background: 'var(--primary)',
              color: '#fff',
              flex: 2
            }}
          >
            {saving ? t('Saving...') : t('Save to Workout History')}
          </button>
        </div>
      </div>
    );
  }

  // Active workout execution view
  return (
    <div className="session-container">
      {/* Top Bar: Progress, Elapsed time, Exit button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)' }}>
            {workoutPlanDay?.workoutType || t('Live Session')}
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {t('Exercise')} {currentIndex + 1} {t('of')} {exercises.length}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
            <Clock size={16} color="var(--primary)" />
            {formatTime(elapsedSeconds)}
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm(t('Are you sure you want to end or cancel this session?'))) {
                onCancel();
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.3rem'
            }}
            title={t('Exit')}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="session-progress-bar">
        <div
          className="session-progress-fill"
          style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
        />
      </div>

      {/* Main Layout: Left = Current Exercise Info, Right = Sets Tracker & Rest Timer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Left: Exercise details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            height: '220px',
            background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(52, 152, 219, 0.15))',
            borderRadius: '12px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {currentExercise.imageUrl ? (
              <img
                src={currentExercise.imageUrl}
                alt={currentExercise.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="exercise-card-media-placeholder"
              style={{ display: currentExercise.imageUrl ? 'none' : 'flex' }}
            >
              <Dumbbell size={52} />
              <span style={{ fontSize: '1rem', fontWeight: '600' }}>{currentExercise.name}</span>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
              {currentExercise.name}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {Array.isArray(currentExercise.primaryMuscles) ? currentExercise.primaryMuscles.join(', ') : currentExercise.primaryMuscles} • {currentExercise.equipment || 'No equipment'}
            </span>
          </div>

          {Array.isArray(currentExercise.instructions) && currentExercise.instructions.length > 0 && (
            <div style={{ background: 'var(--input-bg)', padding: '1rem', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>
                {t('Instructions')}
              </span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {currentExercise.instructions[0]}
              </p>
            </div>
          )}
        </div>

        {/* Right: Sets tracker + Rest timer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Rest Timer Widget */}
          <div style={{
            background: 'var(--input-bg)',
            padding: '1.25rem',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            border: isTimerRunning ? '1px solid var(--primary)' : '1px solid var(--divider)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
              <Clock size={16} /> {t('Rest Timer')}
            </div>

            <div className="timer-circle">
              <span className="timer-number">{restSecondsLeft}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('Seconds')}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {isTimerRunning ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsTimerRunning(false)}
                  style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--divider)' }}
                >
                  <Pause size={14} /> {t('Pause')}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    if (restSecondsLeft === 0) setRestSecondsLeft(60);
                    setIsTimerRunning(true);
                  }}
                  style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--primary)', color: '#fff' }}
                >
                  <Play size={14} /> {t('Start')}
                </button>
              )}

              <button
                type="button"
                className="btn"
                onClick={() => setRestSecondsLeft(prev => prev + 30)}
                style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--divider)' }}
              >
                +30s
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  setRestSecondsLeft(0);
                  setIsTimerRunning(false);
                }}
                style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--card-bg)', color: 'var(--text-muted)', border: '1px solid var(--divider)' }}
              >
                <SkipForward size={14} /> {t('Skip')}
              </button>
            </div>
          </div>

          {/* Sets Tracking Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {t('Log Sets & Resistance')}
            </span>

            {currentExercise.sets.map((set, sIdx) => (
              <div
                key={set.setNumber}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.85rem',
                  background: set.completed ? 'rgba(46, 204, 113, 0.1)' : 'var(--card-bg)',
                  borderRadius: '10px',
                  border: `1px solid ${set.completed ? 'var(--primary)' : 'var(--divider)'}`
                }}
              >
                <span style={{ fontWeight: '700', fontSize: '0.85rem', width: '45px', color: 'var(--text-main)' }}>
                  Set {set.setNumber}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1 }}>
                  <input
                    type="number"
                    min="1"
                    value={set.reps}
                    onChange={e => handleSetChange(sIdx, 'reps', parseInt(e.target.value) || 0)}
                    style={{
                      width: '60px',
                      padding: '0.35rem',
                      borderRadius: '6px',
                      border: '1px solid var(--input-border)',
                      background: 'var(--input-bg)',
                      color: 'var(--text-main)',
                      textAlign: 'center',
                      fontSize: '0.85rem'
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>reps</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1 }}>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="0"
                    value={set.weightKg || ''}
                    onChange={e => handleSetChange(sIdx, 'weightKg', parseFloat(e.target.value) || 0)}
                    style={{
                      width: '60px',
                      padding: '0.35rem',
                      borderRadius: '6px',
                      border: '1px solid var(--input-border)',
                      background: 'var(--input-bg)',
                      color: 'var(--text-main)',
                      textAlign: 'center',
                      fontSize: '0.85rem'
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>kg</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleSet(sIdx)}
                  style={{
                    border: 'none',
                    background: set.completed ? 'var(--primary)' : 'var(--input-bg)',
                    color: set.completed ? '#fff' : 'var(--text-muted)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <CheckCircle2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Exercise navigation controls */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
            <button
              type="button"
              className="btn"
              disabled={currentIndex === 0}
              onClick={handlePrevExercise}
              style={{
                background: 'var(--input-bg)',
                color: 'var(--text-main)',
                border: '1px solid var(--divider)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                flex: 1
              }}
            >
              <ChevronLeft size={16} /> {t('Previous')}
            </button>

            <button
              type="button"
              className="btn"
              onClick={handleNextExercise}
              style={{
                background: currentIndex === exercises.length - 1 ? '#27ae60' : 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                flex: 1.5
              }}
            >
              {currentIndex === exercises.length - 1 ? t('Finish Workout') : t('Next Exercise')}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSession;
