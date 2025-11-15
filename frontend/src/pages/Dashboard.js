import { useEffect, useState } from 'react';
import { getToken, authHeader, clearToken } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState({ name:'', dose:'', notes:'', times:'' });
  const nav = useNavigate();

  useEffect(()=>{ fetchMeds(); }, []);

  async function fetchMeds(){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/medicines`, { headers: { Authorization: `Bearer ${getToken()}` }});
    const data = await res.json();
    setMeds(data);
  }

  async function addMed(e){
    e.preventDefault();
    const body = { name: form.name, dose: form.dose, notes: form.notes, schedule: { times: form.times.split(',').map(s=>s.trim()) } };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/medicines`, {
      method:'POST', headers:{ 'Content-Type':'application/json', Authorization: `Bearer ${getToken()}` }, body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) { setForm({ name:'', dose:'', notes:'', times:'' }); fetchMeds(); }
    else alert(data.message || 'Error');
  }

  async function deleteMed(id) {
  if (!window.confirm("Are you sure you want to stop this medicine?")) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/medicines/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete");
      return;
    }

    alert("Medicine stopped.");
    fetchMeds(); // refresh list
  } catch (err) {
    console.error("Delete error:", err);
    alert("Server error");
  }
}


  function logout(){ clearToken(); nav('/login'); }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <h3>Add Medicine</h3>
      <form onSubmit={addMed}>
        <input placeholder='Medicine name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder='Dose' value={form.dose} onChange={e=>setForm({...form,dose:e.target.value})} />
        <input placeholder='Notes' value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
        <input placeholder='Times (HH:MM,HH:MM)' value={form.times} onChange={e=>setForm({...form,times:e.target.value})} />
        <button type='submit'>Add</button>
      </form>

      <h3>Your Medicines</h3>
      <ul>
  {meds.map(m => (
    <li key={m._id}>
      {m.name} — {m.dose} — {m.schedule?.times?.join(', ')}
      <button 
        onClick={() => deleteMed(m._id)}
        style={{ marginLeft: "10px", background: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>


      <Link to='/logs'>View Logs</Link>
    </div>
  );
}
