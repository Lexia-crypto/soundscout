
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';
import TrackDetails from './pages/TrackDetails.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/track/:id"
          element={<TrackDetails />}
        />

        <Route
          path="*"
          element={<h2>Page Not Found</h2>}
        />
      </Routes>
    </div>
  );
}
