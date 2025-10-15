// frontend/components/TablaTransacciones.jsx
import React from 'react';
import styles from './TablaTransacciones.module.css';

const TablaTransacciones = ({ transacciones }) => {
  if (!transacciones || transacciones.length === 0) {
    return (
      <div className={styles.container}>
        <div className="no-data">
          <p>No se encontraron transacciones con los filtros aplicados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <table className={`${styles.table} table`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Banco</th>
              <th>Tipo</th>
              <th className="text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((t) => (
              <tr key={t.id} className={`${styles['row']} ${styles[t.tipo] || ''}`}>
                <td className={styles.cellId}>{t.id}</td>
                <td>
                  {new Date(t.fecha).toLocaleDateString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric' })}
                </td>
                <td>{t.descripcion}</td>
                <td>
                  <span className="badge">{t.categoria}</span>
                </td>
                <td>{t.banco}</td>
                <td>
                  <span className={`${styles.badgeTipo} ${styles['badge-'+t.tipo]}`}>
                    {t.tipo === 'ingreso' ? '↑ Ingreso' : '↓ Gasto'}
                  </span>
                </td>
                <td className={`text-right ${styles[t.tipo] || ''}`}>
                  <span>
                    {t.tipo === 'ingreso' ? '+' : '-'} €
                    {Math.abs(t.monto).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaTransacciones;
