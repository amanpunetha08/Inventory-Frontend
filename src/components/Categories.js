import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try { const res = await getCategories(); setCategories(res.data); } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await updateCategory(editId, form);
    else await createCategory(form);
    setForm({ name: '', description: '' });
    setEditId(null);
    setShowForm(false);
    fetchCategories();
  };

  const handleEdit = (c) => {
    setEditId(c.id);
    setForm({ name: c.name || '', description: c.description || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => { await deleteCategory(id); fetchCategories(); };

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Categories</h1><p>Organize your products</p></div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', description: '' }); }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <form className="modal-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editId ? 'Edit Category' : 'Add Category'}</h2>
            <input placeholder="Category Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <div className="modal-actions">
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="product-table-container">
        <table className="product-table">
          <thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description || '—'}</td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleEdit(c)}><Pencil size={16} /></button>
                  <button className="action-btn delete" onClick={() => handleDelete(c.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <p style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No categories yet</p>}
      </div>
    </div>
  );
}

export default Categories;
