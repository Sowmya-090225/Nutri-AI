import {
  Dumbbell, Clock, Flame, ChevronRight, CheckCircle2, Plus,
  Shield, Zap, Activity, Target, HeartPulse, Sparkles, Compass
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const getMuscleVisual = (category = [], primaryMuscles = []) => {
  const catList = Array.isArray(category) ? category.map(c => c.toLowerCase()) : [String(category).toLowerCase()];
  const muscleList = Array.isArray(primaryMuscles) ? primaryMuscles.map(m => m.toLowerCase()) : [String(primaryMuscles).toLowerCase()];
  const all = [...catList, ...muscleList].join(' ');

  if (all.includes('chest')) {
    return { gradient: 'linear-gradient(135deg, #e53935 0%, #ff5252 100%)', Icon: Flame, label: 'Chest' };
  }
  if (all.includes('back')) {
    return { gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', Icon: Shield, label: 'Back' };
  }
  if (all.includes('leg') || all.includes('quad') || all.includes('hamstring') || all.includes('glute') || all.includes('calf')) {
    return { gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)', Icon: Zap, label: 'Legs & Lower Body' };
  }
  if (all.includes('shoulder') || all.includes('deltoid')) {
    return { gradient: 'linear-gradient(135deg, #f39c12 0%, #d35400 100%)', Icon: Activity, label: 'Shoulders' };
  }
  if (all.includes('arm') || all.includes('bicep') || all.includes('tricep')) {
    return { gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', Icon: Dumbbell, label: 'Arms' };
  }
  if (all.includes('core') || all.includes('abs') || all.includes('abdominal')) {
    return { gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', Icon: Target, label: 'Core & Abs' };
  }
  if (all.includes('cardio') || all.includes('hiit')) {
    return { gradient: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', Icon: HeartPulse, label: 'Cardio & HIIT' };
  }
  if (all.includes('face') || all.includes('neck')) {
    return { gradient: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', Icon: Sparkles, label: 'Face & Neck' };
  }
  if (all.includes('flexibility') || all.includes('mobility') || all.includes('stretch')) {
    return { gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)', Icon: Compass, label: 'Flexibility' };
  }
  return { gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)', Icon: Dumbbell, label: 'Full Body' };
};

const ExerciseCard = ({ exercise, onViewDetails, onAddToWorkout, onMarkComplete, isCompleted }) => {
  const { t } = useLanguage();

  if (!exercise) return null;

  const difficultyClass = {
    beginner: 'badge-beginner',
    intermediate: 'badge-intermediate',
    advanced: 'badge-advanced'
  }[exercise.difficulty?.toLowerCase()] || 'badge-beginner';

  const visual = getMuscleVisual(exercise.category, exercise.primaryMuscles);
  const IconComponent = visual.Icon;

  // Format sets and reps
  const setsStr = exercise.recommendedSets
    ? (exercise.recommendedSets.min === exercise.recommendedSets.max
      ? `${exercise.recommendedSets.min} sets`
      : `${exercise.recommendedSets.min}-${exercise.recommendedSets.max} sets`)
    : '3 sets';

  const repsStr = exercise.repRange
    ? (exercise.repRange.min === exercise.repRange.max
      ? `${exercise.repRange.min} reps`
      : `${exercise.repRange.min}-${exercise.repRange.max} reps`)
    : (exercise.durationSeconds ? `${exercise.durationSeconds}s` : '10-12 reps');

  const primaryMuscle = Array.isArray(exercise.primaryMuscles)
    ? exercise.primaryMuscles.join(', ')
    : (exercise.primaryMuscles || 'Full Body');

  const instructionSnippet = Array.isArray(exercise.instructions) && exercise.instructions.length > 0
    ? exercise.instructions[0]
    : 'Perform with controlled form and full range of motion.';

  const isFaceNeck = (exercise.category || []).includes('face_neck') ||
    primaryMuscle.toLowerCase().includes('face') ||
    primaryMuscle.toLowerCase().includes('neck');

  return (
    <div className="exercise-card">
      {/* CSS-Based Visual System: category gradient background + overlaid Lucide icon & muscle name */}
      <div
        className="exercise-card-media"
        style={{
          background: visual.gradient,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          padding: '1.25rem 1rem',
          textAlign: 'center',
          overflow: 'hidden'
        }}
        title={exercise.imageAlt || exercise.name}
      >
        {/* Subtle decorative SVG pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.5rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          zIndex: 1
        }}>
          <IconComponent size={28} color="#ffffff" />
        </div>

        <span style={{
          fontSize: '0.75rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.9)',
          zIndex: 1
        }}>
          {primaryMuscle}
        </span>

        <span className={`exercise-badge-difficulty ${difficultyClass}`}>
          {t(exercise.difficulty || 'All Levels')}
        </span>

        {isFaceNeck && (
          <span style={{
            position: 'absolute',
            bottom: '8px',
            left: '10px',
            background: 'rgba(0, 0, 0, 0.65)',
            color: '#ffdd57',
            padding: '0.15rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.68rem',
            fontWeight: '700',
            backdropFilter: 'blur(4px)',
            zIndex: 1
          }}>
            {t('Postural Drill')}
          </span>
        )}
      </div>

      <div className="exercise-card-body">
        <h3 className="exercise-card-title">{exercise.name}</h3>

        <div className="exercise-card-tags">
          <span className="exercise-tag" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            {primaryMuscle}
          </span>
          <span className="exercise-tag">
            {exercise.equipment || 'No equipment'}
          </span>
        </div>

        <div className="exercise-card-meta">
          <div>
            <span>{t('Volume')}: </span>
            <strong>{setsStr} × {repsStr}</strong>
          </div>
          <div>
            <span>{t('Rest')}: </span>
            <strong>{exercise.restSeconds || 60}s</strong>
          </div>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          {instructionSnippet}
        </p>

        <div className="exercise-card-actions">
          <button
            type="button"
            className="btn"
            onClick={() => onViewDetails(exercise)}
            style={{
              padding: '0.45rem 0.8rem',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              background: 'var(--input-bg)',
              color: 'var(--text-main)',
              border: '1px solid var(--divider)',
              flex: 1
            }}
          >
            {t('View Details')}
            <ChevronRight size={14} />
          </button>

          {onAddToWorkout && (
            <button
              type="button"
              className="btn"
              onClick={() => onAddToWorkout(exercise)}
              title={t('Add to workout')}
              style={{
                padding: '0.45rem 0.6rem',
                fontSize: '0.82rem',
                background: 'var(--input-bg)',
                color: 'var(--primary)',
                border: '1px solid var(--divider)',
                width: 'auto'
              }}
            >
              <Plus size={16} />
            </button>
          )}

          {onMarkComplete && (
            <button
              type="button"
              className="btn"
              onClick={() => onMarkComplete(exercise)}
              title={isCompleted ? t('Completed') : t('Mark complete')}
              style={{
                padding: '0.45rem 0.6rem',
                fontSize: '0.82rem',
                background: isCompleted ? 'rgba(46, 204, 113, 0.2)' : 'var(--input-bg)',
                color: isCompleted ? 'var(--primary)' : 'var(--text-muted)',
                border: '1px solid var(--divider)',
                width: 'auto'
              }}
            >
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
