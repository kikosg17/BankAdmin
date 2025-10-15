# BankTracc Frontend - README

## 🚀 Descripción

Aplicación frontend para el sistema de gestión financiera BankTracc, construida con Next.js 14 y React 18.

## 🛠️ Instalación y Configuración

### Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

### Pasos de Instalación

```bash
# 1. Navegar al directorio frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar linter
```

## ✅ Problemas Identificados y Solucionados

### 1. **Archivos Críticos Faltantes** ✅ SOLUCIONADO

**Problema:**
- Faltaba `pages/_app.jsx` - archivo esencial para Next.js
- Faltaba `pages/index.jsx` - página de inicio/entrada

**Solución:**
- ✅ Se creó `pages/_app.jsx` que envuelve todas las páginas con el Layout
- ✅ Se creó `pages/index.jsx` con la página de inicio y enlaces a secciones principales

---

### 2. **Error: `classname` en lugar de `className`** ⚠️ REQUIERE CORRECCIÓN

**Problema:**
En React/JSX, el atributo HTML `class` debe escribirse como `className`. Varios archivos usan incorrectamente `classname` (minúscula).

**Archivos Afectados:**
- `components/Layout.jsx` (líneas 19, 21, 24, 29, 32)
- `components/Sidebar.jsx` (líneas 33, 35, 39)
- `pages/Bancos.jsx` (línea 18)
- `pages/Facturas.jsx` (líneas 179, 181, 192, 194, 196, 198, etc.)
- Y potencialmente otros archivos

**Cómo Corregir:**

Buscar y reemplazar en todos los archivos `.jsx`:
```bash
# Buscar: classname=
# Reemplazar: className=
```

**Ejemplo de Corrección:**
```jsx
// INCORRECTO ❌
<div classname="container">

// CORRECTO ✅
<div className="container">
```

---

### 3. **Error: Componentes en Minúsculas** ⚠️ REQUIERE CORRECCIÓN

**Problema:**
En `pages/Facturas.jsx`, los componentes React están escritos en minúsculas, lo que JSX interpreta como etiquetas HTML en lugar de componentes React.

**Archivos Afectados:**
- `pages/Facturas.jsx` (líneas 242, 249, 254)

**Cómo Corregir:**

```jsx
// INCORRECTO ❌ (línea 242)
<formulariofactura
  facturaEditar={facturaEditar}
  onSubmit={handleSubmitFactura}
  onCancelar={handleCancelar}
/>

// CORRECTO ✅
<FormularioFactura
  facturaEditar={facturaEditar}
  onSubmit={handleSubmitFactura}
  onCancelar={handleCancelar}
/>
```

También corregir:
- `<filtrosfacturas>` → `<FiltrosFacturas>`
- `<listafacturas>` → `<ListaFacturas>`

---

### 4. **Error: Uso Incorrecto del Componente Link** ⚠️ REQUIERE CORRECCIÓN

**Problema:**
En `components/Sidebar.jsx`, se usa `<link>` (etiqueta HTML) en lugar de `<Link>` (componente de Next.js).

**Archivo Afectado:**
- `components/Sidebar.jsx` (línea 46)

**Cómo Corregir:**

```jsx
// INCORRECTO ❌ (línea 46)
<link href={item.path}>
  {item.name}
</link>

// CORRECTO ✅
<Link href={item.path}>
  {item.name}
</Link>
```

---

### 5. **Posibles Archivos CSS Faltantes** ⚠️ VERIFICAR

**Problema:**
Algunos componentes importan archivos CSS que podrían no existir:
- `styles/globals.css` (importado en `_app.jsx`)
- `styles/Home.module.css` (importado en `index.jsx`)
- `styles/Facturas.module.css` (importado en `Facturas.jsx`)

**Solución:**
Verificar que estos archivos existan en el directorio `styles/`. Si no existen, crearlos con estilos básicos.

---

## 🛡️ Troubleshooting (Solución de Problemas)

### Error: "Module not found"

**Causa:** Archivos CSS o componentes importados no existen.

