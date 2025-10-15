// frontend/components/WorkspaceSelect.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

export default function WorkspaceSelect() {
  const { token, currentWorkspace, setCurrentWorkspace } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await api(token).get('/workspaces');
        setList(data);
      } catch (e) { console.error(e); }
    }
    if (token) load();
  }, [token]);

  return (
    <select
      value={currentWorkspace?.id || ''}
      onChange={(e) => {
        const ws = list.find(x => x.id === e.target.value) || null;
        setCurrentWorkspace(ws);
      }}
      style={{ padding: 6, borderRadius: 8 }}
    >
      {list.map(ws => <option key={ws.id} value={ws.id}>{ws.name}</option>)}
    </select>
  );
}
