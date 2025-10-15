import { useState } from 'react';
import { api } from '../lib/api';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('demo@demo.com');
  const [password, setPassword] = useState('demo1234');
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register';
      const data = await api(path, { method:'POST', body: { email, password } });
      localStorage.setItem('auth_token', data.token);
      if (data.workspaces?.[0]) {
        localStorage.setItem('ws_id', data.workspaces[0].id);
      }
      // Guarda también en cookie para que el middleware pueda leerlo en el edge
      // Cookie no-httpOnly (demo). En producción idealmente la pone el backend con httpOnly.
      document.cookie = `auth_token=${data.token}; Path=/; Max-Age=${7*24*60*60}; SameSite=Lax`;
      if (data.workspaces?.[0]?.id) {
        document.cookie = `ws_id=${data.workspaces[0].id}; Path=/; Max-Age=${7*24*60*60}; SameSite=Lax`;
      }
      router.push('/paneles-financieros');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div style={{display:'grid', placeItems:'center', height:'100vh'}}>
      <form onSubmit={onSubmit} className="card" style={{ width:360 }}>
        <h2 style={{marginTop:0}}>Acceso</h2>
        <div style={{display:'grid', gap:12}}>
          <input className="input" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-neg" style={{fontSize:13}}>{error}</div>}
          <button className="btn btn-primary" type="submit">{mode==='login'?'Entrar':'Crear cuenta'}</button>
          <button className="btn" type="button" onClick={()=>setMode(mode==='login'?'register':'login')}>
            {mode==='login' ? 'Crear una cuenta' : 'Ya tengo cuenta'}
          </button>
        </div>
      </form>
    </div>
  );
}
