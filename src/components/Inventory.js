import { useState, useEffect, useCallback } from 'react';
import { Upload, Filter, Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsCards from './StatsCards';
import ProductTable from './ProductTable';
import FilterPanel from './FilterPanel';
import Orders from './Orders';
import Suppliers from './Suppliers';
import Categories from './Categories';
import Dashboard from './Dashboard';
import Reports from './Reports';
import Alerts from './Alerts';
import Warehouses from './Warehouses';
import { getItems, createItem, updateItem, deleteItem } from '../api';

function Inventory({ user, onLogout }) {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', sku: '', description: '', quantity: 0, price: 0, category: '' });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [activePage, setActivePage] = useState('inventory');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const toggleDarkMode = (val) => {
    setDarkMode(val);
    localStorage.setItem('darkMode', val);
    document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light');
  };

  const fetchItems = useCallback(async (search = '', filters = {}) => {
    try {
      const res = await getItems({ search, ...filters });
      setItems(res.data);
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchItems('', activeFilters); }, [fetchItems, activeFilters]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchItems(term, activeFilters);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    fetchItems(searchTerm, filters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await updateItem(editId, form);
    else await createItem(form);
    setForm({ name: '', sku: '', description: '', quantity: 0, price: 0, category: '' });
    setEditId(null);
    setShowForm(false);
    fetchItems(searchTerm, activeFilters);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, sku: item.sku || '', description: item.description || '', quantity: item.quantity, price: item.price, category: item.category || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => { await deleteItem(id); fetchItems(searchTerm, activeFilters); };

  const handleExport = () => {
    const csv = [
      ['Name', 'SKU', 'Category', 'Quantity', 'Price', 'Description'].join(','),
      ...items.map(i => [i.name, i.sku, i.category, i.quantity, i.price, i.description].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
  };

  const lowStockItems = items.filter(i => i.quantity > 0 && i.quantity <= 5);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <Orders />;
      case 'suppliers': return <Suppliers />;
      case 'categories': return <Categories />;
      case 'warehouses': return <Warehouses />;
      case 'reports': return <Reports />;
      case 'alerts': return <Alerts />;
      default: return (
        <>
          <div className="page-title-row">
            <div><h1>Inventory</h1><p>Manage and track your products in real-time</p></div>
            <div className="page-actions">
              <button className="btn-outline" onClick={handleExport}><Upload size={16} /> Export</button>
              <button className="btn-outline" onClick={() => setShowFilters(true)}><Filter size={16} /> Filters</button>
              <button className="btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', sku: '', description: '', quantity: 0, price: 0, category: '' }); }}>
                <Plus size={16} /> Add Product
              </button>
            </div>
          </div>
          <StatsCards items={items} />
          {showFilters && <FilterPanel categories={[...new Set(items.map(i => i.category).filter(Boolean))]} onApply={handleApplyFilters} onClose={() => setShowFilters(false)} />}
          {showForm && (
            <div className="modal-overlay" onClick={() => setShowForm(false)}>
              <form className="modal-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <h2>{editId ? 'Edit Product' : 'Add Product'}</h2>
                <input placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input placeholder="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} />
                <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                <input placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: +e.target.value })} />
                <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} />
                <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                <div className="modal-actions">
                  <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add'}</button>
                </div>
              </form>
            </div>
          )}
          <ProductTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar lowStockItems={lowStockItems} activePage={activePage} onNavigate={setActivePage} />
      <div className="main-content">
        <Header user={user} onLogout={onLogout} onSearch={handleSearch} darkMode={darkMode} setDarkMode={toggleDarkMode} />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
