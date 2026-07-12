import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import Ticket from '../components/Ticket';
import Toast from '../components/Toast';
import { useToast } from '../components/useToast';
import { useState } from 'react';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast, showToast } = useToast();
  const [placing, setPlacing] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      navigate('/login');
      return;
    }
    setPlacing(true);
    try {
      const orderItems = items.map((i) => ({ productId: i.product.id, quantity: i.quantity }));
      const order = await api.createOrder(orderItems, session.token);
      await api.payForOrder(order.id, 'CARD', session.token);
      clearCart();
      showToast('Order placed and paid successfully!');
      setTimeout(() => navigate('/orders'), 900);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">Your selections</span>
          <h1 className="page-title">Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Add something from the catalog to get started.</p>
          </div>
        ) : (
          <>
            {items.map(({ product, quantity }) => (
              <div className="cart-row" key={product.id}>
                <div className="cart-row-info">
                  <h4>{product.name}</h4>
                  <Ticket amount={product.price} variant="sage" />
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                  <button className="btn btn-danger" onClick={() => removeItem(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 24,
                paddingTop: 20,
                borderTop: '2px solid var(--color-line)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Total</span>
              <Ticket amount={total} />
            </div>

            <button
              className="btn btn-primary btn-block"
              style={{ marginTop: 20 }}
              onClick={handleCheckout}
              disabled={placing}
            >
              {placing ? 'Placing order…' : session ? 'Place order & pay' : 'Sign in to check out'}
            </button>
          </>
        )}
      </div>
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
