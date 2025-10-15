// frontend/pages/index.jsx
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 style={{marginTop:0}}>Bienvenido a BankTracc</h1>
      <p>Elige una sección para empezar.</p>

      <div className={styles.grid}>
        <Link href="/paneles-financieros" className={`${styles.card} card`}>
          <h2>Paneles financieros</h2>
          <p>KPIs, saldos y visualizaciones.</p>
        </Link>

        <Link href="/transacciones" className={`${styles.card} card`}>
          <h2>Transacciones</h2>
          <p>Busca, filtra y analiza movimientos.</p>
        </Link>

        <Link href="/previsiones" className={`${styles.card} card`}>
          <h2>Previsiones</h2>
          <p>Escenarios de tesorería.</p>
        </Link>

        <Link href="/bancos" className={`${styles.card} card`}>
          <h2>Bancos</h2>
          <p>Conexiones y productos bancarios.</p>
        </Link>

        <Link href="/facturas" className={`${styles.card} card`}>
          <h2>Facturas</h2>
          <p>Registro y conciliación.</p>
        </Link>

        <Link href="/alertas" className={`${styles.card} card`}>
          <h2>Alertas</h2>
          <p>Umbrales, cargos duplicados y más.</p>
        </Link>

        <Link href="/integraciones" className={`${styles.card} card`}>
          <h2>Integraciones</h2>
          <p>Conecta con otros sistemas.</p>
        </Link>

        <Link href="/reglas" className={`${styles.card} card`}>
          <h2>Reglas</h2>
          <p>Automatiza la categorización y acciones.</p>
        </Link>
      </div>
    </div>
  );
}
