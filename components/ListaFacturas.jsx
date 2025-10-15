import React from 'react';
import styles from '../styles/Facturas.module.css';

const ListaFacturas = ({ facturas, onMarcarPagada, onEditarFactura, onEliminarFactura }) => {
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  const formatearImporte = (importe) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(importe);
  };

  const getEstadoClass = (estado) => {
    return estado === 'pagada' ? styles.estadoPagada : styles.estadoPendiente;
  };

  if (!facturas || facturas.length === 0) {
    return (
      <div className={styles.mensajeVacio}>
        <p>No hay facturas que mostrar</p>
      </div>
    );
  }

  return (
    <div className={styles.listaFacturas}>
      <div className={styles.tablaResponsive}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Número</th>
              <th>Fecha</th>
              <th>Cliente/Proveedor</th>
              <th>Concepto</th>
              <th>Importe</th>
              <th>Estado</th>
              <th>Conciliación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td data-label="Número">{factura.numero}</td>
                <td data-label="Fecha">{formatearFecha(factura.fecha)}</td>
                <td data-label="Cliente/Proveedor">{factura.clienteProveedor}</td>
                <td data-label="Concepto">
                  <div className={styles.concepto}>{factura.concepto}</div>
                </td>
                <td data-label="Importe" className={styles.importe}>
                  {formatearImporte(factura.importe)}
                </td>
                <td data-label="Estado">
                  <span className={`${styles.badge} ${getEstadoClass(factura.estado)}`}>
                    {factura.estado === 'pagada' ? 'Pagada' : 'Pendiente'}
                  </span>
                </td>
                <td data-label="Conciliación">
                  {factura.conciliada ? (
                    <span className={styles.conciliadaIcon} title="Conciliada automáticamente">
                      ✓
                    </span>
                  ) : (
                    <span className={styles.noConciliadaIcon} title="No conciliada">
                      ○
                    </span>
                  )}
                </td>
                <td data-label="Acciones">
                  <div className={styles.acciones}>
                    {factura.estado === 'pendiente' && (
                      <button
                        className={styles.btnPagar}
                        onClick={() => onMarcarPagada(factura.id)}
                        title="Marcar como pagada"
                      >
                        ✓ Pagar
                      </button>
                    )}
                    <button
                      className={styles.btnEditar}
                      onClick={() => onEditarFactura(factura)}
                      title="Editar factura"
                    >
                      ✎
                    </button>
                    <button
                      className={styles.btnEliminar}
                      onClick={() => onEliminarFactura(factura.id)}
                      title="Eliminar factura"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaFacturas;