**Solución:**
1. Verificar que todos los archivos importados existan
2. Verificar la ruta de importación es correcta
3. Crear archivos faltantes si es necesario

```bash
# Ejemplo para crear archivo CSS faltante
touch styles/globals.css
touch styles/Home.module.css
```

### Error: "Invalid DOM property `classname`"

**Causa:** Uso de `classname` en lugar de `className`.

**Solución:**
Reemplazar todas las instancias de `classname` por `className` (ver sección 2 arriba).

### Error: "Element type is invalid"

**Causa:** Componentes escritos en minúsculas o mal importados.

**Solución:**
1. Verificar que los componentes usen PascalCase (primera letra mayúscula)
2. Verificar que las importaciones sean correctas

### Error 404: Página no encontrada

**Causa:** Faltaba `index.jsx` o rutas mal configuradas.

**Solución:**
✅ Ya se creó `pages/index.jsx`. Verificar que las rutas en el Sidebar coincidan con los nombres de archivo en `pages/`.

### La aplicación no inicia

**Soluciones:**

1. **Limpiar cache y reinstalar:**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Verificar versión de Node.js:**
```bash
node --version  # Debe ser 18.x o superior
```

3. **Verificar puerto 3000:**
```bash
# Si el puerto 3000 está ocupado, usar otro puerto
npm run dev -- -p 3001
```

---

## 📋 Checklist de Corrección

Para hacer la app completamente funcional, ejecutar estos pasos:

- [x] Crear `pages/_app.jsx`
- [x] Crear `pages/index.jsx`
- [ ] Reemplazar `classname` por `className` en todos los archivos
- [ ] Corregir componentes en minúsculas en `Facturas.jsx`
- [ ] Corregir uso de `<link>` por `<Link>` en `Sidebar.jsx`
- [ ] Verificar/crear archivos CSS faltantes
- [ ] Probar la aplicación con `npm run dev`

---

## 📝 Estructura del Proyecto

```
frontend/
├── assets/              # Imágenes y recursos estáticos
├── components/          # Componentes reutilizables
│   ├── Layout.jsx       # Layout principal (header + sidebar)
│   ├── Sidebar.jsx      # Menú lateral de navegación
│   ├── ListaFacturas.jsx
│   └── ...
├── pages/               # Páginas/rutas de la app
│   ├── _app.jsx         # ✅ Wrapper principal de Next.js
│   ├── index.jsx        # ✅ Página de inicio
│   ├── Bancos.jsx
│   ├── Facturas.jsx
│   ├── Transacciones.jsx
│   └── ...
├── styles/              # Archivos CSS y estilos
├── next.config.js       # Configuración de Next.js
├── package.json         # Dependencias del proyecto
└── README.md            # Este archivo
```

---

## 🔗 Rutas Disponibles

Una vez corregidos los errores, estas rutas estarán disponibles:

- `/` - Página de inicio
- `/paneles-financieros` - Paneles y dashboards
- `/transacciones` - Gestión de transacciones
- `/facturas` - Gestión de facturas
- `/informes` - Generación de informes
- `/bancos` - Gestión de cuentas bancarias
- `/alertas` - Configuración de alertas
- `/integraciones` - Integraciones con APIs
- Y más...

---

## 🎯 Próximos Pasos

1. Aplicar todas las correcciones mencionadas en el Checklist
2. Crear/verificar archivos CSS faltantes
3. Conectar con el backend (configurar API endpoints)
4. Añadir variables de entorno para URLs del backend
5. Implementar autenticación de usuarios
6. Completar funcionalidades pendientes (marcadas con TODO)

---

## 📞 Soporte

Si encuentras más problemas:

1. Revisar la consola del navegador para errores específicos
2. Revisar los logs del servidor (`npm run dev`)
3. Verificar que todas las dependencias estén instaladas
4. Consultar la documentación de Next.js: https://nextjs.org/docs

---

**📢 Nota Importante:** Los archivos `_app.jsx` e `index.jsx` ya han sido creados y solucionan los problemas críticos. Los demás errores (`classname`, componentes en minúsculas) deben corregirse manualmente en los archivos afectados para que la aplicación funcione completamente.
