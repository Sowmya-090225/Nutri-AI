import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ──────────────────────────────────────────────────────────────
 *  ScrollWheel – a single vertical scroll-picker column
 * ────────────────────────────────────────────────────────────── */
const ITEM_H = 40;
const VISIBLE_ITEMS = 5;
const CONTAINER_H = ITEM_H * VISIBLE_ITEMS;
const PAD = Math.floor(VISIBLE_ITEMS / 2);

const ScrollWheel = ({ items, value, onChange, suffix = '' }) => {
  const listRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);
  const snapTimer = useRef(null);

  /* scroll to the selected value */
  useEffect(() => {
    const idx = items.indexOf(value);
    if (idx !== -1 && listRef.current) {
      listRef.current.scrollTop = idx * ITEM_H;
    }
  }, [value, items]);

  /* snap to nearest item */
  const snapToNearest = useCallback(() => {
    if (!listRef.current) return;
    const el = listRef.current;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    el.scrollTo({ top: clamped * ITEM_H, behavior: 'smooth' });
    if (items[clamped] !== value) onChange(items[clamped]);
  }, [items, value, onChange]);

  const scheduleSnap = useCallback(() => {
    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(snapToNearest, 100);
  }, [snapToNearest]);

  /* wheel */
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (!listRef.current) return;
    listRef.current.scrollTop += e.deltaY;
    scheduleSnap();
  }, [scheduleSnap]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  /* pointer drag */
  const onPointerDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    startScroll.current = listRef.current?.scrollTop ?? 0;
    e.preventDefault();
  };
  const onPointerMove = (e) => {
    if (!isDragging.current || !listRef.current) return;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    listRef.current.scrollTop = startScroll.current - (y - startY.current);
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    scheduleSnap();
  };

  /* click item */
  const handleItemClick = (item) => {
    const idx = items.indexOf(item);
    if (idx !== -1 && listRef.current) {
      listRef.current.scrollTo({ top: idx * ITEM_H, behavior: 'smooth' });
      onChange(item);
    }
  };

  return (
    <div
      className="hp-wheel"
      style={{ height: CONTAINER_H }}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      <div className="hp-wheel-highlight" style={{ top: PAD * ITEM_H, height: ITEM_H }} />
      <div className="hp-wheel-fade-top" style={{ height: PAD * ITEM_H }} />
      <div className="hp-wheel-fade-bottom" style={{ height: PAD * ITEM_H }} />

      <div ref={listRef} className="hp-wheel-list" style={{ height: CONTAINER_H }}>
        <div style={{ height: PAD * ITEM_H }} />
        {items.map((item) => (
          <div
            key={item}
            className={`hp-wheel-item${item === value ? ' active' : ''}`}
            style={{ height: ITEM_H, lineHeight: `${ITEM_H}px` }}
            onClick={() => handleItemClick(item)}
          >
            {item}{suffix}
          </div>
        ))}
        <div style={{ height: PAD * ITEM_H }} />
      </div>
    </div>
  );
};


/* ──────────────────────────────────────────────────────────────
 *  HeightPicker – popover-based height selector
 * ────────────────────────────────────────────────────────────── */
const CM_ITEMS = Array.from({ length: 201 }, (_, i) => 50 + i);          // 50–250
const FT_ITEMS = Array.from({ length: 7 }, (_, i) => 2 + i);             // 2–8
const IN_ITEMS = Array.from({ length: 12 }, (_, i) => i);                // 0–11

const cmToFtIn = (cm) => {
  const totalIn = Math.round(cm / 2.54);
  return { ft: Math.max(2, Math.min(8, Math.floor(totalIn / 12))), inch: totalIn % 12 };
};
const ftInToCm = (ft, inch) => Math.round((ft * 12 + inch) * 2.54);

