import React from 'react';
import '../styles/ListaInformes.css';

const ListaInformes = ({ informes, onExportar, onEnviar, onEliminar }) => {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const obtenerIconoTipo = (tipo) => {
    switch (tipo) {
      case 'saldos':
        return '💰';
      case 'movimientos':
        return '📋';
      case 'gráficos':
        return '📊';
      default:
        return '📄';
    }
  };

  const obtenerIconoFormato = (formato) => {
    switch (formato) {
      case 'PDF':
        return '📕';
      case 'Excel':
        return '📗';
      default:
        return '📄';
    }
  };

  return (
    <div className="lista-informes">
      <h2 className="lista-informes-titulo">Informes Generados</h2>
      
      {informes.length === 0 ? (
        <div className="lista-informes-vacia">
          <p>No hay informes generados todavía.</p>
          <p>Utiliza el formulario para crear tu primer informe.</p>
        </div>
      ) : (
        <div className="lista-informes-grid">
          {informes.map((informe, index) => (
            <div key={index} className="informe-card">
              <div className="informe-header">
                <div className="informe-tipo">
                  <span className="tipo-icono">{obtenerIconoTipo(informe.tipo)}</span>
                  <span className="tipo-texto">{informe.tipo}</span>
                </div>
                <div className="informe-formato">
                  <span className="formato-icono">{obtenerIconoFormato(informe.formato)}</span>
                  <span className="formato-texto">{informe.formato}</span>
                </div>
              </div>
              
              <div className="informe-body">
                <div className="informe-detalle">
                  <span className="detalle-label">Fecha generación:</span>
                  <span className="detalle-valor">{formatearFecha(informe.fecha)}</span>
                </div>
                
                {informe.periodo && (
                  <div className="informe-detalle">
                    <span className="detalle-label">Periodo:</span>
                    <span className="detalle-valor">{informe.periodo}</span>
                  </div>
                )}
                
                {informe.banco && (
                  <div className="informe-detalle">
                    <span className="detalle-label">Banco:</span>
                    <span className="detalle-valor">{informe.banco}</span>
                  </div>
                )}
                
                {informe.categoria && (
                  <div className="informe-detalle">
                    <span className="detalle-label">Categoría:</span>
                    <span className="detalle-valor">{informe.categoria}</span>
                  </div>
                )}
                
                {informe.destinatario && (
                  <div className="informe-detalle">
                    <span className="detalle-label">Destinatario:</span>
                    <span className="detalle-valor">{informe.destinatario}</span>
                  </div>
                )}
              </div>
              
              <div className="informe-acciones">
                <button 
                  className="btn-accion btn-exportar"
                  onClick={() => onExportar(informe)}
                  title="Exportar informe"
                >
                  📥 Exportar
                </button>
                <button 
                  className="btn-accion btn-email"
                  onClick={() => onEnviar(informe, 'email')}
                  title="Enviar por email"
                >
                  📧 Email
                </button>
                <button 
                  className="btn-accion btn-whatsapp"
                  onClick={() => onEnviar(informe, 'whatsapp')}
                  title="Enviar por WhatsApp"
                >
                  💬 WhatsApp
                </button>
                <button 
                  className="btn-accion btn-eliminar"
                  onClick={() => onEliminar(index)}
                  title="Eliminar informe"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaInformes;
