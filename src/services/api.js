import axios from 'axios';

const api = 'http://localhost:8080';
export const usuariosLogin = `${api}/usuarios/login`;
export const produtosFiltro = `${api}/produtos/filtro`;
export const produtos = `${api}/produtos`;
export const usuarios = `${api}/usuarios`;
export const usuariosCadastrar = `${api}/usuarios/cadastrar`;


// Função de login
export const login = async (email, senha) => {
  const response = await fetch(usuariosLogin, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas ou erro na autenticação.');
  }
  return response;
};

// Função para buscar produtos
export const fetchProducts = async () => {
  try {
    const response = await fetch(produtos);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos.');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Função para deletar produtos
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${produtos}/${productId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar produto.');
    }
  } catch (error) {
    throw error;
  }
};

// Função para buscar produtos por id
export const fetchProductById = async (id) => {
  const response = await axios.get(`${produtos}/${id}`);
  return response.data;
};

// Função para cadastrar produtos
export const createProduct = async (productData) => {
  const response = await axios.post(produtos, productData);
  return response.data;
};

// Função para atualizar produtos
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${produtos}/${id}`, productData);
  return response.data;
};

// Função para cadastrar usuarios
export const registerUser = async (nome, email, senha) => {
  try {
    const response = await axios.post(usuariosCadastrar, { nome, email, senha });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para buscar produtos com filtro
export const fetchProductsWithFilters = async (filters) => {
  const params = {
    nome: filters.nome,
    categoria: filters.categoria,
    descricao: filters.descricao,
    precoMin: filters.precoMin || undefined,
    precoMax: filters.precoMax || undefined,
    quantidade: filters.quantidade === 0 ? undefined : filters.quantidade,
    ordenarPreco: filters.ordenarPreco === 0 ? undefined : filters.ordenarPreco,
    ordenarQuantidade: filters.ordenarQuantidade === 0 ? undefined : filters.ordenarQuantidade,
    ordenarNome: filters.ordenarNome === 0 ? undefined : filters.ordenarNome,
    ordenarCategoria: filters.ordenarCategoria === 0 ? undefined : filters.ordenarCategoria,
  };

  const { data } = await axios.get(produtosFiltro, { params });
  return data;
};
