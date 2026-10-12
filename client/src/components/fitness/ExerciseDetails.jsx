import {
  X, Dumbbell, AlertTriangle, Wind, CheckCircle2, Shuffle, Layers, ShieldCheck,
  Flame, Shield, Zap, Activity, Target, HeartPulse, Sparkles, Compass
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

const ExerciseDetails = ({ exercise, onClose, onSelectAlternative }) => {
  const { t } = useLanguage();

  if (!exercise) return null;

  const difficultyClass = {
    beginner: 'badge-beginner',
    intermediate: 'badge-intermediate',
    advanced: 'badge-advanced'
  }[exercise.difficulty?.toLowerCase()] || 'badge-beginner';

  const visual = getMuscleVisual(exercise.category, exercise.primaryMuscles);
  const IconComponent = visual.Icon;

  const primaryMuscle = Array.isArray(exercise.primaryMuscles)
    ? exercise.primaryMuscles.join(', ')
    : (exercise.primaryMuscles || 'Full Body');

  const isFaceNeck = (exercise.category || []).includes('face_neck') ||
    primaryMuscle.toLowerCase().includes('face') ||
    primaryMuscle.toLowerCase().includes('neck');

  return (
    <div className="exercise-modal-overlay" onClick={onClose}>
      <div className="exercise-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="exercise-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="fitness-card-icon" style={{ width: 40, height: 40 }}>
              <IconComponent size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {exercise.name}
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {primaryMuscle} • {exercise.equipment || 'No equipment'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.4rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Media Banner with rich CSS-based gradient & overlaid Lucide icon */}
        <div style={{
          height: '220px',
          background: visual.gradient,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          overflow: 'hidden',
          textAlign: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          <div style={{
            background: 'rgba(255, 255, 255, 0.22)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.6rem',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            zIndex: 1
          }}>
            <IconComponent size={32} color="#ffffff" />
          </div>

          <span style={{
            fontSize: '0.82rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.92)',
            zIndex: 1
          }}>
            {primaryMuscle}
          </span>

          <span
            className={`exercise-badge-difficulty ${difficultyClass}`}
            style={{ top: 16, right: 16, padding: '0.35rem 0.85rem', fontSize: '0.8rem', zIndex: 1 }}
          >
            {t(exercise.difficulty || 'All Levels')}
          </span>
        </div>

        {/* Face/Neck Disclaimers Alert Banner (if applicable) */}
        {isFaceNeck && (
          <div style={{
            background: 'rgba(142, 68, 173, 0.12)',
            borderLeft: '5px solid #8e44ad',
            padding: '1rem 1.25rem',
            margin: '1rem 1.5rem 0 1.5rem',
            borderRadius: '8px'
          }}>
            <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8e44ad', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <AlertTriangle size={16} /> {t('Face & Neck Health Disclaimer')}
            </h5>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
              {t('These drills are intended strictly for posture reset, jaw relaxation, and gentle cervical mobility. Do not apply heavy force or torque against the neck. Stop immediately if you experience dizziness or pain.')}
            </p>
          </div>
        )}

        {/* Modal Body */}
        <div className="exercise-modal-body">
          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
            background: 'var(--input-bg)',
            padding: '1rem',
            borderRadius: '10px'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Target Sets')}</span>
              <p style={{ fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                {exercise.recommendedSets?.min || 3} - {exercise.recommendedSets?.max || 4} sets
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Repetitions')}</span>
              <p style={{ fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                {exercise.repRange ? `${exercise.repRange.min}-${exercise.repRange.max} reps` : (exercise.durationSeconds ? `${exercise.durationSeconds}s` : '10-12 reps')}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Rest Interval')}</span>
              <p style={{ fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                {exercise.restSeconds || 60} seconds
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Secondary Focus')}</span>
              <p style={{ fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>
                {Array.isArray(exercise.secondaryMuscles) && exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles.join(', ') : 'Stabilizers'}
              </p>
            </div>
          </div>

          {/* Description */}
          {exercise.description && (
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                {t('Overview')}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {exercise.description}
              </p>
            </div>
          )}

          {/* Step-by-Step Instructions */}
          {Array.isArray(exercise.instructions) && exercise.instructions.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                {t('Step-by-Step Instructions')}
              </h4>
              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {exercise.instructions.map((step, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Breathing Guidance & Form Tips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {exercise.formTips && (
              <div style={{ background: 'rgba(46, 204, 113, 0.08)', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid var(--primary)' }}>
                <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} /> {t('Key Form Cues')}
                </h5>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {Array.isArray(exercise.formTips)
                    ? exercise.formTips.map((tip, i) => <li key={i}>{tip}</li>)
                    : <li>{exercise.formTips}</li>}
                </ul>
              </div>
            )}

            <div style={{ background: 'rgba(52, 152, 219, 0.08)', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #3498db' }}>
              <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2980b9', fontWeight: '700', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                <Wind size={16} /> {t('Breathing Pattern')}
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                {exercise.breathingGuidance || 'Inhale slowly during the eccentric phase (lowering weight); exhale with intent during the concentric exertion (lifting phase).'}
              </p>
            </div>
          </div>

          {/* Safety & Common Mistakes */}
          {exercise.safetyNotes && (
            <div style={{ background: 'rgba(231, 76, 60, 0.08)', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid var(--danger)' }}>
              <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--danger)', fontWeight: '700', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                <AlertTriangle size={16} /> {t('Safety & Common Pitfalls')}
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                {exercise.safetyNotes}
              </p>
            </div>
          )}

          {/* Variations & Alternatives */}
          {Array.isArray(exercise.exerciseVariations) && exercise.exerciseVariations.length > 0 && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                <Layers size={16} /> {t('Variations')}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {exercise.exerciseVariations.map((v, i) => (
                  <span key={i} className="exercise-tag" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {Array.isArray(exercise.alternatives) && exercise.alternatives.length > 0 && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                <Shuffle size={16} /> {t('Equipment / Joint Alternatives')}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {exercise.alternatives.map((alt) => (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => onSelectAlternative && onSelectAlternative(alt)}
                    className="exercise-tag"
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--primary)',
                      color: 'var(--primary)',
                      fontWeight: '600'
                    }}
                  >
                    {alt.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendation Note */}
          <div style={{
            background: 'var(--input-bg)',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={18} color="var(--primary)" />
            <span>
              {t('Programmed into your routine based on your experience level and health goals. Always maintain pain-free joint mechanics.')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
