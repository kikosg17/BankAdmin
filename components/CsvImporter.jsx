// frontend/components/CsvImporter.jsx
import { useRef, useState } from 'react';
import { api } from '../lib/api';

export default function CsvImporter({ onDone }) {
  const inputRef = useRef(null);
  const [accountName, setAccountName] = useState('Cuenta CSV');
  const [currency, setCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const wsId = (typeof window !== 'undefined') ? localStorage.getItem('ws_id') : '';

  async function upload() {
    const file = inputRef.current?.files?.[0];
    if (!file) return alert('Selecciona un CSV');

    setLoading(true); setResult(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('workspaceId', wsId || '');
      fd.append('accountName', accountName);
      fd.append('currency', currency);
      const res = await api('/transactions/import', { method: 'POST', body: fd });
      setResult(res);
      onDone?.(res);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h3>Importar transacciones (CSV)</h3>
      <p style={{ color: '#667085' }}>Columnas esperadas: <code>date/fecha</code>, <code>description/concepto</code>, <code>amount/importe</code> y opcional <code>currency/moneda</code>.</p>
      <div style={{ display:'grid', gap:8, marginTop:8 }}>
        <input type="file" accept=".csv" ref={inputRef} />
        <div style={{ display:'flex', gap:8 }}>
          <input className="input" placeholder="Nombre de cuenta" value={accountName} onChange={e=>setAccountName(e.target.value)} />
          <input className="input" placeholder="Moneda" value={currency} onChange={e=>setCurrency(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={upload} disabled={loading}>
          {loading ? 'Importando...' : 'Importar'}
        </button>
        {result && <div className="text-muted">Creadas: <b>{result.created}</b></div>}
      </div>
    </div>
  );
}
