import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import '../styles/RegisterUserPage.css';

function RegisterUserPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(nome, email, senha);
      setSuccessMessage('Usuário cadastrado com sucesso!');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="register-user-form-container">
      <div className="register-user-form">
        <h2>Cadastrar Usuário</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btnn btn-primary">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUserPage;
