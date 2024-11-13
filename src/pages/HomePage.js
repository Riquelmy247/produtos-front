import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProductsWithFilters, fetchProducts } from '../services/api';
import '../styles/HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    precoMin: '',
    precoMax: '',
    ordenarPrecoAsc: '',
  });

  const [debounceTimeout, setDebounceTimeout] = useState(null);

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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: formatPrecoToDisplay(formattedInput),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value === 'crescente' ? true : value === 'decrescente' ? false : ''
    }));

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
    }, 500);

    setDebounceTimeout(timeout);
  };


  const fetchProductData = async () => {
    setLoading(true);
    try {
      let data;
      const filteredFilters = Object.keys(filters).reduce((acc, key) => {
        if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
          if (key === 'precoMin' || key === 'precoMax') {
            acc[key] = formatPrecoToBackend(filters[key]);
          } else {
            acc[key] = filters[key];
          }
        }
        return acc;
      }, {});

      if (Object.keys(filteredFilters).length === 0) {
        data = await fetchProducts();
      } else {
        data = await fetchProductsWithFilters(filteredFilters);
      }
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      nome: '',
      categoria: '',
      descricao: '',
      precoMin: '',
      precoMax: '',
      ordenarPrecoAsc: true,
    });
    fetchProductData();
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homepage">
      <div className="filter-container">
        <form>
          <div className="top-filters">
            <input type="text" name="nome" placeholder="Nome" value={filters.nome} onChange={handleInputChange} />
            <input type="text" name="descricao" placeholder="Descrição" value={filters.descricao} onChange={handleInputChange} />
            <input type="text" name="categoria" placeholder="Categoria" value={filters.categoria} onChange={handleInputChange} />
          </div>

          <div className="bottom-filters">
            <input
              type="text"
              name="precoMin"
              placeholder="Preço Mínimo"
              value={filters.precoMin}
              onChange={handlePrecoChange}
            />
            <input
              type="text"
              name="precoMax"
              placeholder="Preço Máximo"
              value={filters.precoMax}
              onChange={handlePrecoChange}
            />
          </div>

          <div className="sort-container">
            <select
              id="ordenarPrecoAsc"
              name="ordenarPrecoAsc"
              value={filters.ordenarPrecoAsc === true ? 'crescente' : filters.ordenarPrecoAsc === false ? 'decrescente' : 'nao'}
              onChange={handleInputChange}
            >
              <option value="nao">Ordenar por Preço: Não</option>
              <option value="crescente">Ordenar por Preço: Crescente</option>
              <option value="decrescente">Ordenar por Preço: Decrescente</option>
            </select>
          </div>


          <div className="buttons-container">
            <button type="button" className="fetch-filters" onClick={fetchProductData}>Pesquisar</button>
            <button type="button" className="clear-filters" onClick={clearFilters}>Limpar Filtros</button>
          </div>

        </form>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
