// frontend/components/Sidebar.jsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutGrid, TrendingUp, ArrowLeftRight, FileText, BarChart3, Bell, Building2,
  Plug, Zap, Users, Package, Tag
} from 'lucide-react';
import { logout } from '../lib/auth';

const ITEMS = [
  { href: '/paneles-financieros', label: 'Paneles Financieros', icon: LayoutGrid, count: 2 },
  { href: '/previsiones', label: 'Previsiones', icon: TrendingUp, count: 1 },
  { href: '/transacciones', label: 'Transacciones', icon: ArrowLeftRight, count: 1300 },
  { href: '/facturas', label: 'Facturas', icon: FileText, count: 0 },
  { href: '/informes', label: 'Informes', icon: BarChart3, count: 0 },
  { href: '/alertas', label: 'Alertas', icon: Bell, count: 0 },
  { href: '/bancos', label: 'Bancos', icon: Building2, count: 1 },
  { href: '/integraciones', label: 'Integraciones', icon: Plug, count: 1 },
  { href: '/reglas', label: 'Reglas Automáticas', icon: Zap, count: 0 },
  { href: '/contactos', label: 'Contactos', icon: Users, count: 14 },
  { href: '/productos', label: 'Productos', icon: Package, count: 0 },
  { href: '/etiquetas', label: 'Etiquetas', icon: Tag, count: 11 },
];

export default function Sidebar() {
  const router = useRouter();
  const isActive = (href) => router.pathname === href;
  
  return (
    <>
      <h3>Navegación</h3>
      <ul className="sidebar-nav">
        {ITEMS.map(({ href, label, icon: Icon, count }) => (
          <li key={href}>
            <Link
              className={`sidebar-link ${isActive(href) ? 'active' : ''}`}
              href={href}
            >
              <Icon size={20} />
              <span>{label}</span>
              <span className="counter">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button className="btn" onClick={logout}>Cerrar sesión</button>
      </div>
    </>
  );
}
