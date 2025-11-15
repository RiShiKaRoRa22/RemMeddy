import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/auth';

export default function Signup(){
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, phone, password })
    });
    const data = await res.json();
    if (data.token) { saveToken(data.token); nav('/dashboard'); }
    else alert(data.message || 'Signup failed');
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder='Phone' value={phone} onChange={e=>setPhone(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Create</button>
      </form>
    </div>
  );
}
