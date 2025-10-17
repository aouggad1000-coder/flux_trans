'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function ShipmentsPage() {
  const [list, setList] = useState<any[]>([]);
  const [ref, setRef] = useState('SHPT-' + Math.floor(Math.random()*1e6));
  const [email, setEmail] = useState('client@example.com');

  async function fetchList() {
    const res = await fetch(`${API}/api/shipments`);
    const data = await res.json();
    setList(data);
  }

  useEffect(() => { fetchList(); }, []);

  async function createShipment() {
    await fetch(`${API}/api/shipments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref, mode: 'SEA', shipper: { email }, consignee: { email }
      })
    });
    await fetchList();
  }

  async function addMilestone(id: string, code: string) {
    await fetch(`${API}/api/shipments/${id}/milestones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        occurred_at: new Date().toISOString(),
        data: { note: 'Demo action' }
      })
    });
    await fetchList();
  }

  return (
    <div>
      <h2>Dossiers</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={ref} onChange={e=>setRef(e.target.value)} placeholder="Référence" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email client" />
        <button onClick={createShipment}>Créer</button>
      </div>

      {list.map((s)=> (
        <div key={s.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 10 }}>
          <b>{s.ref}</b> — {s.mode}
          <div style={{ marginTop: 6 }}>
            <button onClick={()=>addMilestone(s.id, 'LOADED_VESSEL')}>LOADED_VESSEL</button>
            <button onClick={()=>addMilestone(s.id, 'VESSEL_ARRIVED')}>VESSEL_ARRIVED</button>
            <button onClick={()=>addMilestone(s.id, 'DELIVERED_POD')}>DELIVERED_POD</button>
          </div>
          <div>
            <small>Milestones:</small>
            <ul>
              {s.milestones?.map((m:any)=>(
                <li key={m.id}>{m.code} — {new Date(m.occurredAt).toLocaleString()}</li>
              ))}
            </ul>
          </div>
          <div>
            <small>Docs:</small>
            <ul>
              {s.documents?.map((d:any)=>(<li key={d.id}>{d.type} — {d.path}</li>))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
