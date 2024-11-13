import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductFormPage from './pages/ProductFormPage';
import RegisterUserPage from './pages/RegisterUserPage';
import ProductCreatePage from './pages/ProductCreatePage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<><Navbar /><HomePage /></>} />
          <Route path="/product-form" element={<><Navbar /><ProductFormPage /></>} />
          <Route path="/register-user" element={<><Navbar /><RegisterUserPage /></>} />
          <Route path="/product-create" element={<><Navbar /><ProductCreatePage /></>} />
          <Route path="*" element={<Navbar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
