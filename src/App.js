import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import SignIn from './pages/SignIn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* 로그인 상태에 따라 Header 렌더링 */}
      {isLoggedIn && <Header />}
      
      <Routes>
        {/* 로그인 경로 */}
        <Route path="/signin" element={<SignIn onLogin={handleLogin}  onLogout={handleLogout} />} />

        {/* 로그인되지 않았으면 /signin으로 리디렉션 */}
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/popular" element={isLoggedIn ? <Popular /> : <Navigate to="/signin" />} />
        <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/signin" />} />
        <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
