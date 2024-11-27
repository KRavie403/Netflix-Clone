import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import logo from '../assets/logo.png';

interface SignInProps {
  onLogin: () => void;
  onLogout: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin, onLogout }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false,
  });

  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      alert('아이디는 유효한 이메일 형식이어야 합니다.');
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

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
        );
        const data = await response.json();

        if (data.success) {
          localStorage.setItem('authToken', data.request_token);
          localStorage.setItem('email', formData.email);
          localStorage.setItem('TMDB-Key', formData.password);
          alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
          setIsSignUp(false);
        } else {
          alert(`회원가입 실패: ${data.status_message}`);
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
        alert('회원가입 중 문제가 발생했습니다.');
      }
    } else {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('TMDB-Key');
      const storedToken = localStorage.getItem('authToken');

      if (
        formData.email === storedEmail &&
        formData.password === storedPassword &&
        storedToken
      ) {
        alert('로그인 성공!');
        localStorage.setItem('currentUser', formData.email); // 이메일을 localStorage에 저장
        onLogin(); // 부모 컴포넌트에 로그인 상태 전달
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/');
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      agreeTerms: false,
    });
  };

  return (
    <div className="signin-container transition-container">
      <div className="logo-container">
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
        <button onClick={toggleSignUp}>
          {isSignUp ? '이미 계정이 있나요? 로그인' : '계정이 없나요? 회원가입'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
