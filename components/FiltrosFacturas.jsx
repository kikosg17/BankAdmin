import React from 'react';
import styles from '../styles/Facturas.module.css';

const FiltrosFacturas = ({ filtros, onFiltrosChange, onBuscar }) => {
  const handleEstadoChange = (e) => {
    onFiltrosChange({ ...filtros, estado: e.target.value });
  };

  const handleFechaDesdeChange = (e) => {
    onFiltrosChange({ ...filtros, fechaDesde: e.target.value });
  };

  const handleFechaHastaChange = (e) => {
    onFiltrosChange({ ...filtros, fechaHasta: e.target.value });
  };

  const handleBusquedaChange = (e) => {
    onFiltrosChange({ ...filtros, busqueda: e.target.value });
  };

  const handleLimpiarFiltros = () => {
    onFiltrosChange({
      estado: 'todas',
      fechaDesde: '',
      fechaHasta: '',
      busqueda: ''
    });
  };

  return (
    <div className={styles.filtrosContainer}>
      <div className={styles.filtrosFacturas}>
        {/* Filtro por Estado */}
        <div className={styles.filtroItem}>
          <label htmlFor="filtroEstado">Estado</label>
          <select
            id="filtroEstado"
            value={filtros.estado}
            onChange={handleEstadoChange}
            className={styles.selectFiltro}
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="pagada">Pagadas</option>
          </select>
        </div>

        {/* Filtro por Fecha Desde */}
        <div className={styles.filtroItem}>
          <label htmlFor="fechaDesde">Desde</label>
          <input
            type="date"
            id="fechaDesde"
            value={filtros.fechaDesde}
            onChange={handleFechaDesdeChange}
            className={styles.inputFiltro}
          />
        </div>

        {/* Filtro por Fecha Hasta */}
        <div className={styles.filtroItem}>
          <label htmlFor="fechaHasta">Hasta</label>
          <input
            type="date"
            id="fechaHasta"
            value={filtros.fechaHasta}
            onChange={handleFechaHastaChange}
            className={styles.inputFiltro}
          />
        </div>

        {/* Buscador por Cliente/Proveedor */}
        <div className={styles.filtroItem}>
          <label htmlFor="busquedaCliente">Cliente/Proveedor</label>
          <input
            type="text"
            id="busquedaCliente"
            placeholder="Buscar..."
            value={filtros.busqueda}
            onChange={handleBusquedaChange}
            className={styles.inputFiltro}
          />
        </div>

        {/* Botón para limpiar filtros */}
        <div className={styles.filtroItem}>
          <button
            onClick={handleLimpiarFiltros}
            className={styles.btnLimpiar}
            title="Limpiar todos los filtros"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltrosFacturas;
