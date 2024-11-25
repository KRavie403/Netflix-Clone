import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Home from './components/Home';
import Popular from './components/Popular';
// import Search from './components/Search';
// import Wishlist from './components/Wishlist';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Header />
      <Routes> {/* Switch -> Routes로 변경 */}
        {/* {<Route path="/" element={<Home />} />} */}
        <Route path="/popular" element={<Popular />} />
        {/* <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signin" element={<SignIn />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
