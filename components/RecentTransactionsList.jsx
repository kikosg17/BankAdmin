import React from 'react';
import styles from '../styles/Dashboard.module.css';

const RecentTransactionsList = ({ data = [] }) => {
  // Datos de ejemplo como fallback (si no se pasan datos)
  const defaultTransactions = [
    {
      id: 1,
      description: 'Supermercado Carrefour',
      category: 'Alimentos',
      amount: -67.45,
      date: '2024-10-10',
      bank: 'Santander',
      type: 'expense'
    },
    {
      id: 2,
      description: 'Salario mensual',
      category: 'Ingresos',
      amount: 2500.00,
      date: '2024-10-01',
      bank: 'BBVA',
      type: 'income'
    },
    {
      id: 3,
      description: 'Gasolinera Repsol',
      category: 'Transporte',
      amount: -45.20,
      date: '2024-10-09',
      bank: 'CaixaBank',
      type: 'expense'
    },
    {
      id: 4,
      description: 'Netflix',
      category: 'Entretenimiento',
      amount: -12.99,
      date: '2024-10-08',
      bank: 'ING Direct',
      type: 'expense'
    },
    {
      id: 5,
      description: 'Restaurante La Parrilla',
      category: 'Alimentos',
      amount: -35.80,
      date: '2024-10-07',
      bank: 'Santander',
      type: 'expense'
    },
    {
      id: 6,
      description: 'Transferencia recibida',
      category: 'Ingresos',
      amount: 150.00,
      date: '2024-10-06',
      bank: 'BBVA',
      type: 'income'
    }
  ];

  // ✅ USAR los datos recibidos o los datos por defecto
  const transactions = data.length > 0 ? data : defaultTransactions;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <h3>Movimientos Recientes</h3>
      </div>
      <div className={styles.widgetContent}>
        <div className={styles.transactionsList}>
          {transactions.map((transaction) => (
            <div key={transaction.id} className={styles.transactionItem}>
              <div className={styles.transactionLeft}>
                <div className={styles.transactionDate}>
                  {formatDate(transaction.date)}
                </div>
                <div className={styles.transactionIcon}>
                  {transaction.type === 'income' ? '↑' : '↓'}
                </div>
                <div className={styles.transactionDetails}>
                  <div className={styles.transactionDescription}>
                    {transaction.description}
                  </div>
                  <div className={styles.transactionMeta}>
                    <span className={styles.transactionCategory}>
                      {transaction.category}
                    </span>
                    <span className={styles.transactionBank}>
                      {transaction.bank}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${styles.transactionAmount} ${styles[transaction.type]}`}>
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionsList;
