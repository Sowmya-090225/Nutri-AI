import React, { useState, useEffect } from 'react';
import api from '../../api';
import { ShieldCheck, AlertTriangle, Info, CheckCircle2, Flame, ArrowRight, UserCheck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const WeightManagement = () => {
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendation();
  }, []);

  const fetchRecommendation = async () => {
    try {
      setLoading(true);
      const res = await api.get('/fitness/recommendation');
      setData(res.data);
    } catch (err) {
      console.error('Failed to load recommendation:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <RefreshCw size={28} className="spin" style={{ margin: '0 auto 0.5rem auto', color: 'var(--primary)' }} />
        <p>{t('Analyzing your metabolic parameters and profile...')}</p>
      </div>
    );
  }

  if (!data) return null;

  // Determine badge styling based on direction
  const getBadgeClass = (direction) => {
    if (!direction) return 'badge-maintenance';
    const d = direction.toLowerCase();
    if (d.includes('guidance')) return 'badge-guidance';
    if (d.includes('loss')) return 'badge-deficit';
    if (d.includes('gain')) return 'badge-surplus';
    return 'badge-maintenance';
  };

  const isInsufficient = data.status === 'insufficient_data';
  const isProfessional = data.status === 'professional_guidance';

  return (
    <div className="recommendation-panel">
      {/* Header with Title and Direction Badge */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
            {t('AI Nutrition & Weight Strategy')}
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {data.title || data.direction}
          </h2>
        </div>

        <div className={`recommendation-badge ${getBadgeClass(data.direction)}`}>
          {isProfessional || isInsufficient ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
          <span>{data.direction}</span>
        </div>
      </div>

      {/* Primary Explanation Box */}
      <div style={{
        background: isProfessional ? 'rgba(243, 156, 18, 0.08)' : (isInsufficient ? 'rgba(231, 76, 60, 0.08)' : 'var(--input-bg)'),
        border: `1px solid ${isProfessional ? '#f39c12' : (isInsufficient ? 'var(--danger)' : 'var(--divider)')}`,
        padding: '1.25rem 1.5rem',
        borderRadius: '12px'
      }}>
        <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
          {data.explanation}
        </p>

        {isInsufficient && data.missingFields && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.88rem', color: 'var(--danger)' }}>
            <strong>{t('Required parameters missing')}: </strong>
            {data.missingFields.join(', ')}.
          </div>
        )}
      </div>

      {/* Energy Targets / Metabolic Calculations (if calculated) */}
      {data.energyTargets && data.energyTargets.tdee && (
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Flame size={18} color="var(--primary)" /> {t('Energy Targets & Calorie Prescription')}
          </h4>
          <div className="recommendation-metrics-grid">
            <div className="recommendation-metric-box">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('Maintenance Needs (TDEE)')}</span>
              <strong style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
                {data.energyTargets.tdee} <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>kcal/day</span>
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mifflin-St Jeor formula</span>
            </div>

            <div className="recommendation-metric-box">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('Caloric Adjustment')}</span>
              <strong style={{ fontSize: '1.35rem', color: data.energyTargets.adjustment < 0 ? '#27ae60' : (data.energyTargets.adjustment > 0 ? '#8e44ad' : '#3498db') }}>
                {data.energyTargets.adjustment > 0 ? `+${data.energyTargets.adjustment}` : data.energyTargets.adjustment} <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>kcal</span>
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {data.energyTargets.adjustment < 0 ? t('Sustainable Deficit') : (data.energyTargets.adjustment > 0 ? t('Lean Surplus') : t('Energy Balance'))}
              </span>
            </div>

            <div className="recommendation-metric-box" style={{ background: 'rgba(46, 204, 113, 0.08)', borderColor: 'var(--primary)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>{t('Recommended Daily Intake')}</span>
              <strong style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>
                {data.energyTargets.goalCalories} <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>kcal/day</span>
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('Balanced daily nutrition')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Transparency: Profile Data Used & Assumptions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div style={{ background: 'var(--input-bg)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--divider)' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <UserCheck size={16} /> {t('Profile Inputs Used')}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <div>{t('Age')}: <strong style={{ color: 'var(--text-main)' }}>{data.profileDataUsed?.age || 'N/A'}</strong></div>
            <div>{t('Gender')}: <strong style={{ color: 'var(--text-main)' }}>{data.profileDataUsed?.gender || 'N/A'}</strong></div>
            <div>{t('Weight')}: <strong style={{ color: 'var(--text-main)' }}>{data.profileDataUsed?.weightKg ? `${data.profileDataUsed.weightKg} kg` : 'N/A'}</strong></div>
            <div>{t('Height')}: <strong style={{ color: 'var(--text-main)' }}>{data.profileDataUsed?.heightCm ? `${data.profileDataUsed.heightCm} cm` : 'N/A'}</strong></div>
            <div>{t('BMI (Screening)')}: <strong style={{ color: 'var(--text-main)' }}>{data.profileDataUsed?.bmi || 'N/A'}</strong></div>
            <div>{t('Target Weight')}: <strong style={{ color: 'var(--text-main)' }}>{data.profileDataUsed?.targetWeightKg ? `${data.profileDataUsed.targetWeightKg} kg` : t('None')}</strong></div>
          </div>
        </div>

        <div style={{ background: 'var(--input-bg)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--divider)' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={16} /> {t('Modeling Assumptions')}
          </h4>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {data.assumptions && data.assumptions.map((assump, i) => (
              <li key={i}>{assump}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested Next Steps */}
      {data.suggestedNextSteps && data.suggestedNextSteps.length > 0 && (
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            {t('Recommended Next Actions')}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {data.suggestedNextSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} color="var(--primary)" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Change Goal or Update Profile Action */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.25rem',
        background: 'rgba(52, 152, 219, 0.08)',
        borderRadius: '10px',
        border: '1px solid rgba(52, 152, 219, 0.2)',
        gap: '1rem'
      }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
          {t('Want to adjust your target weight or fitness goals?')}
        </span>
        <Link
          to="/profile"
          className="btn"
          style={{
            width: 'auto',
            padding: '0.45rem 1rem',
            fontSize: '0.85rem',
            background: 'var(--primary)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            textDecoration: 'none'
          }}
        >
          {t('Edit Profile & Goals')} <ArrowRight size={14} />
        </Link>
      </div>

      {/* Safety & Medical Disclaimers */}
      {data.safetyNotes && data.safetyNotes.length > 0 && (
        <div style={{ borderTop: '1px solid var(--divider)', paddingTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          <strong>{t('Safety Notice & Disclaimer')}: </strong>
          {data.safetyNotes.join(' ')}
        </div>
      )}
    </div>
  );
};

export default WeightManagement;
