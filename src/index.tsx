import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // DOM 요소에 대한 타입 명시
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 웹 성능 측정 관련 함수 호출
reportWebVitals();
