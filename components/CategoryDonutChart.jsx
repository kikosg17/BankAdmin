// frontend/components/CategoryDonutChart.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

export default function CategoryDonutChart({ from, to }) {
  const { token, currentWorkspace } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      if (!currentWorkspace) return;
      const q = new URLSearchParams({ workspaceId: currentWorkspace.id });
      if (from) q.set('from', from);
      if (to) q.set('to', to);
      const rows = await api(token).get(`/transactions/stats/categories?${q.toString()}`);
      setData(rows);
    }
    load();
  }, [token, currentWorkspace, from, to]);

  // Render muy simple (texto). Integra aquí tu librería de charts (recharts, apex, etc.)
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:12 }}>
      <h3>Gastos por categoría</h3>
      <ul>
        {data.map(r => (
          <li key={r.categoryId || 'none'}>
            {r.category}: <b>{Number(r.total).toLocaleString()}</b>
          </li>
        ))}
      </ul>
      <small style={{ color:'#64748b' }}>Sustituye esta lista por tu donut chart.</small>
    </div>
  );
}
