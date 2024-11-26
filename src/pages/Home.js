import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  if (!localStorage.getItem('email') || !localStorage.getItem('password')) {
    navigate('/signin');
  }

  return (
    <div>
      <h1>메인 페이지</h1>
    </div>
  );
};

export default Home;
