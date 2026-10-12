import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ──────────────────────────────────────────────────────────────
 *  ScrollWheel – a single vertical scroll-picker column
 *  (Identical logic to the one used by HeightPicker)
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
 *  WeightPicker – popover-based weight selector (kg / lb)
 *  Stores weight internally in kilograms.
 * ────────────────────────────────────────────────────────────── */
const KG_MIN = 30;
const KG_MAX = 250;
const KG_ITEMS = Array.from({ length: KG_MAX - KG_MIN + 1 }, (_, i) => KG_MIN + i);   // 30–250

const LB_MIN = 66;   // ≈ 30 kg
const LB_MAX = 551;  // ≈ 250 kg
const LB_ITEMS = Array.from({ length: LB_MAX - LB_MIN + 1 }, (_, i) => LB_MIN + i);   // 66–551

const kgToLb = (kg) => Math.round(kg * 2.20462);
const lbToKg = (lb) => Math.round(lb / 2.20462);

const WeightPicker = ({ value, onChange, t = (s) => s }) => {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState('kg');
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const kgVal = Number(value) || 0;
  const hasWeight = kgVal > 0;

  /* derived lb value */
  const derivedLb = kgToLb(kgVal || 70);
  const [localLb, setLocalLb] = useState(derivedLb);

  /* sync localLb when kg changes externally */
  useEffect(() => {
    if (!open) {
      setLocalLb(kgToLb(kgVal || 70));
    }
  }, [kgVal, open]);

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

  /* when popover opens, default to 70 kg if no value yet */
  const handleOpen = () => {
    if (!hasWeight) {
      onChange(70);
      setLocalLb(kgToLb(70));
    }
    setOpen(true);
  };

  /* unit toggle */
  const switchUnit = (u) => {
    if (u === unit) return;
    if (u === 'lb') {
      setLocalLb(kgToLb(kgVal || 70));
    }
    setUnit(u);
  };

  /* handlers */
  const onKgChange = (v) => onChange(v);
  const onLbChange = (v) => {
    setLocalLb(v);
    onChange(lbToKg(v));
  };

  /* display text */
  const clampedKg = Math.max(KG_MIN, Math.min(KG_MAX, kgVal));
  const displayText = hasWeight
    ? (unit === 'lb'
        ? `${kgToLb(kgVal)} lb`
        : `${clampedKg} kg`)
    : '';

  return (
    <div className="hp-root">
      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
        {t('Weight')}
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
          {displayText || t('Select weight')}
        </span>
        <svg className="hp-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* hidden native input for form required validation */}
      <input
        type="hidden"
        name="weight"
        value={kgVal || ''}
        required
      />

      {/* popover */}
      {open && (
        <div ref={popoverRef} className="hp-popover">
          {/* unit toggle */}
          <div className="hp-unit-row">
            <button
              type="button"
              className={`hp-unit-btn${unit === 'kg' ? ' active' : ''}`}
              onClick={() => switchUnit('kg')}
            >
              kg
            </button>
            <button
              type="button"
              className={`hp-unit-btn${unit === 'lb' ? ' active' : ''}`}
              onClick={() => switchUnit('lb')}
            >
              lb
            </button>
          </div>

          {/* wheels */}
          <div className="hp-wheels">
            {unit === 'kg' ? (
              <div className="hp-wheel-col">
                <ScrollWheel items={KG_ITEMS} value={clampedKg} onChange={onKgChange} suffix=" kg" />
              </div>
            ) : (
              <div className="hp-wheel-col">
                <ScrollWheel
                  items={LB_ITEMS}
                  value={Math.max(LB_MIN, Math.min(LB_MAX, localLb))}
                  onChange={onLbChange}
                  suffix=" lb"
                />
              </div>
            )}
          </div>

          {/* readout + done */}
          <div className="hp-footer">
            <span className="hp-readout">
              {clampedKg} kg
              {unit === 'lb' && ` — ${localLb} lb`}
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

export default WeightPicker;
