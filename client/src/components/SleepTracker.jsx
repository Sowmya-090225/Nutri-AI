import React, { useState, useEffect } from 'react';
import api from '../api';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const SleepTracker = () => {
  const { t } = useLanguage();
  const [hours, setHours] = useState('');
  const [storedHours, setStoredHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSleepLog();
  }, []);

  const fetchSleepLog = async () => {
    try {
      const res = await api.get('/sleep');
      if (res.data && res.data.hours !== undefined) {
        setStoredHours(res.data.hours);
        setHours(res.data.hours.toString());
      }
    } catch (err) {
      console.error('Failed to fetch sleep log:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (hours === '' || isNaN(hours)) return;
    
    setSaving(true);
    console.log(`[SleepTracker] Saving hours: ${hours}`);
    try {
      const res = await api.post('/sleep', { hours: parseFloat(hours) });
      console.log(`[SleepTracker] Server response:`, res.data);
      if (res.data && res.data.hours !== undefined) {
        const newHrs = res.data.hours;
        setStoredHours(newHrs);
        setHours(newHrs.toString());
      }
    } catch (err) {
      console.error('Failed to save sleep log:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    console.log(`[SleepTracker] Resetting hours to 0`);
    try {
      const res = await api.post('/sleep', { hours: 0 });
      if (res.data && res.data.hours !== undefined) {
        setStoredHours(0);
        setHours('0');
      }
    } catch (err) {
      console.error('Failed to reset sleep log:', err);
    } finally {
      setSaving(false);
    }
  };

  const getFeedback = (val) => {
    const n = parseFloat(val);
    if (isNaN(n) || n === 0) return { text: t("No sleep logged yet for today."), color: 'var(--text-muted)' };
    if (n < 6) return { text: t('⚠️ Poor sleep. Try to rest more.'), color: '#e67e22' };
    if (n <= 8) return { text: t('👍 Good sleep. Keep it up!'), color: 'var(--success)' };
    return { text: t('😴 Great rest, but maintain balance.'), color: 'var(--secondary)' };
  };

  const feedback = getFeedback(hours || storedHours);

  if (loading) {
    return (
      <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <p>{t('Loading...')}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card" 
      style={{ 
        padding: '1.5rem', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--divider)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2rem' }}>😴</span>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {t('Sleep Tracker')}
        </h3>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          {t("Today's Sleep: %s hours", storedHours)}
        </p>
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.p 
              key={feedback.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ color: feedback.color, fontWeight: '500', margin: 0 }}
            >
              {feedback.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="number"
            step="0.5"
            min="0"
            max="24"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder={t('Enter hours slept')}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--input-border)',
              background: 'var(--input-bg)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving || hours === ''}
            style={{
              flex: 2,
              padding: '0.875rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.1s active',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {saving ? t('Saving...') : t('Save Sleep')}
          </button>
          
          <button
            type="button"
            className="btn"
            onClick={handleReset}
            disabled={saving}
            style={{
              flex: 1,
              padding: '0.875rem',
              background: 'rgba(231, 76, 60, 0.2)',
              color: '#e74c3c',
              border: '1px solid rgba(231, 76, 60, 0.3)',
              borderRadius: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(231, 76, 60, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(231, 76, 60, 0.2)'}
          >
            {t('Reset')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SleepTracker;
