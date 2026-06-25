// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import CreatePage from './pages/CreatePage';
import RemindersPage from './pages/RemindersPage';
import ProfilePage from './pages/ProfilePage';
import WishViewPage from './pages/WishViewPage';

// Pages that hide the bottom nav on mobile (create has its own navigation)
const HIDE_BOTTOM_NAV_PATHS = ['/wish/', '/create'];
// Pages that hide the sidebar too
const HIDE_ALL_NAV_PATHS = ['/wish/'];

export default function App() {
  const location = useLocation();
  const showSidebar = !HIDE_ALL_NAV_PATHS.some((p) => location.pathname.startsWith(p));
  const showBottomNav = !HIDE_BOTTOM_NAV_PATHS.some((p) => location.pathname.startsWith(p));
  const isWishView = location.pathname.startsWith('/wish/');

  if (isWishView) {
    return (
      <Routes>
        <Route path="/wish/:wishId" element={<WishViewPage />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0F0A1E]">
      {/* Desktop sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wish/:wishId" element={<WishViewPage />} />
            <Route
              path="*"
              element={
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center min-h-screen">
                  <span className="text-6xl">🌾</span>
                  <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
                  <p className="text-gray-400 text-sm">The page you're looking for doesn't exist.</p>
                  <a href="/" className="text-orange-400 hover:text-orange-300 font-medium underline">
                    Go Home
                  </a>
                </div>
              }
            />
          </Routes>
        </div>

        {/* Mobile bottom nav — hidden on md+ and on create page */}
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
