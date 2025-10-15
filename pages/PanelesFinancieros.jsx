// frontend/pages/PanelesFinancieros.jsx
import { useState } from 'react';
import WorkspaceSelect from '../components/WorkspaceSelect';
import BankBalanceCards from '../components/BankBalanceCards';
import CategoryDonutChart from '../components/CategoryDonutChart';

export default function PanelesFinancieros() {
  const [range, setRange] = useState({ from:'', to:'' });

  return (
    <div className="page-container">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1>Paneles Financieros</h1>
        <WorkspaceSelect />
      </div>

      <div style={{ display:'flex', gap:8, margin:'12px 0' }}>
        <input type="date" value={range.from} onChange={e=>setRange(r=>({ ...r, from:e.target.value }))} />
        <input type="date" value={range.to} onChange={e=>setRange(r=>({ ...r, to:e.target.value }))} />
      </div>

      <div style={{ margin:'12px 0' }}>
        <BankBalanceCards />
      </div>

      <CategoryDonutChart from={range.from} to={range.to} />
    </div>
  );
}
