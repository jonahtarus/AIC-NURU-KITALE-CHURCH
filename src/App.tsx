/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, Sermon, ChurchEvent } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AudioDock } from './components/AudioDock';
import { VideoModal } from './components/VideoModal';
import { MpesaModal } from './components/MpesaModal';
import { RegistrationModal } from './components/RegistrationModal';
import { HomePage } from './pages/HomePage';
import { SermonsPage } from './pages/SermonsPage';
import { ChoirPage } from './pages/ChoirPage';
import { GivingPage } from './pages/GivingPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { PlanVisitPage } from './pages/PlanVisitPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ChurchDataProvider, useChurchData } from './context/ChurchDataContext';
import { SERMONS_DATA } from './data/churchData';

function AppContent() {
  const { currentUser, isAdmin, authLoading } = useChurchData();
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [activeAudioSermon, setActiveAudioSermon] = useState<Sermon | null>(null);
  const [activeVideoSermon, setActiveVideoSermon] = useState<Sermon | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<ChurchEvent | null>(null);
  const [mpesaModalOpen, setMpesaModalOpen] = useState(false);
  const [mpesaDesignation, setMpesaDesignation] = useState('TITHE');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check if current URL is pointing to /admin
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      return (
        path === '/admin' ||
        path === '/admin/' ||
        hash === '#admin' ||
        search.includes('view=admin')
      );
    }
    return false;
  });

  // Listen to browser navigation changes (popstate & hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const isAdm =
        path === '/admin' ||
        path === '/admin/' ||
        hash === '#admin' ||
        search.includes('view=admin');
      setIsAdminRoute(isAdm);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleExitAdmin = () => {
    if (window.location.pathname.toLowerCase().startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    }
    if (window.location.hash.toLowerCase() === '#admin') {
      window.history.pushState({}, '', window.location.pathname);
    }
    setIsAdminRoute(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  const handleOpenLive = () => {
    setActiveVideoSermon(SERMONS_DATA[0]);
  };

  const handleOpenGivingWithDesignation = (code: string = 'TITHE') => {
    setMpesaDesignation(code);
    setMpesaModalOpen(true);
  };

  // If URL is /admin, render either the Admin Login or Admin Dashboard
  if (isAdminRoute) {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#00162c] flex flex-col items-center justify-center text-white space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#c59331] border-t-transparent animate-spin"></div>
          <p className="font-serif text-sm text-[#ffdea9] tracking-wider uppercase">
            AIC Nuru Kitale • Securing Administrator Session...
          </p>
        </div>
      );
    }

    if (!currentUser || !isAdmin) {
      return (
        <AdminLogin
          onSuccess={() => {}}
          onExitAdmin={handleExitAdmin}
        />
      );
    }

    return <AdminDashboard onExitAdmin={handleExitAdmin} />;
  }

  // Otherwise, render Public Website
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfe] text-[#061324] font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#00162c] text-[#ffffff] shadow-2xl border border-[#c59331] animate-slideUp">
          <span className="material-symbols-outlined text-[#98f5c9] text-xl">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Public Header */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onOpenLiveService={handleOpenLive}
        onOpenGiving={() => setCurrentTab('give')}
      />

      {/* Main Page Canvas with Top Padding to account for fixed header */}
      <main className="flex-1 w-full pt-28">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={setCurrentTab}
            onPlaySermonAudio={(s) => setActiveAudioSermon(s)}
            onOpenSermonVideo={(s) => setActiveVideoSermon(s)}
            onRegisterEvent={(e) => setRegisteringEvent(e)}
            onOpenGiving={() => handleOpenGivingWithDesignation('TITHE')}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'sermons' && (
          <SermonsPage
            onPlayAudio={(s) => setActiveAudioSermon(s)}
            onOpenVideo={(s) => setActiveVideoSermon(s)}
          />
        )}

        {currentTab === 'choir' && (
          <ChoirPage />
        )}

        {currentTab === 'events' && (
          <EventsPage
            onRegisterEvent={(e) => setRegisteringEvent(e)}
          />
        )}

        {currentTab === 'give' && (
          <GivingPage
            onOpenMpesaModal={(code) => handleOpenGivingWithDesignation(code)}
            onCopyText={handleCopyText}
          />
        )}

        {currentTab === 'about-us' && (
          <AboutPage onNavigate={setCurrentTab} />
        )}

        {currentTab === 'ministries' && (
          <MinistriesPage />
        )}

        {currentTab === 'plan-visit' && (
          <PlanVisitPage />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Continuous Audio Player Dock */}
      <AudioDock
        currentSermon={activeAudioSermon}
        onClose={() => setActiveAudioSermon(null)}
      />

      {/* Video Stream Modal */}
      <VideoModal
        sermon={activeVideoSermon}
        onClose={() => setActiveVideoSermon(null)}
        onPlayAudioInstead={(s) => setActiveAudioSermon(s)}
      />

      {/* Event Registration Modal */}
      <RegistrationModal
        event={registeringEvent}
        onClose={() => setRegisteringEvent(null)}
      />

      {/* Lipa na M-Pesa Interactive Modal */}
      <MpesaModal
        isOpen={mpesaModalOpen}
        initialDesignation={mpesaDesignation}
        onClose={() => setMpesaModalOpen(false)}
      />

      {/* Floating Action Button: Message Pastoral Care */}
      <div
        className={`fixed z-40 transition-all duration-300 right-5 sm:right-6 ${
          activeAudioSermon ? 'bottom-24 sm:bottom-28' : 'bottom-6'
        }`}
      >
        <button
          onClick={() => {
            if (currentTab === 'home') {
              const el = document.getElementById('contact-prayer');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const input = el.querySelector('input') as HTMLInputElement | null;
                if (input) {
                  setTimeout(() => input.focus(), 450);
                }
                return;
              }
            }
            setCurrentTab('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              const el = document.getElementById('contact-prayer');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const input = el.querySelector('input') as HTMLInputElement | null;
                if (input) input.focus();
              }
            }, 350);
          }}
          type="button"
          aria-label="Send a Prayer Request or Inquiry"
          title="Send a Prayer Request or Inquiry to Pastoral Care"
          className="group flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#061324] text-white text-xs sm:text-sm font-bold shadow-[0_10px_35px_rgba(6,19,36,0.45)] border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#0b1e36] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
            </svg>
          </span>
          <span className="tracking-wide">Message Pastoral Care</span>
          <span className="material-symbols-outlined text-[16px] text-amber-300 opacity-80 group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Main Footer */}
      <Footer onNavigate={setCurrentTab} />
    </div>
  );
}

export default function App() {
  return (
    <ChurchDataProvider>
      <AppContent />
    </ChurchDataProvider>
  );
}