const HeightPicker = ({ value, onChange, t = (s) => s }) => {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState('cm');
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const cmVal = Number(value) || 0;
  const hasCm = cmVal > 0;

  /* derived ft / in */
  const { ft: derivedFt, inch: derivedIn } = cmToFtIn(cmVal || 170);
  const [localFt, setLocalFt] = useState(derivedFt);
  const [localIn, setLocalIn] = useState(derivedIn);

  /* sync localFt/In when cm changes externally */
  useEffect(() => {
    if (!open) {
      const { ft, inch } = cmToFtIn(cmVal || 170);
      setLocalFt(ft);
      setLocalIn(inch);
    }
  }, [cmVal, open]);

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  /* when popover opens, default to 170 if no value yet */
  const handleOpen = () => {
    if (!hasCm) {
      onChange(170);
      const { ft, inch } = cmToFtIn(170);
      setLocalFt(ft);
      setLocalIn(inch);
    }
    setOpen(true);
  };

  /* unit toggle */
  const switchUnit = (u) => {
    if (u === unit) return;
    if (u === 'ftin') {
      const { ft, inch } = cmToFtIn(cmVal || 170);
      setLocalFt(ft);
      setLocalIn(inch);
    }
    setUnit(u);
  };

  /* handlers */
  const onCmChange = (v) => onChange(v);
  const onFtChange = (v) => { setLocalFt(v); onChange(ftInToCm(v, localIn)); };
  const onInChange = (v) => { setLocalIn(v); onChange(ftInToCm(localFt, v)); };

  /* display text */
  const displayCm = Math.max(50, Math.min(250, cmVal));
  const displayText = hasCm
    ? (unit === 'ftin'
        ? `${cmToFtIn(cmVal).ft} ft ${cmToFtIn(cmVal).inch} in`
        : `${displayCm} cm`)
    : '';

  return (
    <div className="hp-root">
      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
        {t('Height')}
      </label>
      {/* trigger field – looks like a normal input */}
      <div
        ref={triggerRef}
        className={`hp-trigger${open ? ' focused' : ''}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(); } }}
      >
        <span className={displayText ? 'hp-trigger-value' : 'hp-trigger-placeholder'}>
          {displayText || t('Select height')}
        </span>
        <svg className="hp-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* hidden native input for form required validation */}
      <input
        type="hidden"
        name="height"
        value={cmVal || ''}
        required
      />

      {/* popover */}
      {open && (
        <div ref={popoverRef} className="hp-popover">
          {/* unit toggle */}
          <div className="hp-unit-row">
            <button
              type="button"
              className={`hp-unit-btn${unit === 'cm' ? ' active' : ''}`}
              onClick={() => switchUnit('cm')}
            >
              cm
            </button>
            <button
              type="button"
              className={`hp-unit-btn${unit === 'ftin' ? ' active' : ''}`}
              onClick={() => switchUnit('ftin')}
            >
              ft / in
            </button>
          </div>

          {/* wheels */}
          <div className="hp-wheels">
            {unit === 'cm' ? (
              <div className="hp-wheel-col">
                <ScrollWheel items={CM_ITEMS} value={displayCm} onChange={onCmChange} suffix=" cm" />
              </div>
            ) : (
              <>
                <div className="hp-wheel-col">
                  <div className="hp-wheel-label">{t('Feet')}</div>
                  <ScrollWheel items={FT_ITEMS} value={Math.max(2, Math.min(8, localFt))} onChange={onFtChange} suffix=" ft" />
                </div>
                <div className="hp-wheel-col">
                  <div className="hp-wheel-label">{t('Inches')}</div>
                  <ScrollWheel items={IN_ITEMS} value={Math.max(0, Math.min(11, localIn))} onChange={onInChange} suffix=" in" />
                </div>
              </>
            )}
          </div>

          {/* readout + done */}
          <div className="hp-footer">
            <span className="hp-readout">
              {displayCm} cm
              {unit === 'ftin' && ` — ${localFt}′ ${localIn}″`}
            </span>
            <button type="button" className="hp-done-btn" onClick={() => setOpen(false)}>
              {t('Done')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeightPicker;
