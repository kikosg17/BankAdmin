// frontend/components/TransactionList.jsx
import TagPill from './TagPill';

function hashColor(str) {
  let h=0; for (let i=0; i<str.length; i++) h = str.charCodeAt(i) + ((h<<5)-h);
  const c = (h & 0x00FFFFFF).toString(16).toUpperCase().padStart(6,'0');
  return `#${c}`;
}

export default function TransactionList({ items }) {
  return (
    <div className="tx-list">
      {items.map(tx => {
        const bg = hashColor(tx.counterparty || tx.descripcion || 'X');
        const initials = (tx.counterparty || tx.descripcion || 'X').slice(0,1).toUpperCase();
        const amountClass = tx.tipo === 'ingreso' ? 'text-pos' : 'text-neg';
        return (
          <div className="tx-item" key={tx.id}>
            <div className="tx-avatar" style={{ background:bg }}>{initials}</div>
            <div>
              <div className="tx-title">{tx.descripcion}</div>
              <div className="tx-sub">
                <span>{tx.banco}</span>
                <span>•</span>
                <span>{tx.categoria}</span>
                {tx.tags?.map(t => <TagPill key={t} label={t} />)}
              </div>
            </div>
            <div style={{ display:'grid', gap:6, justifyItems:'end' }}>
              <div className="tx-date">{new Date(tx.fecha).toLocaleDateString('es-ES')}</div>
              <div className={`tx-amount ${amountClass}`}>
                {tx.monto.toLocaleString('es-ES', { style:'currency', currency:'EUR' })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
