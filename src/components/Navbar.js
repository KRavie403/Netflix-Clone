import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import { BiSearch } from "react-icons/bi";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태에 따라 localStorage에서 사용자 정보 가져오기
    const userEmail = localStorage.getItem('currentUser');
    if (userEmail) {
      setCurrentUser(userEmail); // 사용자 이메일 상태 업데이트
    } else {
      setCurrentUser(null); // 로그인하지 않으면 null로 설정
    }
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 업데이트

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`검색된 내용: ${searchQuery}`);
    setSearchQuery('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/signin');
  };

  // 링크가 활성화 되었을 때 해당 스타일을 적용하는 함수
  const activeStyle = ({ isActive }) => isActive ? { fontWeight: 'bold', color: '#e50914' } : null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <NavLink to="/" activeClassName={styles.active}>
          <img src={logo} alt="N Logo" className={styles.logo} />
        </NavLink>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" style={activeStyle}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink to="/popular" style={activeStyle}>
            NEW! 요즘 대세 콘텐츠
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" style={activeStyle}>
            내가 찜한 리스트
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" style={activeStyle}>
            찾아보기
          </NavLink>
        </li>
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
        {currentUser && (
          <span className={styles.userEmail}> {currentUser}</span>
        )}
        <img
          src={user}
          alt="User Avatar"
          className={styles.userAvatar}
          onClick={handleDropdownToggle}
        />
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            {!isLoggedIn ? (
              <button onClick={() => navigate('/signin')}>로그아웃</button>
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
