// frontend/lib/api.js
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

function authHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('auth_token');
  const wsId = localStorage.getItem('ws_id');
  return {
    Authorization: token ? `Bearer ${token}` : undefined,
    'x-workspace-id': wsId || undefined,
  };
}

async function handle(res) {
  if (!res.ok) {
    let err;
    try { err = await res.json(); } catch (_) {}
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export function api(token) {
  const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    'Content-Type': 'application/json'
  };
  const req = async (path, opts) =>
    fetch(BASE + path, { headers, ...opts }).then(handle);
  return {
    get: (path) => req(path, { method: 'GET' }),
    post: (path, body) => req(path, { method: 'POST', body: JSON.stringify(body) }),
    put: (path, body) => req(path, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (path) => req(path, { method: 'DELETE' })
  };
}
