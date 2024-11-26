import React from 'react';
import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import user from '../assets/user.png';

const Navbar = () => {
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
