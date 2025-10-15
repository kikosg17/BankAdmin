import React, { useState } from 'react';
import ListaInformes from '../components/ListaInformes';
import FormularioInforme from '../components/FormularioInforme';
import '../styles/Informes.css';

const Informes = () => {
  const [informes, setInformes] = useState([
    // Informes de ejemplo
    {
      tipo: 'saldos',
      fecha: new Date('2025-10-01T10:30:00').toISOString(),
      formato: 'PDF',
      periodo: 'Septiembre 2025',
      banco: 'Banco Santander',
      categoria: 'todas',
      destinatario: 'contabilidad@empresa.com'
    },
    {
      tipo: 'movimientos',
      fecha: new Date('2025-09-25T14:15:00').toISOString(),
      formato: 'Excel',
      periodo: 'Trimestre 3 - 2025',
      banco: 'BBVA',
      categoria: 'gastos',
      destinatario: ''
    },
    {
      tipo: 'gráficos',
      fecha: new Date('2025-09-20T09:00:00').toISOString(),
      formato: 'PDF',
      periodo: 'Año 2025',
      banco: 'todos',
      categoria: 'todas',
      destinatario: '+34 612345678'
    }
  ]);

  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setMensajeNotificacion({ mensaje, tipo });
    setTimeout(() => {
      setMensajeNotificacion(null);
    }, 4000);
  };

  const handleGenerarInforme = (nuevoInforme) => {
    setInformes(prev => [nuevoInforme, ...prev]);
    mostrarNotificacion('✅ Informe generado exitosamente');
  };

  const handleExportar = (informe) => {
    // Simular exportación
    mostrarNotificacion(
      `📥 Exportando informe en formato ${informe.formato}...`,
      'info'
    );
    
    // Simular descarga
    setTimeout(() => {
      mostrarNotificacion(
        `✅ Informe exportado exitosamente como "${informe.tipo}_${new Date(informe.fecha).toLocaleDateString('es-ES')}.${informe.formato.toLowerCase()}"`,
        'success'
      );
    }, 1500);
  };

  const handleEnviar = (informe, medio) => {
    // Simular envío
    const destinatario = informe.destinatario || 'destinatario no especificado';
    
    if (!informe.destinatario) {
      mostrarNotificacion(
        '⚠️ No se especificó un destinatario para este informe',
        'warning'
      );
      return;
    }
    
    mostrarNotificacion(
      `📤 Enviando informe por ${medio === 'email' ? 'Email' : 'WhatsApp'}...`,
      'info'
    );
    
    setTimeout(() => {
      if (medio === 'email') {
        mostrarNotificacion(
          `✅ Informe enviado por email a ${destinatario}`,
          'success'
        );
      } else if (medio === 'whatsapp') {
        mostrarNotificacion(
          `✅ Informe enviado por WhatsApp a ${destinatario}`,
          'success'
        );
      }
    }, 2000);
  };

  const handleEliminar = (index) => {
    // Confirmación simulada
    if (window.confirm('¿Estás seguro de que deseas eliminar este informe?')) {
      setInformes(prev => prev.filter((_, i) => i !== index));
      mostrarNotificacion('🗑️ Informe eliminado', 'info');
    }
  };

  return (
    <div className="informes-page">
      {/* Notificación */}
      {mensajeNotificacion && (
        <div className={`notificacion notificacion-${mensajeNotificacion.tipo}`}>
          <span>{mensajeNotificacion.mensaje}</span>
          <button 
            className="notificacion-cerrar"
            onClick={() => setMensajeNotificacion(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Encabezado */}
      <div className="informes-header">
        <h1 className="informes-main-title">📊 Sistema de Informes</h1>
        <p className="informes-subtitle">
          Genera, exporta y comparte informes financieros personalizados
        </p>
      </div>

      {/* Contenido Principal */}
      <div className="informes-content">
        {/* Formulario de Generación */}
        <section className="informes-section">
          <FormularioInforme onGenerar={handleGenerarInforme} />
        </section>

        {/* Separador */}
        <div className="informes-divider"></div>

        {/* Lista de Informes */}
        <section className="informes-section">
          <ListaInformes
            informes={informes}
            onExportar={handleExportar}
            onEnviar={handleEnviar}
            onEliminar={handleEliminar}
          />
        </section>
      </div>
    </div>
  );
};

export default Informes;
