import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import logo from '../assets/logo.png';

const SignIn = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false); // 로그인 / 회원가입 토글 상태
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false
  });

  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // 로그인/회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      alert('아이디는 유효한 이메일 형식이어야 합니다.');
      return;
    }

    if (isSignUp) {
      // 회원가입 로직
      if (formData.password !== formData.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!formData.agreeTerms) {
        alert('약관에 동의해야 회원가입이 가능합니다.');
        return;
      }

      try {
        // TMDB 인증 토큰 생성 요청
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
        );
        const data = await response.json();

        if (data.success) {
          localStorage.setItem('authToken', data.request_token); // 토큰 저장
          localStorage.setItem('email', formData.email); // 이메일 저장
          localStorage.setItem('password', formData.password); // 비밀번호 저장
          alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
          setIsSignUp(false); // 로그인 화면으로 전환
        } else {
          alert(`회원가입 실패: ${data.status_message}`);
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
        alert('회원가입 중 문제가 발생했습니다.');
      }
    } else {
      // 로그인 로직
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
      const storedToken = localStorage.getItem('authToken');

      if (
        formData.email === storedEmail &&
        formData.password === storedPassword &&
        storedToken
      ) {
        alert('로그인 성공!');
        localStorage.setItem('currentUser', formData.email);
        onLogin();
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/'); // 메인 페이지로 이동
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    }
  };

  // 로그인 / 회원가입 상태 변경 시 체크박스 초기화
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false, // "아이디 기억하기" 체크박스 리셋
      agreeTerms: false // "약관 동의" 체크박스 리셋
    });
  };


  return (
    <div className="signin-container transition-container">
      <div className='logo-container'>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <h2>{isSignUp ? '회원가입' : '로그인'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {isSignUp && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <div className="terms">
              약관에 동의합니다.
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}
        {!isSignUp && (
          <div className="remember-me">
            아이디 기억하기
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button type="submit">{isSignUp ? '회원가입' : '로그인'}</button>
      </form>

      <div className="toggle-btns">
        <button onClick={() => {
            setIsSignUp(!isSignUp);
            toggleSignUp();  
          }}
        >
          {isSignUp ? '이미 계정이 있나요? 로그인' : '계정이 없나요? 회원가입'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
