import React from 'react';

// onLogout prop을 받기 위한 타입 선언
interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header>
      <button onClick={onLogout}>로그아웃</button>
      {/* 여기에 다른 헤더 내용들 추가 */}
    </header>
  );
};

export default Header;
