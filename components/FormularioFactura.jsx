import React, { useState, useEffect } from 'react';
import styles from '../styles/Facturas.module.css';

const FormularioFactura = ({ facturaEditar, onSubmit, onCancelar }) => {
  const [formData, setFormData] = useState({
    numero: '',
    fecha: '',
    concepto: '',
    importe: '',
    clienteProveedor: '',
    estado: 'pendiente',
    archivo: null
  });

  const [archivoNombre, setArchivoNombre] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (facturaEditar) {
      setFormData({
        numero: facturaEditar.numero || '',
        fecha: facturaEditar.fecha || '',
        concepto: facturaEditar.concepto || '',
        importe: facturaEditar.importe || '',
        clienteProveedor: facturaEditar.clienteProveedor || '',
        estado: facturaEditar.estado || 'pendiente',
        archivo: null
      });
    }
  }, [facturaEditar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, archivo: file }));
      setArchivoNombre(file.name);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.numero.trim()) {
      nuevosErrores.numero = 'El número de factura es obligatorio';
    }

    if (!formData.fecha) {
      nuevosErrores.fecha = 'La fecha es obligatoria';
    }

    if (!formData.concepto.trim()) {
      nuevosErrores.concepto = 'El concepto es obligatorio';
    }

    if (!formData.importe || parseFloat(formData.importe) <= 0) {
      nuevosErrores.importe = 'El importe debe ser mayor a 0';
    }

    if (!formData.clienteProveedor.trim()) {
      nuevosErrores.clienteProveedor = 'El cliente/proveedor es obligatorio';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      const facturaData = {
        ...formData,
        importe: parseFloat(formData.importe),
        id: facturaEditar ? facturaEditar.id : Date.now(),
        conciliada: false
      };
      
      onSubmit(facturaData);
      
      // Resetear formulario
      setFormData({
        numero: '',
        fecha: '',
        concepto: '',
        importe: '',
        clienteProveedor: '',
        estado: 'pendiente',
        archivo: null
      });
      setArchivoNombre('');
      setErrores({});
    }
  };

  const handleCancelar = () => {
    setFormData({
      numero: '',
      fecha: '',
      concepto: '',
      importe: '',
      clienteProveedor: '',
      estado: 'pendiente',
      archivo: null
    });
    setArchivoNombre('');
    setErrores({});
    if (onCancelar) {
      onCancelar();
    }
  };

  return (
    <div className={styles.formularioFactura}>
      <h3>{facturaEditar ? 'Editar Factura' : 'Nueva Factura'}</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Número de Factura */}
          <div className={styles.formGroup}>
            <label htmlFor="numero">Número *</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              className={errores.numero ? styles.inputError : ''}
              placeholder="Ej: FAC-2024-001"
            />
            {errores.numero && <span className={styles.mensajeError}>{errores.numero}</span>}
          </div>

          {/* Fecha */}
          <div className={styles.formGroup}>
            <label htmlFor="fecha">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              className={errores.fecha ? styles.inputError : ''}
            />
            {errores.fecha && <span className={styles.mensajeError}>{errores.fecha}</span>}
          </div>

          {/* Concepto */}
          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label htmlFor="concepto">Concepto *</label>
            <input
              type="text"
              id="concepto"
              name="concepto"
              value={formData.concepto}
              onChange={handleInputChange}
              className={errores.concepto ? styles.inputError : ''}
              placeholder="Descripción del servicio o producto"
            />
            {errores.concepto && <span className={styles.mensajeError}>{errores.concepto}</span>}
          </div>

          {/* Importe */}
          <div className={styles.formGroup}>
            <label htmlFor="importe">Importe (€) *</label>
            <input
              type="number"
              id="importe"
              name="importe"
              value={formData.importe}
              onChange={handleInputChange}
              className={errores.importe ? styles.inputError : ''}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
            {errores.importe && <span className={styles.mensajeError}>{errores.importe}</span>}
          </div>

          {/* Cliente/Proveedor */}
          <div className={styles.formGroup}>
            <label htmlFor="clienteProveedor">Cliente/Proveedor *</label>
            <input
              type="text"
              id="clienteProveedor"
              name="clienteProveedor"
              value={formData.clienteProveedor}
              onChange={handleInputChange}
              className={errores.clienteProveedor ? styles.inputError : ''}
              placeholder="Nombre del cliente o proveedor"
            />
            {errores.clienteProveedor && <span className={styles.mensajeError}>{errores.clienteProveedor}</span>}
          </div>

          {/* Estado */}
          <div className={styles.formGroup}>
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagada">Pagada</option>
            </select>
          </div>

          {/* Archivo (opcional) */}
          <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
            <label htmlFor="archivo">Adjuntar Archivo (opcional)</label>
            <input
              type="file"
              id="archivo"
              name="archivo"
              onChange={handleArchivoChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            {archivoNombre && (
              <span className={styles.archivoNombre}>
                Archivo seleccionado: {archivoNombre}
              </span>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnSubmit}>
            {facturaEditar ? 'Actualizar' : 'Guardar'} Factura
          </button>
          <button type="button" onClick={handleCancelar} className={styles.btnCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioFactura;
