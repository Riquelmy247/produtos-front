import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  return (
    <div className="row">
      {products.length === 0 ? (
        <p className="text-center">Nenhum produto encontrado.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="col-md-4">
            <ProductCard product={product} />
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
