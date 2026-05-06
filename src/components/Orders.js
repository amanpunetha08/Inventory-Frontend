import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api';
import { useCurrency } from '../CurrencyContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ product: '', quantity: 1, supplier: '', status: 'Pending', total: 0 });
  const [editId, setEditId] = useState(null);
  const { format } = useCurrency();

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try { const res = await getOrders(); setOrders(res.data); } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await updateOrder(editId, form);
    else await createOrder(form);
    setForm({ product: '', quantity: 1, supplier: '', status: 'Pending', total: 0 });
    setEditId(null);
    setShowForm(false);
    fetchOrders();
  };

  const handleEdit = (o) => {
    setEditId(o.id);
    setForm({ product: o.product || '', quantity: o.quantity || 1, supplier: o.supplier || '', status: o.status || 'Pending', total: o.total || 0 });
    setShowForm(true);
  };

  const handleDelete = async (id) => { await deleteOrder(id); fetchOrders(); };

  const getStatusClass = (s) => {
    if (s === 'Delivered') return 'in';
    if (s === 'Shipped') return 'low';
    return 'out';
  };

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Orders</h1><p>Manage purchase orders</p></div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm({ product: '', quantity: 1, supplier: '', status: 'Pending', total: 0 }); }}>
          <Plus size={16} /> New Order
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <form className="modal-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editId ? 'Edit Order' : 'New Order'}</h2>
            <input placeholder="Product" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} required />
            <input placeholder="Supplier" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} />
            <input placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: +e.target.value })} />
            <input placeholder="Total ($)" type="number" step="0.01" value={form.total} onChange={e => setForm({ ...form, total: +e.target.value })} />
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Pending</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
            </select>
            <div className="modal-actions">
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">{editId ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="product-table-container">
        <table className="product-table">
          <thead><tr><th>Product</th><th>Supplier</th><th>Qty</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.product}</td>
                <td>{o.supplier || '—'}</td>
                <td>{o.quantity}</td>
                <td>{format(Number(o.total || 0))}</td>
                <td><span className={`status-badge ${getStatusClass(o.status)}`}>{o.status}</span></td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleEdit(o)}><Pencil size={16} /></button>
                  <button className="action-btn delete" onClick={() => handleDelete(o.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No orders yet</p>}
      </div>
    </div>
  );
}

export default Orders;
