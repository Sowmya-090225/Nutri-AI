import React, { useState, useEffect } from 'react';
import api from '../api';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const MoodTracker = () => {
  const { t } = useLanguage();
  const [todayMood, setTodayMood] = useState(null);
  const [previousMood, setPreviousMood] = useState(null);
  const [previousDate, setPreviousDate] = useState(null);
  const [selectedMood, setSelectedMood] = useState('');
  
  const [sleepHours, setSleepHours] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const moods = [
    { label: 'Happy', emoji: '😄', color: '#2ecc71', bg: 'rgba(46, 204, 113, 0.15)' },
    { label: 'Good', emoji: '😊', color: '#3498db', bg: 'rgba(52, 152, 219, 0.15)' },
    { label: 'Neutral', emoji: '😐', color: '#f1c40f', bg: 'rgba(241, 196, 15, 0.15)' },
    { label: 'Sad', emoji: '😔', color: '#9b59b6', bg: 'rgba(155, 89, 182, 0.15)' },
    { label: 'Stressed', emoji: '😫', color: '#e74c3c', bg: 'rgba(231, 76, 60, 0.15)' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [moodRes, sleepRes, waterRes] = await Promise.all([
        api.get('/mood'),
        api.get('/sleep'),
        api.get('/water')
      ]);

      if (moodRes.data) {
        setTodayMood(moodRes.data.todayMood);
        setSelectedMood(moodRes.data.todayMood || '');
        setPreviousMood(moodRes.data.previousMood);
        setPreviousDate(moodRes.data.previousDate);
      }

      if (sleepRes.data && sleepRes.data.hours !== undefined) {
        setSleepHours(sleepRes.data.hours);
      }

      if (waterRes.data && waterRes.data.amount !== undefined) {
        setWaterAmount(waterRes.data.amount);
      }
    } catch (err) {
      console.error('Failed to fetch data in MoodTracker:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    setSaving(true);
    setMessage('');
    try {
      const res = await api.post('/mood', { mood: selectedMood });
      if (res.data) {
        setTodayMood(res.data.todayMood);
        setPreviousMood(res.data.previousMood);
        setPreviousDate(res.data.previousDate);
        
        // Refetch sleep & water to make sure wellness banner updates with latest values
        const [sleepRes, waterRes] = await Promise.all([
          api.get('/sleep'),
          api.get('/water')
        ]);
        if (sleepRes.data && sleepRes.data.hours !== undefined) setSleepHours(sleepRes.data.hours);
        if (waterRes.data && waterRes.data.amount !== undefined) setWaterAmount(waterRes.data.amount);
      }
    } catch (err) {
      console.error('Failed to save mood:', err);
      setMessage(t('Failed to save mood. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  const getMoodFeedback = (moodLabel) => {
    switch (moodLabel) {
      case 'Happy':
        return t('Great! Keep maintaining your healthy habits.');
      case 'Good':
        return t("You're doing well. Stay consistent.");
      case 'Neutral':
        return t('Try drinking more water and staying active.');
      case 'Sad':
        return t('Consider a healthy meal, proper rest, and talking with loved ones.');
      case 'Stressed':
        return t('Take short breaks, stay hydrated, and practice relaxation.');
      default:
        return '';
    }
  };

  // Determine if user has maintained a healthy lifestyle today
  const hasHealthyLifestyle = 
    sleepHours >= 7 && 
    waterAmount >= 1500 && 
    (todayMood === 'Happy' || todayMood === 'Good');

  if (loading) {
    return (
      <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
        <p>{t('Loading...')}</p>
      </div>
    );
  }

  const selectedMoodDetails = moods.find(m => m.label === (todayMood || selectedMood));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--divider)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '2rem' }}>😊</span>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {t('Daily Mood Tracker')}
        </h3>
      </div>

      <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
        {todayMood ? (
          <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: '600', margin: '0 0 0.5rem' }}>
            {t("Today's Mood: %s", t(todayMood))} {moods.find(m => m.label === todayMood)?.emoji}
          </p>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 0.5rem' }}>
            {t("How are you feeling today?")}
          </p>
        )}
        
        {selectedMoodDetails && (
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedMoodDetails.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                color: selectedMoodDetails.color,
                fontWeight: '500',
                fontSize: '0.95rem',
                margin: '0',
                padding: '0.5rem',
                borderRadius: '8px',
                background: selectedMoodDetails.bg
              }}
            >
              {getMoodFeedback(selectedMoodDetails.label)}
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      {/* Mood Selector Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.4rem', margin: '0.5rem 0' }}>
        {moods.map((m) => {
          const isSelected = selectedMood === m.label;
          return (
            <motion.button
              key={m.label}
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(m.label)}
              title={t(m.label)}
              style={{
                flex: 1,
                fontSize: '1.8rem',
                background: isSelected ? m.bg : 'transparent',
                border: isSelected ? `2px solid ${m.color}` : '1px solid transparent',
                borderRadius: '12px',
                padding: '0.5rem 0',
                cursor: 'pointer',
                transition: 'border 0.2s, background 0.2s',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {m.emoji}
            </motion.button>
          );
        })}
      </div>

      <form onSubmit={handleSave} style={{ marginTop: 'auto' }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving || !selectedMood}
          style={{
            width: '100%',
            padding: '0.875rem',
            borderRadius: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {saving ? t('Saving...') : t('Save Mood')}
        </button>
      </form>

      {message && <p style={{ color: '#e74c3c', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{message}</p>}

      {/* Optional Wellness Insight Banner */}
      <AnimatePresence>
        {hasHealthyLifestyle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'linear-gradient(135deg, #11998e, #38ef7d)',
              color: '#fff',
              padding: '0.75rem',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              boxShadow: '0 4px 15px rgba(56, 239, 125, 0.3)',
              overflow: 'hidden'
            }}
          >
            {t("You're maintaining a healthy lifestyle today! 🎉")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previous Mood History display */}
      {previousMood && (
        <div style={{
          borderTop: '1px solid var(--divider)',
          paddingTop: '0.75rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{t('Previous Mood:')}</span>
          <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>
            {t(previousMood)} {moods.find(m => m.label === previousMood)?.emoji} ({previousDate})
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default MoodTracker;
