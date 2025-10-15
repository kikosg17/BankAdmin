// frontend/components/ChartComposed.jsx
'use client';
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function ChartComposed({ data }) {
  // data: [{ mes:'Ene', cobros: 12000, pagos: -9000, saldo: 3000, saldoProj: 5000? }]
  return (
    <div style={{ width:'100%', height:400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid stroke="#E5E7EB" strokeOpacity={0.6} vertical={false} />
          <XAxis dataKey="mes" tick={{ fill:'#667085', fontSize:12 }} />
          <YAxis yAxisId="left" tick={{ fill:'#667085', fontSize:12 }} />
          {/* opcional: segundo eje para saldo acumulado
          <YAxis yAxisId="right" orientation="right" tick={{ fill:'#667085', fontSize:12 }} />
          */}
          <Tooltip />
          <Legend />

          <Bar yAxisId="left" dataKey="cobros" name="Cobros" fill="#3B82F6" barSize={24} radius={[4,4,0,0]} />
          <Bar yAxisId="left" dataKey="pagos"  name="Pagos"  fill="#EF4444" barSize={24} radius={[4,4,0,0]} />

          <Line type="monotone" dataKey="saldo" name="Saldo" stroke="#6366F1" strokeWidth={2.5} dot={{ r:4 }} />
          {/* proyección (si la incluyes en data) */}
          <Line type="monotone" dataKey="saldoProj" name="Saldo (proy.)" stroke="#6366F1" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r:0 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
