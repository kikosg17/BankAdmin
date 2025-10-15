import { useState } from 'react';
import { api } from '../lib/api';

export default function Alertas() {
  const wsId = (typeof window !== 'undefined') ? localStorage.getItem('ws_id') : '';
  const [threshold, setThreshold] = useState('1000');
  const [checkDup, setCheckDup] = useState(true);
  const [result, setResult] = useState(null);

  async function run() {
    const data = await api().post('/alerts/test', {
      workspaceId: wsId, lowBalance: Number(threshold), detectDuplicates: checkDup
    });
    setResult(data);
  }

  return (
    <div className="container-xxl">
      <h1>Alertas</h1>
      <div className="card" style={{ maxWidth: 640 }}>
        <div style={{ display:'grid', gap:8 }}>
          <label>Umbral saldo bajo (€)</label>
          <input className="input" value={threshold} onChange={e=>setThreshold(e.target.value)} />
          <label><input type="checkbox" checked={checkDup} onChange={e=>setCheckDup(e.target.checked)} /> Detectar cargos duplicados</label>
          <button className="btn btn-primary" onClick={run}>Probar alertas</button>
        </div>
      </div>
      {result && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Resultados</h3>
          <pre style={{ whiteSpace:'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
