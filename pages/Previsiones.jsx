// frontend/pages/Previsiones.jsx
import React, { useState, useMemo } from 'react';
import styles from '../styles/Previsiones.module.css';

export default function Previsiones() {
  const [periodo, setPeriodo] = useState('3meses');
  const [bancoSeleccionado, setBancoSeleccionado] = useState('todos');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  const escenarios = useMemo(() => {
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const num = periodo === '3meses' ? 3 : periodo === '6meses' ? 6 : 12;
    return meses.slice(0, num).map((mes, i) => ({
      mes,
      base: 50000 + (i * 5000) + Math.random() * 10000,
      optimista: 60000 + (i * 7000) + Math.random() * 15000,
      pesimista: 40000 + (i * 3000) + Math.random() * 8000
    }));
  }, [periodo]);

  const previsionesMov = useMemo(() => {
    const movs = [
      { id:1, fecha:'2025-11-15', concepto:'Pago Nóminas',   banco:'Santander', categoria:'Personal',  tipo:'gasto',   cantidad:-45000, probabilidad:'Alta' },
      { id:2, fecha:'2025-11-20', concepto:'Cobro Cliente A',banco:'BBVA',      categoria:'Ventas',    tipo:'ingreso', cantidad: 85000, probabilidad:'Media' },
      { id:3, fecha:'2025-11-25', concepto:'Pago Proveedores', banco:'Santander', categoria:'Compras',  tipo:'gasto',   cantidad:-32000, probabilidad:'Alta' },
      { id:4, fecha:'2025-12-01', concepto:'Cobro Cliente B', banco:'CaixaBank', categoria:'Ventas',    tipo:'ingreso', cantidad:125000, probabilidad:'Media' },
    ];
    return movs.filter(m =>
      (bancoSeleccionado === 'todos' || m.banco === bancoSeleccionado) &&
      (categoriaSeleccionada === 'todas' || m.categoria === categoriaSeleccionada)
    );
  }, [bancoSeleccionado, categoriaSeleccionada]);

  const maxV = Math.max(...escenarios.map(e => Math.max(e.base, e.optimista, e.pesimista)));

  return (
    <div className={`${styles.page} page-container`}>
      <div className={styles.header}>
        <h1>Previsiones Financieras</h1>
        <p className={styles.desc}>Proyecciones y escenarios de tesorería</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="periodo-filter">Periodo:</label>
          <select id="periodo-filter" value={periodo} onChange={e => setPeriodo(e.target.value)} className={styles.select}>
            <option value="3meses">3 Meses</option>
            <option value="6meses">6 Meses</option>
            <option value="12meses">12 Meses</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="banco-filter">Banco:</label>
          <select id="banco-filter" value={bancoSeleccionado} onChange={e => setBancoSeleccionado(e.target.value)} className={styles.select}>
            <option value="todos">Todos los Bancos</option>
            <option value="Santander">Santander</option>
            <option value="BBVA">BBVA</option>
            <option value="CaixaBank">CaixaBank</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="categoria-filter">Categoría:</label>
          <select id="categoria-filter" value={categoriaSeleccionada} onChange={e => setCategoriaSeleccionada(e.target.value)} className={styles.select}>
            <option value="todas">Todas</option>
            <option value="Personal">Personal</option>
            <option value="Ventas">Ventas</option>
            <option value="Compras">Compras</option>
            <option value="Gastos Fijos">Gastos Fijos</option>
            <option value="Servicios">Servicios</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="widget-card">
        <div className="widget-header">
          <h2>Escenarios de Tesorería</h2>
        </div>

        <div className={styles.chart}>
          <div className={styles.chartYAxis}>
            <span>{(maxV).toFixed(0)}€</span>
            <span>{(maxV * 0.75).toFixed(0)}€</span>
            <span>{(maxV * 0.5).toFixed(0)}€</span>
            <span>{(maxV * 0.25).toFixed(0)}€</span>
            <span>0€</span>
          </div>

          <div className={styles.chartArea}>
            <svg className={styles.lineChart} viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* grid */}
              <line x1="0" y1="0" x2="100" y2="0" stroke="#2e3340" strokeWidth="0.2" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="#2e3340" strokeWidth="0.2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#2e3340" strokeWidth="0.2" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#2e3340" strokeWidth="0.2" />
              <line x1="0" y1="100" x2="100" y2="100" stroke="#2e3340" strokeWidth="0.2" />

              {/* líneas */}
              <polyline
                points={escenarios.map((e,i)=>`${(i/(escenarios.length-1))*100},${100-(e.optimista/maxV)*100}`).join(' ')}
                fill="none" stroke="#4caf50" strokeWidth="1"
              />
              <polyline
                points={escenarios.map((e,i)=>`${(i/(escenarios.length-1))*100},${100-(e.base/maxV)*100}`).join(' ')}
                fill="none" stroke="#2196f3" strokeWidth="1"
              />
              <polyline
                points={escenarios.map((e,i)=>`${(i/(escenarios.length-1))*100},${100-(e.pesimista/maxV)*100}`).join(' ')}
                fill="none" stroke="#f44336" strokeWidth="1"
              />
            </svg>

            <div className={styles.chartXAxis}>
              {escenarios.map((e,i)=><span key={i}>{e.mes}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="widget-card" style={{marginTop:'1rem'}}>
        <div className="widget-header">
          <h2>Previsión de Movimientos</h2>
          <span>{previsionesMov.length} movimientos</span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th><th>Concepto</th><th>Banco</th><th>Categoría</th><th>Cantidad</th><th>Probabilidad</th>
              </tr>
            </thead>
            <tbody>
              {previsionesMov.map(m => (
                <tr key={m.id}>
                  <td>{new Date(m.fecha).toLocaleDateString('es-ES')}</td>
                  <td>{m.concepto}</td>
                  <td>{m.banco}</td>
                  <td>{m.categoria}</td>
                  <td className={m.tipo==='ingreso' ? styles.amountPositive : styles.amountNegative}>
                    {m.cantidad.toLocaleString('es-ES', { style:'currency', currency:'EUR' })}
                  </td>
                  <td>
                    <span className={`${styles.probBadge} ${styles['prob-'+m.probabilidad.toLowerCase()]}`}>
                      {m.probabilidad}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
