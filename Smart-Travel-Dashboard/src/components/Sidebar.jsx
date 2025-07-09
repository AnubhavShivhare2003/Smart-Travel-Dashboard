import React from 'react';
import { Sun, Moon, MapPin, Cloud, Home, List, Settings, User, Save, Download, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', icon: Home },
  { name: 'Travel History', icon: List },
  { name: 'Map', icon: MapPin },
  { name: 'Weather', icon: Cloud },
  { name: 'Settings', icon: Settings },
];

export default function Sidebar({ open, setOpen, onThemeToggle, darkMode, onSaveLocation, onExportHistory }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside className={`fixed z-30 top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <button
          type="button"
          className="absolute top-4 right-4 z-[9999] bg-red-600 text-white border-4 border-yellow-400 rounded-full p-3 shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
          style={{ boxShadow: '0 0 0 6px rgba(0,0,0,0.25)' }}
        >
          <span className="font-bold mr-2">Close</span>
          <X size={32} />
        </button>
        <div className="flex flex-col items-center py-8 border-b border-gray-200 dark:border-gray-800">
          <img src="/mountainPhoto.avif" alt="Logo" className="w-16 h-16 rounded-full object-cover mb-2 shadow" />
          <span className="font-bold text-lg text-primary-700 dark:text-primary-300">Smart Travel</span>
          <div className="mt-2 flex items-center gap-2">
            <User className="text-gray-400" size={18} />
            <span className="text-xs text-gray-500 dark:text-gray-400">Guest</span>
          </div>
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            {navLinks.map(link => (
              <li key={link.name}>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 transition">
                  <link.icon size={20} className="text-primary-600 dark:text-primary-400" />
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
          <button className="btn-primary flex items-center gap-2 justify-center" onClick={onSaveLocation}>
            <Save size={18} /> Save Location
          </button>
          <button className="btn-secondary flex items-center gap-2 justify-center" onClick={onExportHistory}>
            <Download size={18} /> Export History
          </button>
          <button
            className="mt-2 flex items-center gap-2 justify-center w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={onThemeToggle}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>
    </>
  );
} 