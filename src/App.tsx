// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [loading, setLoading] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [holdActive, setHoldActive] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (holdActive && loading < 100) {
      timerRef.current = setInterval(() => {
        setLoading((prev) => Math.min(prev + 2, 100));
      }, 30);
    } else if (loading >= 100) {
      setIsConnected(true);
    } else {
      setLoading(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [holdActive, loading]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}
          >
            <div 
              onMouseDown={() => setHoldActive(true)}
              onMouseUp={() => setHoldActive(false)}
              onTouchStart={() => setHoldActive(true)}
              onTouchEnd={() => setHoldActive(false)}
              style={{ width: '120px', height: '120px', border: '1px solid #00f2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
            >
              <span style={{ color: '#00f2ff', fontSize: '10px' }}>{loading > 0 ? `${loading}%` : 'CONNECT'}</span>
              <svg style={{ position: 'absolute', top: -2, left: -2, width: '124px', height: '124px', transform: 'rotate(-90deg)' }}>
                <circle cx="62" cy="62" r="60" stroke="#00f2ff" strokeWidth="2" fill="none" strokeDasharray="377" strokeDashoffset={377 - (377 * loading) / 100} />
              </svg>
            </div>
          </motion.div>
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', height: '100%' }}>
            <img src="/sector88.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Sector 88" />
            <div style={{ position: 'absolute', bottom: '10%', left: '10%', zIndex: 10 }}>
              <h1 style={{ color: '#00f2ff', fontSize: '42px', margin: 0, textShadow: '0 0 15px #00f2ff' }}>AI SECTOR</h1>
              <button style={{ marginTop: '20px', padding: '12px 30px', background: 'transparent', border: '1px solid #00f2ff', color: '#00f2ff' }}>START</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}