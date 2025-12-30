'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactIcon as HomeIcon, NodeIcon as FolderIcon, GitIcon as BriefcaseIcon, TailwindIcon as CodeIcon, GitHubIcon as TerminalIcon } from '@/components/Icons';
import { useDesktop } from '@/app/context/DesktopContext';

export const StartMenu = () => {
  const { openWindow } = useDesktop();
  const apps = [
    { id: 'about' as const, label: 'About Me', icon: HomeIcon },
    { id: 'projects' as const, label: 'Projects', icon: FolderIcon },
    { id: 'experience' as const, label: 'Experience', icon: BriefcaseIcon },
    { id: 'skills' as const, label: 'Skills', icon: CodeIcon },
    { id: 'terminal' as const, label: 'Terminal', icon: TerminalIcon },
  ];

  const handleOpen = (appId: typeof apps[number]['id']) => {
    openWindow(appId);
  };

  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.05 } },
    item: { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-4 bg-[#2C001E] rounded-lg shadow-xl overflow-hidden w-56"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
      >
        {apps.map((app) => (
          <motion.button
            key={app.id}
            className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/10"
            onClick={() => handleOpen(app.id)}
            variants={variants.item}
          >
            <app.icon className="w-5 h-5 mr-2" />
            {app.label}
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
