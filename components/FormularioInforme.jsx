import React, { useState } from 'react';
import '../styles/FormularioInforme.css';

const FormularioInforme = ({ onGenerar }) => {
  const [formData, setFormData] = useState({
    tipo: 'saldos',
    periodo: 'mes-actual',
    fechaInicio: '',
    fechaFin: '',
    banco: 'todos',
    categoria: 'todas',
    formato: 'PDF',
    destinatario: ''
  });

  const [errores, setErrores] = useState({});
  const [generando, setGenerando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (formData.periodo === 'personalizado') {
      if (!formData.fechaInicio) {
        nuevosErrores.fechaInicio = 'Debes seleccionar una fecha de inicio';
      }
      if (!formData.fechaFin) {
        nuevosErrores.fechaFin = 'Debes seleccionar una fecha de fin';
      }
      if (formData.fechaInicio && formData.fechaFin && formData.fechaInicio > formData.fechaFin) {
        nuevosErrores.fechaFin = 'La fecha de fin debe ser posterior a la fecha de inicio';
      }
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }
    
    setGenerando(true);
    
    // Simular generación de informe
    setTimeout(() => {
      const nuevoInforme = {
        ...formData,
        fecha: new Date().toISOString(),
        id: Date.now()
      };
      
      onGenerar(nuevoInforme);
      setGenerando(false);
      
      // Resetear formulario
      setFormData({
        tipo: 'saldos',
        periodo: 'mes-actual',
        fechaInicio: '',
        fechaFin: '',
        banco: 'todos',
        categoria: 'todas',
        formato: 'PDF',
        destinatario: ''
      });
    }, 1500);
  };

  const obtenerPeriodoTexto = () => {
    switch (formData.periodo) {
      case 'mes-actual':
        return 'Mes actual';
      case 'mes-anterior':
        return 'Mes anterior';
      case 'trimestre-actual':
        return 'Trimestre actual';
      case 'año-actual':
        return 'Año actual';
      case 'personalizado':
        if (formData.fechaInicio && formData.fechaFin) {
          return `${formData.fechaInicio} a ${formData.fechaFin}`;
        }
        return 'Personalizado';
      default:
        return formData.periodo;
    }
  };

  return (
    <div className="formulario-informe">
      <h2 className="formulario-titulo">Generar Nuevo Informe</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="formulario-grid">
          {/* Tipo de Informe */}
          <div className="form-group">
            <label htmlFor="tipo" className="form-label">
              📄 Tipo de Informe
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="form-select"
            >
              <option value="saldos">Informe de Saldos</option>
              <option value="movimientos">Informe de Movimientos</option>
              <option value="gráficos">Informe con Gráficos</option>
            </select>
          </div>

          {/* Período */}
          <div className="form-group">
            <label htmlFor="periodo" className="form-label">
              📅 Período
            </label>
            <select
              id="periodo"
              name="periodo"
              value={formData.periodo}
              onChange={handleChange}
              className="form-select"
            >
              <option value="mes-actual">Mes Actual</option>
              <option value="mes-anterior">Mes Anterior</option>
              <option value="trimestre-actual">Trimestre Actual</option>
              <option value="año-actual">Año Actual</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>

          {/* Fechas Personalizadas */}
          {formData.periodo === 'personalizado' && (
            <>
              <div className="form-group">
                <label htmlFor="fechaInicio" className="form-label">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  id="fechaInicio"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className={`form-input ${errores.fechaInicio ? 'input-error' : ''}`}
                />
                {errores.fechaInicio && (
                  <span className="error-message">{errores.fechaInicio}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="fechaFin" className="form-label">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  id="fechaFin"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  className={`form-input ${errores.fechaFin ? 'input-error' : ''}`}
                />
                {errores.fechaFin && (
                  <span className="error-message">{errores.fechaFin}</span>
                )}
              </div>
            </>
          )}

          {/* Banco */}
          <div className="form-group">
            <label htmlFor="banco" className="form-label">
              🏦 Banco
            </label>
            <select
              id="banco"
              name="banco"
              value={formData.banco}
              onChange={handleChange}
              className="form-select"
            >
              <option value="todos">Todos los bancos</option>
              <option value="banco-santander">Banco Santander</option>
              <option value="bbva">BBVA</option>
              <option value="caixabank">CaixaBank</option>
              <option value="banco-sabadell">Banco Sabadell</option>
              <option value="bankia">Bankia</option>
            </select>
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label htmlFor="categoria" className="form-label">
              🏷️ Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="form-select"
            >
              <option value="todas">Todas las categorías</option>
              <option value="ingresos">Ingresos</option>
              <option value="gastos">Gastos</option>
              <option value="nomina">Nómina</option>
              <option value="alimentacion">Alimentación</option>
              <option value="transporte">Transporte</option>
              <option value="vivienda">Vivienda</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
            </select>
          </div>

          {/* Formato */}
          <div className="form-group">
            <label htmlFor="formato" className="form-label">
              💾 Formato de Exportación
            </label>
            <select
              id="formato"
              name="formato"
              value={formData.formato}
              onChange={handleChange}
              className="form-select"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
            </select>
          </div>

          {/* Destinatario */}
          <div className="form-group form-group-full">
            <label htmlFor="destinatario" className="form-label">
              📧 Destinatario (opcional)
            </label>
            <input
              type="text"
              id="destinatario"
              name="destinatario"
              value={formData.destinatario}
              onChange={handleChange}
              placeholder="Email o número de teléfono"
              className="form-input"
            />
            <small className="form-hint">
              Puedes ingresar un email o número de WhatsApp para enviar el informe
            </small>
          </div>
        </div>

        {/* Vista Previa de Configuración */}
        <div className="configuracion-preview">
          <h3>Resumen de configuración:</h3>
          <ul className="preview-list">
            <li>
              <strong>Tipo:</strong> {formData.tipo}
            </li>
            <li>
              <strong>Período:</strong> {obtenerPeriodoTexto()}
            </li>
            <li>
              <strong>Banco:</strong> {formData.banco === 'todos' ? 'Todos' : formData.banco}
            </li>
            <li>
              <strong>Categoría:</strong> {formData.categoria === 'todas' ? 'Todas' : formData.categoria}
            </li>
            <li>
              <strong>Formato:</strong> {formData.formato}
            </li>
          </ul>
        </div>

        {/* Botón de Generar */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-generar"
            disabled={generando}
          >
            {generando ? (
              <>
                <span className="spinner"></span>
                Generando informe...
              </>
            ) : (
              <>
                🚀 Generar Informe
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioInforme;
