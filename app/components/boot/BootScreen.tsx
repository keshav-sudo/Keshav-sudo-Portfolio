'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((p) => {
        const next = p + Math.random() * 12;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 600);
        }
        return Math.min(next, 100);
      });
    }, 250);
    return () => clearInterval(interval);
  }, [onDone]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-[#2C001E] text-white"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src="/ubuntu-logo.svg" alt="Ubuntu" className="w-28 h-28 mb-6 animate-pulse" />
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>
        <p className="mt-3 text-sm">{Math.round(pct)}% – Initialising…</p>
      </motion.div>
    </AnimatePresence>
  );
};
