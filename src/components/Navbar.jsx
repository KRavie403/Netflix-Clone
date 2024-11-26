import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false); // 검색창 열기/닫기 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 메뉴 열기/닫기 상태
  const navigate = useNavigate();

  // 프로필 클릭 시 드롭다운 열기/닫기
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 후 로그인 상태 false로 변경
    navigate("/login"); // 로그인 화면으로 이동
  };

  // 로그인 화면으로 이동
  const handleLogin = () => {
    navigate("/login"); // 로그인 화면으로 이동
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen); // 검색창 열고 닫기 토글
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // 검색어 업데이트
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`검색된 내용: ${searchQuery}`); // 검색 동작 (알림으로 표시)
    setSearchQuery(''); // 입력 초기화
  };


  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <NavLink to="/home" activeClassName={styles.active}>
          <img src={logo} alt="Netflix Logo" className={styles.logo} />
        </NavLink>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/home" activeClassName={styles.active}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink to="/popular" activeClassName={styles.active}>
            NEW! 요즘 대세 콘텐츠
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" activeClassName={styles.active}>
            내가 찜한 리스트
          </NavLink>
        </li>
        <li>언어별로 찾아보기</li>
        <li className={styles.searchContainer}>
          <BiSearch
            className={styles.searchIcon}
            onClick={handleSearchToggle}
            size={20}
          />
          {searchOpen && (
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="검색"
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                검색
              </button>
            </form>
          )}
        </li>
      </ul>
      <div className={styles.userActions}>
        <img
          src={user}
          alt="User Avatar"
          className={styles.userAvatar}
          onClick={handleDropdownToggle}
        />
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            {!isLoggedIn ? (
              <button onClick={handleLogin}>로그인</button>
            ) : (
              <button onClick={handleLogout}>로그아웃</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
