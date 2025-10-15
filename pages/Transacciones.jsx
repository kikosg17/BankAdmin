// frontend/pages/Transacciones.jsx
import { useMemo, useState, useEffect } from 'react';
import { Calendar, Filter, Plus } from 'lucide-react';
import { api } from '../lib/api';
import CsvImporter from '../components/CsvImporter';

// Función para actualizar transacción
async function updateTx(id, { categoryId, tags }) {
  const wsId = localStorage.getItem('ws_id');
  await api(`/transactions/${id}`, { method: 'PATCH', body: { workspaceId: wsId, categoryId, tags } });
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
        const data = await api('/categories');
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
        if (filters.category !== 'todas') params.append('category', filters.category);
        if (filters.type !== 'todos') params.append('type', filters.type);
        if (filters.search) params.append('q', filters.search);
        const data = await api('/transactions?' + params.toString());
        setItems(data.items);
        
        // Inicializar estado de edición para cada transacción
        const initialEditState = {};
        data.items.forEach(item => {
          initialEditState[item.id] = {
            categoryId: item.categoryId || '',
            tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '')
          };
        });
        setEditState(initialEditState);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters]);

  // Manejar cambio de categoría
  const handleCategoryChange = (txId, categoryId) => {
    setEditState(prev => ({
      ...prev,
      [txId]: { ...prev[txId], categoryId }
    }));
  };

  // Manejar cambio de tags
  const handleTagsChange = (txId, tags) => {
    setEditState(prev => ({
      ...prev,
      [txId]: { ...prev[txId], tags }
    }));
  };

  // Guardar cambios
  const handleSave = async (txId) => {
    try {
      const { categoryId, tags } = editState[txId];
      // Convertir tags de string a array
      const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
      await updateTx(txId, { categoryId, tags: tagsArray });
      alert('Transacción actualizada correctamente');
      // Actualizar item en la lista
      setItems(prev => prev.map(item => 
        item.id === txId ? { ...item, categoryId, tags: tagsArray } : item
      ));
    } catch (err) {
      alert('Error al actualizar: ' + err.message);
    }
  };

  return (
    <div className="container-xxl">
      <div className="grid-12" style={{ marginBottom: 24 }}>
        <div className="col-span-12">
          <h1>Transacciones</h1>
        </div>
        <div className="col-span-12" style={{ display: 'flex', gap: 12 }}>
          {/* Controles para filtros */}
          <div className="btn-icon"><Calendar size={20} /></div>
          {/* Aquí irían inputs/selects para fecha desde/hasta, cuenta, categoría, etc. */}
          <button className="btn btn-primary" onClick={() => {/* TODO: mostrar modal CSV */}}>
            <Plus size={18} style={{ marginRight: 6 }} /> Importar CSV
          </button>
        </div>
      </div>
      <div style={{ margin:'12px 0' }}>
        <CsvImporter onDone={() => window.location.reload()} />
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-neg">Error: {error}</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: 8, textAlign: 'left' }}>Fecha</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Descripción</th>
                <th style={{ padding: 8, textAlign: 'right' }}>Monto</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Cuenta</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Categoría</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Tags</th>
                <th style={{ padding: 8, textAlign: 'center' }}>Acción</th>
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
          {items.length === 0 && (
            <p style={{ textAlign: 'center', padding: 24, color: '#666' }}>
              No hay transacciones para mostrar
            </p>
          )}
        </div>
      )}
    </div>
  );
}
