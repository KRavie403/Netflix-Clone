import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 상태
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false,
  });
  const navigate = useNavigate();

  // 폼 데이터 변경 처리
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = formData;

    // 이메일 형식 검사
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      return;
    }

    // Local Storage에 저장
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }

    // 로그인 성공 처리
    if (email === localStorage.getItem('email') && password === localStorage.getItem('password')) {
      toast.success('로그인 성공!');
      navigate('/');
    } else {
      toast.error('로그인 실패! 아이디나 비밀번호를 확인하세요.');
    }
  };

  // 회원가입 처리
  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, agreeTerms } = formData;

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreeTerms) {
      toast.error('약관에 동의해야 합니다.');
      return;
    }

    // 회원가입 성공 처리
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    toast.success('회원가입 성공! 로그인 페이지로 이동합니다.');
    setIsLogin(true); // 로그인 창으로 전환
  };

  return (
    <div className="signin-container">
      <h1>{isLogin ? '로그인' : '회원가입'}</h1>
      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              약관 동의
            </label>
          </>
        )}
        {isLogin && (
          <>
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              로그인 상태 유지
            </label>
          </>
        )}
        <button type="submit">{isLogin ? '로그인' : '회원가입'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '회원가입' : '로그인'} 화면으로 전환
      </button>
    </div>
  );
};

export default SignIn;
