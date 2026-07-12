import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { session, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          Stockroom<span className="brand-mark">.</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Catalog</Link>
          <Link to="/cart">Cart{count > 0 && <span className="cart-badge">{count}</span>}</Link>
          {session && <Link to="/orders">Orders</Link>}
          {session?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
          {session ? (
            <button onClick={handleLogout}>Sign out ({session.username})</button>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
