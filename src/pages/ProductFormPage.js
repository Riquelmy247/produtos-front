import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchProductById, createProduct, updateProduct } from '../services/api';
import '../styles/ProductFormPage.css';

function ProductFormPage() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const product = await fetchProductById(productId);
          setNome(product.nome);
          setDescricao(product.descricao);
          setPreco(formatPrecoToDisplay(product.preco));
          setCategoria(product.categoria);
        } catch (error) {
          alert('Erro ao carregar produto');
        }
      };
      fetchProduct();
    }
  }, [productId]);

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

      if (productId) {
        await updateProduct(productId, productData);
        setSuccessMessage('Produto editado com sucesso!');
      } else {
        await createProduct(productData);
        setSuccessMessage('Produto cadastrado com sucesso!');
      }
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      alert('Erro ao salvar produto');
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form">
        <h2>{productId ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
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

          <label htmlFor="categoria" className="form-label">Categoria</label>
          <input
            type="text"
            id="categoria"
            className="form-control"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />

          <label htmlFor="preco" className="form-label">Preço</label>
          <input
            type="text"
            id="preco"
            className="form-control"
            value={preco}
            onChange={handlePrecoChange}
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

          <button type="submit" className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;
