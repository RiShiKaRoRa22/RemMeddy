import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';

export default function Logs(){
  const [logs, setLogs] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/logs/all`, { headers: { Authorization: `Bearer ${getToken()}` }});
    const data = await res.json(); setLogs(data);
  }

  async function confirm(id){
    await fetch(`${process.env.REACT_APP_API_URL}/medicines/take/${id}`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }});
    load();
  }

  return (
    <div>
      <h2>Reminder Logs</h2>
      {logs.map(l => (
        <div key={l._id}>
          <p>{l.medicine?.name || 'med'} — Sent: {new Date(l.sentAt).toLocaleString()} — Confirmed: {String(l.confirmed)}</p>
          {!l.confirmed && <button onClick={()=>confirm(l._id)}>Mark taken</button>}
        </div>
      ))}
    </div>
  );
}
