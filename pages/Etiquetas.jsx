import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Etiquetas() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const wsId = (typeof window !== 'undefined') ? localStorage.getItem('ws_id') : '';

  async function load() {
    const q = wsId ? `?workspaceId=${wsId}` : '';
    const data = await api('/tags' + q);
    setList(data);
  }
  useEffect(() => { load(); }, []);

  async function createTag() {
    if (!name.trim()) return;
    await api('/tags', { method: 'POST', body: { workspaceId: wsId, name: name.trim() } });
    setName(''); load();
  }

  return (
    <div className="container-xxl">
      <h1>Etiquetas</h1>
      <div className="card" style={{ maxWidth: 480 }}>
        <div style={{ display:'flex', gap:8 }}>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre etiqueta" />
          <button className="btn btn-primary" onClick={createTag}>Crear</button>
        </div>
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <ul>
          {list.map(t => <li key={t.id}>{t.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
