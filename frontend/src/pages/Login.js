import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveToken } from '../utils/auth';

export default function Login(){
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ phone, password })
    });
    const data = await res.json();
    if (data.token) { saveToken(data.token); nav('/dashboard'); }
    else alert(data.message || 'Login failed');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder='Phone' value={phone} onChange={e=>setPhone(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <Link to='/signup'>Create account</Link>
    </div>
  );
}
