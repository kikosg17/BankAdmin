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
      const res = await api().post('/transactions/import', fd);
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
      <p style={{ color:'#666' }}>Columnas esperadas: date/fecha, description/concepto, amount/importe y opcional currency/moneda.</p>
      <div style={{ display:'grid', gap:8, marginTop:8 }}>
        <input type="file" accept=".csv" ref={inputRef} />
        <div style={{ display:'flex', gap:8 }}>
          <input className="input" value={accountName} onChange={e=>setAccountName(e.target.value)} placeholder="Nombre de cuenta" />
          <input className="input" value={currency} onChange={e=>setCurrency(e.target.value)} placeholder="Moneda" />
        </div>
        <button className="btn btn-primary" onClick={upload} disabled={loading}>
          {loading ? 'Importando...' : 'Importar'}
        </button>
        {result && <div className="text-muted">Creadas: {result.created}</div>}
      </div>
    </div>
  );
}
