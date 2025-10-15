// frontend/components/TransactionsTable.jsx
import React from 'react';
import clsx from 'clsx';

export default function TransactionsTable({ items = [] }) {
  if (!items.length) {
    return <div className="card"><p>No hay transacciones disponibles.</p></div>;
  }

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Cuenta</th>
            <th>Tipo</th>
            <th className="text-right">Monto</th>
          </tr>
        </thead>
        <tbody>
          {items.map(tx => (
            <tr key={tx.id}>
              <td>{new Date(tx.fecha).toLocaleDateString('es-ES')}</td>
              <td>{tx.descripcion}</td>
              <td><span className="badge">{tx.categoria}</span></td>
              <td>{tx.banco}</td>
              <td>
                <span
                  className={clsx('badge', {
                    'text-pos': tx.tipo === 'ingreso',
                    'text-neg': tx.tipo === 'gasto',
                  })}
                >
                  {tx.tipo === 'ingreso' ? 'Cobro' : 'Pago'}
                </span>
              </td>
              <td className={clsx('text-right', tx.tipo === 'ingreso' ? 'text-pos' : 'text-neg')}>
                {tx.monto.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
