import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from '../api';

function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', stock: 0 });
  const [editId, setEditId] = useState(null);

  const fetch = () => getWarehouses().then(r => setWarehouses(r.data)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await updateWarehouse(editId, form);
    else await createWarehouse(form);
    setForm({ name: '', location: '', stock: 0 });
    setEditId(null);
    setShowForm(false);
    fetch();
  };

  const handleEdit = (w) => {
    setEditId(w.id);
    setForm({ name: w.name, location: w.location || '', stock: w.stock || 0 });
    setShowForm(true);
  };

  const handleDelete = async (id) => { await deleteWarehouse(id); fetch(); };

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Warehouses</h1><p>Manage your warehouse locations</p></div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', location: '', stock: 0 }); }}>
          <Plus size={16} /> Add Warehouse
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <form className="modal-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editId ? 'Edit Warehouse' : 'Add Warehouse'}</h2>
            <input placeholder="Warehouse Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <input placeholder="Stock Capacity" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: +e.target.value })} />
            <div className="modal-actions">
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr><th>Name</th><th>Location</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {warehouses.map(w => (
              <tr key={w.id}>
                <td className="product-cell">{w.name}</td>
                <td>{w.location || '—'}</td>
                <td>{w.stock || 0}</td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleEdit(w)}><Edit2 size={16} /></button>
                  <button className="action-btn delete" onClick={() => handleDelete(w.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {warehouses.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', color: '#999', padding: 24 }}>No warehouses added yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Warehouses;
