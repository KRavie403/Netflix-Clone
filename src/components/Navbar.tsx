import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import { BiSearch } from "react-icons/bi";

// Navbar 컴포넌트에서 onLogout을 props로 받기
interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();

  // 로그인 상태 확인 및 사용자 정보 설정
  useEffect(() => {
    const userEmail = localStorage.getItem('currentUser');
    if (userEmail) {
      setCurrentUser(userEmail); // 로그인한 사용자 정보 업데이트
    } else {
      setCurrentUser(null); // 로그인하지 않으면 null 설정
    }
  }, []); // 초기 렌더링 시에만 실행 (로그인 상태는 localStorage에서 확인)

  // 드롭다운 토글 함수
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 검색창 토글 함수
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  // 검색어 입력 처리 함수
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 검색 폼 제출 처리 함수
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`검색된 내용: ${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
          <img src={logo} alt="N Logo" className={styles.logo} />
        </NavLink>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink to="/popular" className={({ isActive }) => isActive ? styles.active : ''}>
            NEW! 요즘 대세 콘텐츠
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? styles.active : ''}>
            내가 찜한 리스트
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => isActive ? styles.active : ''}>
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
          <span className={styles.userEmail}>{currentUser}</span>
        )}
        <img
          src={user}
          alt="User Avatar"
          className={styles.userAvatar}
          onClick={handleDropdownToggle}
        />
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            {currentUser ? (
              <button onClick={onLogout}>로그아웃</button> // 로그인 상태일 때 로그아웃 버튼
            ) : (
              <button onClick={() => navigate('/signin')}>로그인</button> // 로그인 안 한 상태에서 로그인 버튼
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
