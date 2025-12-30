'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

export type AppId = 'about' | 'projects' | 'experience' | 'skills' | 'terminal';

export interface WindowState {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  zIndex: number;
}

interface DesktopCtx {
  windows: WindowState[];
  openWindow: (app: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  updateWindow: (id: string, patch: Partial<WindowState>) => void;
}

const DesktopContext = createContext<DesktopCtx | undefined>(undefined);

export const DesktopProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = (app: AppId) => {
    const id = `${app}-${Date.now()}`;
    const newWin: WindowState = {
      id,
      app,
      title: app.charAt(0).toUpperCase() + app.slice(1),
      x: 120,
      y: 120,
      width: 800,
      height: 600,
      minimized: false,
      zIndex: windows.length + 1,
    };
    setWindows((w) => [...w, newWin]);
  };

  const closeWindow = (id: string) => setWindows((w) => w.filter((win) => win.id !== id));
  const focusWindow = (id: string) =>
    setWindows((w) =>
      w.map((win) => ({ ...win, zIndex: win.id === id ? w.length + 1 : win.zIndex }))
    );
  const toggleMinimize = (id: string) =>
    setWindows((w) =>
      w.map((win) => (win.id === id ? { ...win, minimized: !win.minimized } : win))
    );
  const updateWindow = (id: string, patch: Partial<WindowState>) => {
  setWindows((w) => w.map((win) => (win.id === id ? { ...win, ...patch } : win)));
};

  return (
    <DesktopContext.Provider
      value={{ windows, openWindow, closeWindow, focusWindow, toggleMinimize, updateWindow }}
    >
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = () => {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktop must be used within DesktopProvider');
  return ctx;
};
