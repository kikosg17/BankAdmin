// frontend/components/ChartDonut.jsx
'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PALETTE = ['#000000', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'];

export default function ChartDonut({ data }) {
  // data: [{ name:'Sin etiquetas', value: 101676.10, tx:148 }, ...]
  return (
    <div style={{ display:'flex', gap:24, alignItems:'center' }}>
      <div style={{ width: 280, height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={1}
              stroke="none"
            >
              {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda a la derecha */}
      <div style={{ display:'grid', gap:10 }}>
        {data.map((d, i) => (
          <div key={d.name} style={{ display:'grid', gridTemplateColumns:'16px 1fr auto', alignItems:'center', gap:8 }}>
            <div style={{ width:12, height:12, borderRadius:999, background: PALETTE[i % PALETTE.length] }} />
            <div style={{ display:'flex', flexDirection:'column' }}>
              <div style={{ fontSize:14, fontWeight:600 }}>{d.name}</div>
              <div style={{ fontSize:12, color:'#6B7280' }}>{d.tx} transacciones</div>
            </div>
            <div style={{ fontSize:14, color:'#475467' }}>
              {d.value.toLocaleString('es-ES', { style:'currency', currency:'EUR' })} ({d.pct}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
