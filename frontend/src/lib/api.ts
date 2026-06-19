const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4038/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('roastpulse_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('roastpulse_token');
    localStorage.removeItem('roastpulse_user');
    window.location.href = '/login';
    throw new Error('Oturum süresi doldu');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Bir hata oluştu' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  health: () => fetchAPI('/health'),

  login: (email: string, password: string) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  register: (data: { email: string; password: string; firstName: string; lastName: string; roasteryName: string; city?: string }) =>
    fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  me: () => fetchAPI('/auth/me'),

  dashboardStats: () => fetchAPI('/dashboard/stats'),

  getCustomers: () => fetchAPI('/customers'),
  getCustomer: (id: string) => fetchAPI(`/customers/${id}`),
  createCustomer: (data: Record<string, unknown>) => fetchAPI('/customers', { method: 'POST', body: JSON.stringify(data) }),
  updateCustomer: (id: string, data: Record<string, unknown>) => fetchAPI(`/customers/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteCustomer: (id: string) => fetchAPI(`/customers/${id}`, { method: 'DELETE' }),

  getRoastProfiles: () => fetchAPI('/roast-profiles'),
  createRoastProfile: (data: Record<string, unknown>) => fetchAPI('/roast-profiles', { method: 'POST', body: JSON.stringify(data) }),
  updateRoastProfile: (id: string, data: Record<string, unknown>) => fetchAPI(`/roast-profiles/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  getGreenBeans: () => fetchAPI('/green-beans'),
  createGreenBean: (data: Record<string, unknown>) => fetchAPI('/green-beans', { method: 'POST', body: JSON.stringify(data) }),
  updateGreenBean: (id: string, data: Record<string, unknown>) => fetchAPI(`/green-beans/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteGreenBean: (id: string) => fetchAPI(`/green-beans/${id}`, { method: 'DELETE' }),

  getOrders: () => fetchAPI('/orders'),
  createOrder: (data: Record<string, unknown>) => fetchAPI('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrder: (id: string, data: Record<string, unknown>) => fetchAPI(`/orders/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  getCuppings: () => fetchAPI('/cuppings'),
  createCupping: (data: Record<string, unknown>) => fetchAPI('/cuppings', { method: 'POST', body: JSON.stringify(data) }),
  updateCupping: (id: string, data: Record<string, unknown>) => fetchAPI(`/cuppings/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteCupping: (id: string) => fetchAPI(`/cuppings/${id}`, { method: 'DELETE' }),
};
