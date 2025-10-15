// frontend/components/BankBalanceCards.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

export default function BankBalanceCards() {
  const { token, currentWorkspace } = useAuth();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function load() {
      if (!currentWorkspace) return;
      const q = new URLSearchParams({ workspaceId: currentWorkspace.id });
      const data = await api(token).get(`/accounts?${q.toString()}`);
      setAccounts(data);
    }
    load();
  }, [token, currentWorkspace]);

  if (!currentWorkspace) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
      {accounts.map(acc => (
        <div key={acc.id} style={{ border:'1px solid #eee', borderRadius:12, padding:12 }}>
          <div style={{ fontWeight:600 }}>{acc.name}</div>
          <div style={{ fontSize:12, color:'#64748b' }}>{acc.currency}</div>
          <div style={{ marginTop:8, fontSize:18 }}>
            Saldo: <b>{Number(acc.balanceCurrent ?? 0).toLocaleString()} {acc.currency}</b>
          </div>
          {acc.balanceAvailable != null && (
            <div style={{ color:'#64748b' }}>
              Disponible: {Number(acc.balanceAvailable).toLocaleString()} {acc.currency}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
