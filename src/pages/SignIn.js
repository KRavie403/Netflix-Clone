import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import logo from '../assets/logo.png';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false); // 로그인 / 회원가입 토글 상태
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false
  });

  const navigate = useNavigate();

  // 입력 값 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 로그인 / 회원가입 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(formData.email)) {
      alert("아이디는 유효한 이메일 형식이어야 합니다.");
      return;
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!formData.agreeTerms) {
        alert('약관에 동의해야 회원가입이 가능합니다.');
        return;
      }

      // TMDB API 예시 (TMDB API키를 사용하여 비밀번호를 확인하는 로직 필요)
      const API_KEY = 'YOUR_TMDB_API_KEY';  // TMDB API 키 설정
      const tmdbRequest = fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
      
      tmdbRequest.then(response => response.json()).then(data => {
        if (data.success) {
          // 회원가입 처리 (LocalStorage에 저장)
          localStorage.setItem('email', formData.email);
          localStorage.setItem('password', formData.password);
          alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
          setIsSignUp(false);
        } else {
          alert('API 연결 실패: 비밀번호 검증에 실패하였습니다.');
        }
      }).catch(error => alert('API 호출 실패'));
    } else {
      // 로그인 처리
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');

      if (formData.email === storedEmail && formData.password === storedPassword) {
        alert('로그인 성공!');
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/'); // 메인 페이지로 이동
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    }
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
        <div className="remember-me">
          아이디 기억하기
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{isSignUp ? '회원가입' : '로그인'}</button>
      </form>

      <div className="toggle-btns">
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? '이미 계정이 있나요? 로그인' : '계정이 없나요? 회원가입'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
