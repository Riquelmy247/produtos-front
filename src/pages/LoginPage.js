import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, senha);

      if (response.status === 200) {
        navigate('/home');
      } else {
        setErrorMessage('Credenciais inválidas.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
