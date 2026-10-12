import React, { useState, useEffect, useMemo } from 'react';
import api from '../../api';
import ExerciseCard from './ExerciseCard';
import ExerciseDetails from './ExerciseDetails';
import { Search, Filter, SortAsc, Users, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'legs', label: 'Legs' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'arms', label: 'Arms' },
  { id: 'core', label: 'Core / Abs' },
  { id: 'cardio', label: 'Cardio & HIIT' },
  { id: 'full_body', label: 'Full Body' },
  { id: 'flexibility', label: 'Flexibility & Mobility' },
  { id: 'face_neck', label: 'Face & Neck' }
];

const ExerciseLibrary = ({ onAddToWorkout, onQuickComplete }) => {
  const { t } = useLanguage();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Filters & State
  const [genderTab, setGenderTab] = useState('all'); // 'all', 'men', 'women'
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [equipment, setEquipment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('alpha'); // 'alpha', 'duration'

  useEffect(() => {
    fetchExercises();
  }, [genderTab, category, difficulty, equipment, sortBy]);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const params = {};
      if (genderTab !== 'all') params.gender = genderTab;
      if (category !== 'all') params.category = category;
      if (difficulty !== 'all') params.difficulty = difficulty;
      if (equipment !== 'all') params.equipment = equipment;
      if (sortBy) params.sort = sortBy;

      const res = await api.get('/fitness/exercises', { params });
      setExercises(res.data?.exercises || []);
    } catch (err) {
      console.error('Failed to load exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  // Client-side search for instant responsive feedback
  const filteredExercises = useMemo(() => {
    if (!searchQuery.trim()) return exercises;
    const q = searchQuery.toLowerCase().trim();
    return exercises.filter(ex =>
      ex.name.toLowerCase().includes(q) ||
      (ex.primaryMuscles || []).some(m => m.toLowerCase().includes(q)) ||
      (ex.secondaryMuscles || []).some(m => m.toLowerCase().includes(q)) ||
      (ex.category || []).some(c => c.toLowerCase().includes(q))
    );
  }, [exercises, searchQuery]);

  return (
    <div className="exercise-library-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header Bar with Gender Guide Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        background: 'var(--card-bg)',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--divider)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="var(--primary)" /> {t('Exercise Library')}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {t('Browse comprehensive biomechanically-guided exercises with proper form instruction.')}
          </p>
        </div>

        {/* Men / Women / All Guide Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: 'var(--input-bg)',
          padding: '0.35rem',
          borderRadius: '30px'
        }}>
          <button
            type="button"
            className={`exercise-filter-pill ${genderTab === 'all' ? 'active' : ''}`}
            onClick={() => setGenderTab('all')}
          >
            {t('All Exercises')}
          </button>
          <button
            type="button"
            className={`exercise-filter-pill ${genderTab === 'men' ? 'active' : ''}`}
            onClick={() => setGenderTab('men')}
          >
            {t('Men Focus')}
          </button>
          <button
            type="button"
            className={`exercise-filter-pill ${genderTab === 'women' ? 'active' : ''}`}
            onClick={() => setGenderTab('women')}
          >
            {t('Women Focus')}
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="exercise-toolbar">
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="exercise-search-input"
            placeholder={t('Search exercise by name, muscle group (e.g. chest, biceps, quad)...')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div className="exercise-pill-group">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`exercise-filter-pill ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {/* Secondary dropdown filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          borderTop: '1px solid var(--divider)',
          paddingTop: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('Difficulty')}:</span>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--input-border)',
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="all">{t('All Levels')}</option>
              <option value="beginner">{t('Beginner')}</option>
              <option value="intermediate">{t('Intermediate')}</option>
              <option value="advanced">{t('Advanced')}</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('Equipment')}:</span>
            <select
              value={equipment}
              onChange={e => setEquipment(e.target.value)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--input-border)',
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="all">{t('Any Equipment')}</option>
              <option value="none">{t('Bodyweight Only')}</option>
              <option value="dumbbells">{t('Dumbbells')}</option>
              <option value="barbell">{t('Barbell')}</option>
              <option value="resistance_bands">{t('Resistance Bands')}</option>
              <option value="cable_machine">{t('Cable / Gym')}</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginLeft: 'auto' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('Sort')}:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--input-border)',
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="alpha">{t('Alphabetical (A-Z)')}</option>
              <option value="duration">{t('Duration / Speed')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exercise Count indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          {filteredExercises.length} {t('exercises found')}
        </span>
      </div>

      {/* Exercise Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: 'var(--primary)' }}>
          <Loader2 size={36} className="spin" />
        </div>
      ) : filteredExercises.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3.5rem 1rem',
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--divider)'
        }}>
          <p style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t('No exercises matched your filters.')}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            {t('Try clearing some search terms or resetting difficulty filters.')}
          </p>
        </div>
      ) : (
        <div className="exercise-grid">
          {filteredExercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onViewDetails={setSelectedExercise}
              onAddToWorkout={onAddToWorkout}
              onMarkComplete={onQuickComplete}
            />
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedExercise && (
        <ExerciseDetails
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onSelectAlternative={(alt) => setSelectedExercise(alt)}
        />
      )}
    </div>
  );
};

export default ExerciseLibrary;
