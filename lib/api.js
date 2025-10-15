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

export function api(path, { method = 'GET', body } = {}) {
  const headers = authHeaders();
  const opts = { method, headers };

  if (body instanceof FormData) {
    // NO poner Content-Type: el navegador setea el boundary
    opts.body = body;
  } else if (body != null) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }

  return fetch(`${BASE}${path}`, opts).then(handle);
}
