import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product-form">Cadastrar Produto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register-user">Cadastrar Usuário</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={logout}>Sair</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
