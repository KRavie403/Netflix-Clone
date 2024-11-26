import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('email') || !localStorage.getItem('password')) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>
      <h1>메인 페이지</h1>
    </div>
  );
};

export default Home;
