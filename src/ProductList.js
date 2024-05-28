import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            {/* Add additional product details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
