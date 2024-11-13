import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import '../styles/ProductFormPage.css';

function ProductCreatePage() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const formatPrecoToDisplay = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPrecoToBackend = (value) => {
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
  };

  const handlePrecoChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\D/g, '') / 100;
    setPreco(formatPrecoToDisplay(formattedInput));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const precoFormatted = formatPrecoToBackend(preco);
      const productData = { nome, descricao, preco: precoFormatted, categoria };

      await createProduct(productData);
      setSuccessMessage('Produto cadastrado com sucesso!');

      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      alert('Erro ao cadastrar produto');
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form">
        <h2>Cadastrar Produto</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>

          <label htmlFor="preco" className="form-label">Preço</label>
          <input
            type="text"
            id="preco"
            className="form-control"
            value={preco}
            onChange={handlePrecoChange}
            required
          />

          <label htmlFor="categoria" className="form-label">Categoria</label>
          <input
            type="text"
            id="categoria"
            className="form-control"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default ProductCreatePage;
