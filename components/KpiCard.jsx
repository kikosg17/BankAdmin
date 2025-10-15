// frontend/components/KpiCard.jsx
export default function KpiCard({ title, period, value, tone = 'neutral' }) {
  const toneClass = tone === 'success' ? 'kpi-success' : tone === 'danger' ? 'kpi-danger' : 'kpi-neutral';
  return (
    <div className="card card-min">
      <div className="card-title">{title}</div>
      <div className="card-sub">{period}</div>
      <div className={`kpi ${toneClass}`}>{value}</div>
    </div>
  );
}
