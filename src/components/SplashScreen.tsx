import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tagline, setTagline] = useState('');
  const fullTagline = 'TRUST. MOVES. FASTER.';

  useEffect(() => {
    const milestones = [0, 30, 70, 95, 100];
    let idx = 0;

    const progressInterval = setInterval(() => {
      if (idx < milestones.length) {
        setProgress(milestones[idx]);
        idx++;
      } else {
        clearInterval(progressInterval);
      }
    }, 600);

    let charIdx = 0;
    const taglineInterval = setInterval(() => {
      if (charIdx < fullTagline.length) {
        setTagline(fullTagline.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(taglineInterval);
      }
    }, 120);

    const timeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(taglineInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#1A2A3A' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with stroke animation */}
        <div className="relative">
          <svg width="80" height="80" viewBox="0 0 80 80" className="relative z-10">
            <motion.path
              d="M28 24 L28 40 Q28 48 36 48 L44 48 Q52 48 52 40 L52 24"
              stroke="#FF6B35"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.path
              d="M20 44 L28 36 L40 44 L52 36 L60 44"
              stroke="#FF6B35"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.6 }}
            />
            <motion.circle
              cx="40"
              cy="40"
              r="4"
              fill="#FF6B35"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'backOut', delay: 1.5 }}
            />
          </svg>
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ border: '2px solid rgba(255, 107, 53, 0.2)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.8 }}
          />
        </div>

        {/* Brand name */}
        <div className="text-center">
          <motion.h1
            className="text-2xl font-bold tracking-wider text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Trusted Relay
          </motion.h1>
          <div className="mt-2 h-6 flex items-center justify-center">
            <span className="font-mono text-xs tracking-[0.3em] text-[#FF6B35] uppercase">
              {tagline}
            </span>
            <AnimatePresence>
              {tagline.length < fullTagline.length && (
                <motion.span
                  className="font-mono text-xs text-[#FF6B35]"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                >
                  |
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-16 left-8 right-8">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#FF6B35]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <span className="font-mono text-[10px] text-white/40">LOADING</span>
          <span className="font-mono text-[10px] text-white/40">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
