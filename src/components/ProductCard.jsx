import Ticket from './Ticket';

export default function ProductCard({ product, onAddToCart }) {
  const lowStock = product.stock <= 5;

  return (
    <div className="product-card">
      <span className="product-card-category">{product.category || 'General'}</span>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-desc">{product.description}</p>
      <div className="product-card-footer">
        <Ticket amount={product.price} />
        <span className={`stock-note ${lowStock ? 'low' : ''}`}>
          {product.stock > 0 ? `${product.stock} in stock` : 'out of stock'}
        </span>
      </div>
      <button
        className="btn btn-primary btn-block"
        disabled={product.stock <= 0}
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
}
