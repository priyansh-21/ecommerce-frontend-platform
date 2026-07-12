import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import Ticket from '../components/Ticket';
import Toast from '../components/Toast';
import { useToast } from '../components/useToast';

const emptyForm = { name: '', description: '', price: '', stock: '', category: '' };

export default function Admin() {
  const { session } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const { toast, showToast } = useToast();

  const loadProducts = () => {
    setLoading(true);
    api.getProducts().then(setProducts).finally(() => setLoading(false));
  };

  useEffect(loadProducts, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      category: form.category,
    };
    try {
      if (editingId) {
        await api.updateProduct(editingId, payload, session.token);
        showToast('Product updated');
      } else {
        await api.createProduct(payload, session.token);
        showToast('Product created');
      }
      resetForm();
      loadProducts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      stock: String(product.stock),
      category: product.category || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.deleteProduct(id, session.token);
      showToast('Product deleted');
      loadProducts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">Admin console</span>
          <h1 className="page-title">Manage inventory</h1>
        </div>

        <div className="form-card" style={{ maxWidth: 640, marginBottom: 40 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>
            {editingId ? `Editing product #${editingId}` : 'Add a new product'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div className="field" style={{ flex: 1 }}>
                <label>Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label>Stock</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label>Category</label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary">{editingId ? 'Save changes' : 'Create product'}</button>
              {editingId && (
                <button type="button" className="btn btn-outline" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {loading ? (
          <div className="spinner-wrap">Loading products…</div>
        ) : (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td><Ticket amount={p.price} variant="mustard" /></td>
                    <td>{p.stock}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-outline" onClick={() => handleEdit(p)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
