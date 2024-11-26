import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false); // 검색창 열기/닫기 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태

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
        <img src={logo} alt="Netflix Logo" className={styles.logo} />
      </div>
      <ul className={styles.navLinks}>
        <li>홈</li>
        <li>NEW! 요즘 대세 콘텐츠</li>
        <li>내가 찜한 리스트</li>
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
        <i className="fas fa-search"></i>
        <i className="fas fa-bell">
          <span className={styles.notificationBadge}>6</span>
        </i>
        <img
          src={user} 
          alt="User Avatar"
          className={styles.userAvatar}
        />
        <i className="fas fa-caret-down"></i>
      </div>
    </nav>
  );
};

export default Navbar;
