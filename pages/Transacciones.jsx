// frontend/pages/Transacciones.jsx
import { useMemo, useState, useEffect } from 'react';
import { Calendar, Filter, Plus } from 'lucide-react';
import { api } from '../lib/api';
import CsvImporter from '../components/CsvImporter';

// Función para actualizar transacción
async function updateTx(id, { categoryId, tags }) {
  const wsId = localStorage.getItem('ws_id');
  await api().patch(`/transactions/${id}`, { workspaceId: wsId, categoryId, tags });
}

export default function Transacciones() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Estado para edición inline: { [txId]: { categoryId, tags } }
  const [editState, setEditState] = useState({});
  
  // Filtrados (fecha, tipo, cuenta, categoría, búsqueda)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    account: 'todos',
    category: 'todas',
    type: 'todos',
    search: '',
  });

  // Cargar categorías
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api().get('/categories');
        setCategories(data.items || []);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      }
    }
    fetchCategories();
  }, []);

  // Cargar transacciones
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.account !== 'todos') params.append('account', filters.account);
        if (filters.category !== 'todas') params.append('categoryId', filters.category);
        if (filters.type !== 'todos') params.append('type', filters.type);
        if (filters.search) params.append('search', filters.search);
        const wsId = localStorage.getItem('ws_id');
        if (wsId) params.append('workspaceId', wsId);
        const data = await api().get('/transactions?' + params.toString());
        const arr = data.items || [];
        setItems(arr);
        // Inicializar editState con los valores actuales
        const newState = {};
        arr.forEach(item => {
          newState[item.id] = {
            categoryId: item.categoryId || '',
            tags: (item.tags || []).join(', ')
          };
        });
        setEditState(newState);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error cargando transacciones');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters]);

  // Extraer cuentas únicas para el filtro
  const uniqueAccounts = useMemo(() => {
    const accounts = new Set();
    items.forEach(tx => tx.account && accounts.add(tx.account));
    return Array.from(accounts).sort();
  }, [items]);

  const handleCategoryChange = (itemId, categoryId) => {
    setEditState(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], categoryId }
    }));
  };

  const handleTagsChange = (itemId, tags) => {
    setEditState(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], tags }
    }));
  };

  const handleSave = async (itemId) => {
    const state = editState[itemId];
    if (!state) return;
    const tagsArray = state.tags ? state.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    try {
      await updateTx(itemId, {
        categoryId: state.categoryId || null,
        tags: tagsArray
      });
      alert('¡Guardado!');
      // Recargar
      setFilters(prev => ({ ...prev }));
    } catch (err) {
      alert('Error guardando: ' + (err.message || err));
    }
  };

  return (
    <div className="container-fluid" style={{ padding: 16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16 }}>
        <h1>Transacciones</h1>
        <CsvImporter />
      </div>

      {/* Filtros */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:12 }}>
          <div>
            <label style={{ display:'block', fontWeight: 600, marginBottom: 4 }}>Desde</label>
            <input type="date" className="input" value={filters.dateFrom} onChange={e => setFilters({...filters, dateFrom: e.target.value})} />
          </div>
          <div>
            <label style={{ display:'block', fontWeight: 600, marginBottom: 4 }}>Hasta</label>
            <input type="date" className="input" value={filters.dateTo} onChange={e => setFilters({...filters, dateTo: e.target.value})} />
          </div>
          <div>
            <label style={{ display:'block', fontWeight: 600, marginBottom: 4 }}>Cuenta</label>
            <select className="input" value={filters.account} onChange={e => setFilters({...filters, account: e.target.value})}>
              <option value="todos">Todas</option>
              {uniqueAccounts.map(acc => <option key={acc} value={acc}>{acc}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontWeight: 600, marginBottom: 4 }}>Categoría</label>
            <select className="input" value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
              <option value="todas">Todas</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontWeight: 600, marginBottom: 4 }}>Tipo</label>
            <select className="input" value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
              <option value="todos">Todos</option>
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontWeight: 600, marginBottom: 4 }}>Búsqueda</label>
            <input type="text" className="input" placeholder="Buscar..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
          </div>
        </div>
      </div>

      {/* Tabla */}
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color:'red' }}>Error: {error}</p>}
      {!loading && !error && (
        <table style={{ width:'100%', borderCollapse:'collapse', background:'white', borderRadius:8 }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #ddd', background:'#f9f9f9' }}>
              <th style={{ padding: 8, textAlign:'left' }}>Fecha</th>
              <th style={{ padding: 8, textAlign:'left' }}>Descripción</th>
              <th style={{ padding: 8, textAlign:'right' }}>Importe</th>
              <th style={{ padding: 8, textAlign:'left' }}>Cuenta</th>
              <th style={{ padding: 8, textAlign:'left' }}>Categoría</th>
              <th style={{ padding: 8, textAlign:'left' }}>Etiquetas</th>
              <th style={{ padding: 8, textAlign:'center' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>
                  {item.date ? new Date(item.date).toLocaleDateString() : '-'}
                </td>
                <td style={{ padding: 8 }}>{item.description || '-'}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>
                  {item.amount ? `$${item.amount.toFixed(2)}` : '-'}
                </td>
                <td style={{ padding: 8 }}>{item.account || '-'}</td>
                <td style={{ padding: 8 }}>
                  <select
                    value={editState[item.id]?.categoryId || ''}
                    onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                    style={{ width: '100%', padding: 4 }}
                  >
                    <option value="">Sin categoría</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: 8 }}>
                  <input
                    type="text"
                    value={editState[item.id]?.tags || ''}
                    onChange={(e) => handleTagsChange(item.id, e.target.value)}
                    placeholder="tag1, tag2, tag3"
                    style={{ width: '100%', padding: 4 }}
                  />
                </td>
                <td style={{ padding: 8, textAlign: 'center' }}>
                  <button
                    onClick={() => handleSave(item.id)}
                    className="btn btn-sm btn-primary"
                    style={{ padding: '4px 12px', fontSize: '14px' }}
                  >
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {items.length === 0 && (
        <p style={{ textAlign: 'center', padding: 24, color: '#666' }}>
          No hay transacciones para mostrar
        </p>
      )}
    </div>
  );
}
