// frontend/components/FiltrosTransacciones.jsx
import React, { useState } from 'react';
import styles from './FiltrosTransacciones.module.css';

const FiltrosTransacciones = ({ onFiltrar, onLimpiar, transacciones }) => {
  const bancosUnicos = [...new Set(transacciones.map(t => t.banco))].sort();
  const categoriasUnicas = [...new Set(transacciones.map(t => t.categoria))].sort();

  const [filtros, setFiltros] = useState({
    fechaDesde: '',
    fechaHasta: '',
    banco: 'todos',
    categoria: 'todas',
    tipo: 'todos',
    busqueda: ''
  });

  const [filtrosAplicados, setFiltrosAplicados] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
    onFiltrar(filtros);
    setFiltrosAplicados(true);
  };

  const limpiarFiltros = () => {
    const vacios = { fechaDesde:'', fechaHasta:'', banco:'todos', categoria:'todas', tipo:'todos', busqueda:'' };
    setFiltros(vacios);
    onLimpiar();
    setFiltrosAplicados(false);
  };

  const hayFiltrosActivos = () =>
    filtros.fechaDesde || filtros.fechaHasta || filtros.banco !== 'todos' ||
    filtros.categoria !== 'todas' || filtros.tipo !== 'todos' || filtros.busqueda;

  return (
    <div className={styles.container}>
      <form onSubmit={aplicarFiltros} className={styles.form}>
        <div className={styles.header}>
          <h3>Filtros</h3>
          {hayFiltrosActivos() && (
            <span className={styles.badge}>
              {filtrosAplicados ? 'Filtros aplicados' : 'Filtros modificados'}
            </span>
          )}
        </div>
        <div className={styles.grid}>
          <div className={styles.group}>
            <label htmlFor="fechaDesde">Fecha desde</label>
            <input type="date" id="fechaDesde" name="fechaDesde" value={filtros.fechaDesde}
                   onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.group}>
            <label htmlFor="fechaHasta">Fecha hasta</label>
            <input type="date" id="fechaHasta" name="fechaHasta" value={filtros.fechaHasta}
                   onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.group}>
            <label htmlFor="banco">Banco</label>
            <select className={styles.select} id="banco" name="banco" onChange={handleChange} value={filtros.banco}>
              <option value="todos">Todos los bancos</option>
              {bancosUnicos.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className={styles.group}>
            <label htmlFor="categoria">Categoría</label>
            <select className={styles.select} id="categoria" name="categoria" onChange={handleChange} value={filtros.categoria}>
              <option value="todas">Todas las categorías</option>
              {categoriasUnicas.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.group}>
            <label htmlFor="tipo">Tipo</label>
            <select className={styles.select} id="tipo" name="tipo" onChange={handleChange} value={filtros.tipo}>
              <option value="todos">Todos</option>
              <option value="ingreso">↑ Ingresos</option>
              <option value="gasto">↓ Gastos</option>
            </select>
          </div>
          <div className={`${styles.group} ${styles.searchGroup}`}>
            <label htmlFor="busqueda">Buscar descripción</label>
            <input type="text" id="busqueda" name="busqueda" value={filtros.busqueda}
                   onChange={handleChange} placeholder="Ej: restaurante, gasolina..." className={styles.input} />
          </div>
        </div>
        <div className={styles.actions}>
          <button className="btn btn-primary" type="submit">🔍 Aplicar Filtros</button>
          <button className="btn" type="button" onClick={limpiarFiltros} disabled={!hayFiltrosActivos()}>
            ✖ Limpiar Filtros
          </button>
        </div>
      </form>
    </div>
  );
};

export default FiltrosTransacciones;
