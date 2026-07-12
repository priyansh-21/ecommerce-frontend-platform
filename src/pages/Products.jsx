import { useEffect, useState } from 'react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useToast } from '../components/useToast';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();
  const { toast, showToast } = useToast();

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (product) => {
    addItem(product);
    showToast(`Added "${product.name}" to cart`);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">Catalog · {products.length} items</span>
          <h1 className="page-title">Browse the stockroom</h1>
          <p className="page-subtitle">
            Live inventory pulled straight from the Product service — stock counts and
            prices update as orders are placed.
          </p>
        </div>

        {loading && <div className="spinner-wrap">Loading products…</div>}
        {error && <div className="form-error">{error}</div>}

        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <h3>No products yet</h3>
            <p>Sign in as an admin to add the first item to the catalog.</p>
          </div>
        )}

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
          ))}
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
