import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tagline, setTagline] = useState('');
  const fullTagline = 'DROP. FASTER.';

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
          <motion.img
            src="/logo-start.ico"
            alt="Quick Drop"
            className="relative z-10 w-56 h-56 object-contain rounded-2xl"
            initial={{ scale: 0.8, opacity: 0, x: -10, rotate: -3 }}
            animate={{ scale: 1, opacity: 1, x: 0, rotate: 0, y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: 0.2,
              y: {
                duration: 1.6,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }}
          />
          <motion.div
            className="absolute inset-4 rounded-full"
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
            Quick Drop
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
