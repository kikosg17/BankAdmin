import React from 'react';
import styles from '../styles/Dashboard.module.css';

const HistoricalBalanceChart = ({ data = [] }) => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <h3>Saldo Histórico</h3>
      </div>
      <div className={styles.widgetContent}>
        <div className={styles.chartPlaceholder}>
          <svg viewBox="0 0 400 200" className={styles.lineChart}>
            {/* Ejes */}
            <line x1="40" y1="10" x2="40" y2="170" stroke="#e0e0e0" strokeWidth="2" />
            <line x1="40" y1="170" x2="380" y2="170" stroke="#e0e0e0" strokeWidth="2" />
            
            {/* Línea de ejemplo */}
            <polyline
              points="40,140 100,120 160,100 220,90 280,110 340,80 380,70"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="3"
            />
            
            {/* Puntos */}
            {[40, 100, 160, 220, 280, 340, 380].map((x, i) => {
              const yValues = [140, 120, 100, 90, 110, 80, 70];
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={yValues[i]}
                  r="5"
                  fill="#4CAF50"
                />
              );
            })}
            
            {/* Etiquetas eje X */}
            <text x="40" y="190" fontSize="12" textAnchor="middle" fill="#666">Ene</text>
            <text x="100" y="190" fontSize="12" textAnchor="middle" fill="#666">Feb</text>
            <text x="160" y="190" fontSize="12" textAnchor="middle" fill="#666">Mar</text>
            <text x="220" y="190" fontSize="12" textAnchor="middle" fill="#666">Abr</text>
            <text x="280" y="190" fontSize="12" textAnchor="middle" fill="#666">May</text>
            <text x="340" y="190" fontSize="12" textAnchor="middle" fill="#666">Jun</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HistoricalBalanceChart;
