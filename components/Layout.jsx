// frontend/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import TopTabs from './TopTabs';
import { Settings, Plus } from 'lucide-react';
import WorkspaceSelect from './WorkspaceSelect';
import { logout } from '../lib/auth';

const getTabsByPath = (pathname) => {
  if (pathname.startsWith('/paneles-financieros')) {
    return [
      { key: 'general', label: 'General' },
      { key: 'flujo', label: 'Flujo de caja' },
    ];
  }
  if (pathname.startsWith('/previsiones')) {
    return [
      { key: 'escenarios', label: 'Escenarios' },
      { key: 'saldos', label: 'Saldos' },
      { key: 'calendario', label: 'Calendario' },
      { key: 'operaciones', label: 'Operaciones' },
    ];
  }
  if (pathname.startsWith('/transacciones')) {
    return [
      { key: 'todas', label: 'Todas' },
      { key: 'cobros', label: 'Cobros' },
      { key: 'pagos', label: 'Pagos' },
    ];
  }
  return [];
};

import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const tabs = getTabsByPath(router.pathname);
  
  return (
    <div className="layout">
      {/* Header global */}
      <header className="layout-header">
        <div className="header-left">
          <div className="logo" />
          <div className="title">BankTracc</div>
        </div>
        <div className="header-center">
          {tabs.length > 0 && <TopTabs tabs={tabs} />}
        </div>
        <div className="header-right">
          <button className="icon-btn" title="Settings" aria-label="settings">
            <Settings size={20} />
          </button>
          <button className="icon-btn" title="Añadir" aria-label="add">
            <Plus size={20} />
          </button>
          <WorkspaceSelect />
          <button className="btn" onClick={logout}>Cerrar sesión</button>
          <div className="avatar">N</div>
        </div>
      </header>
      {/* Sidebar fija con contadores */}
      <aside className="sidebar">
        <Sidebar />
      </aside>
      {/* Contenido */}
      <main className="layout-content">
        <div className="container-xxl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
