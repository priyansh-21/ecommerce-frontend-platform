import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import Ticket from '../components/Ticket';

export default function Orders() {
  const { session } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getMyOrders(session.token)
      .then((data) => setOrders(data.reverse()))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [session]);

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">Order history</span>
          <h1 className="page-title">Your orders</h1>
        </div>

        {loading && <div className="spinner-wrap">Loading orders…</div>}
        {error && <div className="form-error">{error}</div>}

        {!loading && orders.length === 0 && (
          <div className="empty-state">
            <h3>No orders yet</h3>
            <p>Place your first order from the catalog.</p>
          </div>
        )}

        {orders.map((order) => (
          <div className="order-card" key={order.id} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="order-card-title">Order #{order.id}</div>
                <span className={`status-badge status-${order.status}`}>{order.status}</span>
              </div>
              <Ticket amount={order.totalAmount} />
            </div>
            <div className="order-items-list">
              {order.items.map((item) => (
                <div key={item.id}>
                  <span>{item.productName} × {item.quantity}</span>
                  <span>${(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
