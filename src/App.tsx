import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.tsx';  // Navbar를 Header로 사용
import Home from './pages/Home.tsx';
import Popular from './pages/Popular.tsx';
import Search from './pages/Search.tsx';
import Wishlist from './pages/Wishlist.tsx';
import SignIn from './pages/SignIn.tsx';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 로그인 상태 초기화 (localStorage에서 값 가져오기)
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    if (currentUser && loggedInStatus) {
      setIsLoggedIn(true);  // 로그인 상태가 true이면 isLoggedIn을 true로 설정
    }
  }, []);

  // 로그인 상태 변경 함수
  const handleLogin = (): void => {
    setIsLoggedIn(true); // 로그인 상태 업데이트
    localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 localStorage에 저장
  };

  // 로그아웃 상태 변경 함수
  const handleLogout = (): void => {
    setIsLoggedIn(false); // 로그인 상태 업데이트
    localStorage.removeItem('isLoggedIn'); // 로그인 상태 삭제
    localStorage.removeItem('currentUser'); // 사용자 정보 삭제
  };

  return (
    <Router>
      {/* 로그인 상태에 따라 Navbar 렌더링 */}
      {isLoggedIn && <Navbar onLogout={handleLogout} />} {/* 로그인 상태일 때만 Navbar 보이기 */}

      <Routes>
        <Route
          path="/signin"
          element={<SignIn onLogin={handleLogin} onLogout={handleLogout} />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/popular"
          element={isLoggedIn ? <Popular /> : <Navigate to="/signin" />}
        />
        <Route
          path="/search"
          element={isLoggedIn ? <Search /> : <Navigate to="/signin" />}
        />
        <Route
          path="/wishlist"
          element={isLoggedIn ? <Wishlist /> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
