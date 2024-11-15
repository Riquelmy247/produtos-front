import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProductsWithFilters, fetchProducts } from '../services/api';
import '../styles/HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [names, setNames] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    quantidade: '',
    precoMin: '',
    precoMax: '',
    ordenarPreco: 0,
    ordenarQuantidade: 0,
    ordenarNome: 0,
    ordenarCategoria: 0,
  });

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

    if (name === 'quantidade' && (value === '' || parseInt(value) <= 0)) {
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === 'crescente' ? 1 : value === 'decrescente' ? 2 : value === 'nao' ? 0 : value,
    }));
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
        console.log('Produtos retornados:', data);
        const uniqueNames = [...new Set(data.map((product) => product.nome))];
        const uniqueCategories = [...new Set(data.map((product) => product.categoria))];

        setNames(uniqueNames);
        setCategories(uniqueCategories);
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
      quantidade: '',
      precoMin: '',
      precoMax: '',
      ordenarPreco: 0,
      ordenarQuantidade: 0,
      ordenarNome: 0,
      ordenarCategoria: 0,
    });
    fetchProductData();
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueNames = [...new Set(products.map((product) => product.nome))];
      const uniqueCategories = [...new Set(products.map((product) => product.categoria))];
      setNames(uniqueNames);
      setCategories(uniqueCategories);
    }
  }, [products]);

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
            <select
              name="nome"
              value={filters.nome}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Selecione um Nome</option>
              {names.length > 0 ? (
                names.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              ) : (
                <option disabled>Nenhum nome disponível</option>
              )}
            </select>

            <input
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={filters.descricao}
              onChange={handleInputChange}
            />

            <select
              name="categoria"
              value={filters.categoria}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Selecione uma Categoria</option>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              ) : (
                <option disabled>Nenhuma categoria disponível</option>
              )}
            </select>

            <input
              type="number"
              name="quantidade"
              placeholder="Quantidade"  
              min="1"
              value={filters.quantidade}
              onChange={handleInputChange}
            />
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
              id="ordenarNome"
              name="ordenarNome"
              value={
                filters.ordenarNome === 1
                  ? 'crescente'
                  : filters.ordenarNome === 2
                    ? 'decrescente'
                    : 'nao'
              }
              onChange={handleInputChange}
            >
              <option value="nao">Ordenar Nome: Não</option>
              <option value="crescente">Ordenar Nome: Crescente</option>
              <option value="decrescente">Ordenar Nome: Decrescente</option>
            </select>

            <select
              id="ordenarCategoria"
              name="ordenarCategoria"
              value={
                filters.ordenarCategoria === 1
                  ? 'crescente'
                  : filters.ordenarCategoria === 2
                    ? 'decrescente'
                    : 'nao'
              }
              onChange={handleInputChange}
            >
              <option value="nao">Ordenar Categoria: Não</option>
              <option value="crescente">Ordenar Categoria: Crescente</option>
              <option value="decrescente">Ordenar Categoria: Decrescente</option>
            </select>

            <select
              id="ordenarQuantidade"
              name="ordenarQuantidade"
              value={
                filters.ordenarQuantidade === 1
                  ? 'crescente'
                  : filters.ordenarQuantidade === 2
                    ? 'decrescente'
                    : 'nao'
              }
              onChange={handleInputChange}
            >
              <option value="nao">Ordenar Quantidade: Não</option>
              <option value="crescente">Ordenar Quantidade: Crescente</option>
              <option value="decrescente">Ordenar Quantidade: Decrescente</option>
            </select>

            <select
              id="ordenarPreco"
              name="ordenarPreco"
              value={
                filters.ordenarPreco === 1
                  ? 'crescente'
                  : filters.ordenarPreco === 2
                    ? 'decrescente'
                    : 'nao'
              }
              onChange={handleInputChange}
            >
              <option value="nao">Ordenar Preço: Não</option>
              <option value="crescente">Ordenar Preço: Crescente</option>
              <option value="decrescente">Ordenar Preço: Decrescente</option>
            </select>
          </div>

          <div className="buttons-container">
            <button type="button" className="fetch-filters" onClick={fetchProductData}>
              Pesquisar
            </button>
            <button type="button" className="clear-filters" onClick={clearFilters}>
              Limpar Filtros
            </button>
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
