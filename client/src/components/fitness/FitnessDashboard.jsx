import React, { useState, useEffect } from 'react';
import api from '../../api';
import FitnessOverviewCards from './FitnessOverviewCards';
import ExerciseLibrary from './ExerciseLibrary';
import WorkoutPlanner from './WorkoutPlanner';
import WeightManagement from './WeightManagement';
import WorkoutProgress from './WorkoutProgress';
import WorkoutSession from './WorkoutSession';
import {
  Dumbbell, Play, BookOpen, Calendar, TrendingUp,
  Scale, Sparkles, Loader2, Award
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FitnessDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'planner', 'library', 'weight', 'progress'
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active workout session state
  const [activeWorkoutDay, setActiveWorkoutDay] = useState(null);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await api.get('/fitness/overview');
      setOverview(res.data);
    } catch (err) {
      console.error('Failed to load fitness overview:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTodayWorkout = () => {
    if (overview?.todayWorkout && !overview.todayWorkout.isRestDay) {
      setActiveWorkoutDay(overview.todayWorkout);
    } else {
      // Fallback: start quick workout
      setActiveWorkoutDay({
        workoutType: 'Full Body Quick Session',
        exercises: [
          { id: 'push_up', name: 'Standard Push-Up', sets: 3, reps: 12, restSeconds: 60 },
          { id: 'bodyweight_squat', name: 'Bodyweight Squat', sets: 3, reps: 15, restSeconds: 60 },
          { id: 'plank', name: 'Forearm Plank', sets: 3, reps: 30, restSeconds: 45 }
        ]
      });
    }
  };

  const handleStartCustomWorkout = (planDay) => {
    setActiveWorkoutDay(planDay);
  };

  const handleFinishWorkout = () => {
    setActiveWorkoutDay(null);
    fetchOverview();
    setActiveTab('progress');
  };

  if (loading && !overview) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--primary)' }}>
        <Loader2 size={40} className="spin" style={{ margin: '0 auto 1rem auto' }} />
        <p style={{ color: 'var(--text-muted)' }}>{t('Loading your fitness dashboard...')}</p>
      </div>
    );
  }

  // If a live workout is running, render interactive WorkoutSession
  if (activeWorkoutDay) {
    return (
      <div className="fitness-container">
        <WorkoutSession
          workoutPlanDay={activeWorkoutDay}
          onFinish={handleFinishWorkout}
          onCancel={() => setActiveWorkoutDay(null)}
        />
      </div>
    );
  }

  const profile = overview?.profile;

  return (
    <div className="fitness-container">
      {/* ── 1. Personalized Hero Header & Quick Actions ── */}
      <div className="fitness-hero">
        <div className="fitness-hero-text">
          <h1>
            <Dumbbell size={28} color="var(--primary)" />
            {t('Fitness & Training Command')}
          </h1>
          <p>
            {t('Personalized workout planning, progressive resistance, and metabolic energy balance.')}
          </p>
        </div>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          <button
            type="button"
            className="btn"
            onClick={handleStartTodayWorkout}
            style={{
              width: 'auto',
              padding: '0.55rem 1.15rem',
              background: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: '700',
              fontSize: '0.88rem'
            }}
          >
            <Play size={16} /> {t('Start Workout')}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => setActiveTab('library')}
            style={{
              width: 'auto',
              padding: '0.55rem 1rem',
              background: 'var(--input-bg)',
              color: 'var(--text-main)',
              border: '1px solid var(--divider)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.88rem'
            }}
          >
            <BookOpen size={16} /> {t('Explore Exercises')}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => setActiveTab('planner')}
            style={{
              width: 'auto',
              padding: '0.55rem 1rem',
              background: 'var(--input-bg)',
              color: 'var(--text-main)',
              border: '1px solid var(--divider)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.88rem'
            }}
          >
            <Calendar size={16} /> {t('Weekly Plan')}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => setActiveTab('progress')}
            style={{
              width: 'auto',
              padding: '0.55rem 1rem',
              background: 'var(--input-bg)',
              color: 'var(--text-main)',
              border: '1px solid var(--divider)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.88rem'
            }}
          >
            <TrendingUp size={16} /> {t('History')}
          </button>
        </div>
      </div>

      {/* ── 2. Top-level Overview Cards ── */}
      <FitnessOverviewCards
        overview={overview}
        onStartTodayWorkout={handleStartTodayWorkout}
        onViewPlanner={() => setActiveTab('planner')}
      />

      {/* ── 3. Section Navigation Tabs ── */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="fitness-nav-tabs">
          <button
            type="button"
            className={`fitness-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Sparkles size={16} /> {t('Overview & Routine')}
          </button>

          <button
            type="button"
            className={`fitness-tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('planner')}
          >
            <Calendar size={16} /> {t('Weekly Planner')}
          </button>

          <button
            type="button"
            className={`fitness-tab-btn ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <BookOpen size={16} /> {t('Exercise Library')}
          </button>

          <button
            type="button"
            className={`fitness-tab-btn ${activeTab === 'weight' ? 'active' : ''}`}
            onClick={() => setActiveTab('weight')}
          >
            <Scale size={16} /> {t('Weight Strategy')}
          </button>

          <button
            type="button"
            className={`fitness-tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            <TrendingUp size={16} /> {t('Progress & Stats')}
          </button>
        </div>
      </div>

      {/* ── 4. Dynamic Tab Content Views ── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Workout Planner Component */}
          <WorkoutPlanner onStartWorkout={handleStartCustomWorkout} />

          {/* Weight Strategy Component */}
          <WeightManagement />
        </div>
      )}

      {activeTab === 'planner' && (
        <WorkoutPlanner onStartWorkout={handleStartCustomWorkout} />
      )}

      {activeTab === 'library' && (
        <ExerciseLibrary
          onAddToWorkout={(ex) => {
            alert(t(`Added "${ex.name}" to today's workout!`));
          }}
          onQuickComplete={(ex) => {
            alert(t(`Marked "${ex.name}" as completed!`));
          }}
        />
      )}

      {activeTab === 'weight' && (
        <WeightManagement />
      )}

      {activeTab === 'progress' && (
        <WorkoutProgress />
      )}
    </div>
  );
};

export default FitnessDashboard;
