import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../services/api';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      window.location.reload();
    } catch (error) {
      alert('Erro ao excluir produto');
    }
  };

  return (
    <div className="card product-card">
      <div className="card-body">
        <h1 className="card-title">{product.nome}</h1>
        <p className="card-text">{product.descricao}</p>
        <h3 className="card-text"><strong>R$ {product.preco}</strong></h3>
        <div className="button-group">
          <Link to={`/product-form?id=${product.id}`} className="btn btn-warning btn-icon">
            <FaEdit />
          </Link>
          <button onClick={handleDelete} className="btn btn-danger btn-icon">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
