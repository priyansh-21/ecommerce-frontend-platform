const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  register: (payload) => request('/api/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: payload }),

  getProducts: () => request('/api/products'),
  getProduct: (id) => request(`/api/products/${id}`),
  createProduct: (payload, token) => request('/api/products', { method: 'POST', body: payload, token }),
  updateProduct: (id, payload, token) => request(`/api/products/${id}`, { method: 'PUT', body: payload, token }),
  deleteProduct: (id, token) => request(`/api/products/${id}`, { method: 'DELETE', token }),

  createOrder: (items, token) => request('/api/orders', { method: 'POST', body: { items }, token }),
  getMyOrders: (token) => request('/api/orders/me', { token }),

  payForOrder: (orderId, method_, token) =>
    request('/api/payments', { method: 'POST', body: { orderId, method: method_ }, token }),
};

export { API_URL };
