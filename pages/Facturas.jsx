// frontend/pages/Facturas.jsx
import { useState } from 'react';
import styles from '../styles/Facturas.module.css';

export default function Facturas(){
  const [form, setForm] = useState({ numero:'', fecha:'', cliente:'', importe:'' });
  const [list, setList] = useState([]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const add = e => {
    e.preventDefault();
    if(!form.numero || !form.fecha || !form.cliente || !form.importe) return;
    setList(prev => [...prev, { id:Date.now(), ...form }]);
    setForm({ numero:'', fecha:'', cliente:'', importe:'' });
  };
  const remove = id => setList(prev => prev.filter(x => x.id !== id));

  return (
    <div className="page-container">
      <h1>Facturas</h1>

      <form className={styles.form} onSubmit={add}>
        <input className={styles.input} name="numero" placeholder="Nº factura" value={form.numero} onChange={onChange} />
        <input className={styles.input} name="fecha" type="date" placeholder="Fecha" value={form.fecha} onChange={onChange} />
        <input className={styles.input} name="cliente" placeholder="Cliente" value={form.cliente} onChange={onChange} />
        <input className={styles.input} name="importe" type="number" step="0.01" placeholder="Importe (€)" value={form.importe} onChange={onChange} />
        <button className="btn btn-primary" type="submit">Añadir</button>
      </form>

      <div className={`${styles.list} card`}>
        <h2>Listado</h2>
        {list.length === 0 ? (
          <div className="no-data">No hay facturas todavía.</div>
        ) : (
          <ul style={{listStyle:'none', padding:0, margin:0}}>
            {list.map(f => (
              <li key={f.id} className={styles.item}>
                <span>{f.numero} — {f.cliente} — {new Date(f.fecha).toLocaleDateString('es-ES')}</span>
                <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
                  <strong>{Number(f.importe).toLocaleString('es-ES', { style:'currency', currency:'EUR' })}</strong>
                  <button className="btn btn-danger" onClick={()=>remove(f.id)} type="button">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
