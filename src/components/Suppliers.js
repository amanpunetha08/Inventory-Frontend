import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../api';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchSuppliers(); }, []);

  const fetchSuppliers = async () => {
    try { const res = await getSuppliers(); setSuppliers(res.data); } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await updateSupplier(editId, form);
    else await createSupplier(form);
    setForm({ name: '', email: '', phone: '', address: '' });
    setEditId(null);
    setShowForm(false);
    fetchSuppliers();
  };

  const handleEdit = (s) => {
    setEditId(s.id);
    setForm({ name: s.name || '', email: s.email || '', phone: s.phone || '', address: s.address || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => { await deleteSupplier(id); fetchSuppliers(); };

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Suppliers</h1><p>Manage your suppliers</p></div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', email: '', phone: '', address: '' }); }}>
          <Plus size={16} /> Add Supplier
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <form className="modal-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editId ? 'Edit Supplier' : 'Add Supplier'}</h2>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            <div className="modal-actions">
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="product-table-container">
        <table className="product-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th></tr></thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email || '—'}</td>
                <td>{s.phone || '—'}</td>
                <td>{s.address || '—'}</td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleEdit(s)}><Pencil size={16} /></button>
                  <button className="action-btn delete" onClick={() => handleDelete(s.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {suppliers.length === 0 && <p style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No suppliers yet</p>}
      </div>
    </div>
  );
}

export default Suppliers;
