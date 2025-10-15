import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Reglas() {
  const wsId = (typeof window !== 'undefined') ? localStorage.getItem('ws_id') : '';
  const [list, setList] = useState([]);
  const [name, setName] = useState('Regla por concepto');
  const [descContains, setDescContains] = useState('AMAZON');
  const [setCategoryId, setSetCategoryId] = useState('');

  async function load() {
    const q = `?workspaceId=${wsId}`;
    const data = await api().get('/rules' + q);
    setList(data);
  }

  useEffect(() => { if (wsId) load(); }, [wsId]);

  async function createRule() {
    const conditionsJSON = { descriptionContains: descContains };
    const actionsJSON = { setCategoryId: setCategoryId || null };
    await api().post('/rules', { workspaceId: wsId, name, conditionsJSON, actionsJSON });
    setName('Regla por concepto'); setDescContains(''); setSetCategoryId('');
    load();
  }

  async function runRule(id, dryRun = true) {
    const res = await api().post(`/rules/${id}/run`, { dryRun });
    alert(`${dryRun ? 'Simulación' : 'Aplicación'}: ${JSON.stringify(res)}`);
    if (!dryRun) load();
  }

  return (
    <div className="container-xxl">
      <h1>Reglas automáticas</h1>
      <div className="card" style={{ maxWidth: 640 }}>
        <h3>Nueva regla</h3>
        <div style={{ display:'grid', gap:8 }}>
          <input className="input" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Descripción contiene..." value={descContains} onChange={e=>setDescContains(e.target.value)} />
          <input className="input" placeholder="categoryId destino (opcional)" value={setCategoryId} onChange={e=>setSetCategoryId(e.target.value)} />
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-primary" onClick={createRule}>Crear</button>
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Reglas</h3>
        <ul>
          {list.map(r => (
            <li key={r.id} style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span>{r.name}</span>
              <button className="btn" onClick={() => runRule(r.id, true)}>Simular</button>
              <button className="btn btn-primary" onClick={() => runRule(r.id, false)}>Aplicar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
