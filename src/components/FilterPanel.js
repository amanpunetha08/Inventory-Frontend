import { useState } from 'react';
import { X } from 'lucide-react';

function FilterPanel({ categories, onApply, onClose }) {
  const [filters, setFilters] = useState({ category: '', status: '', min_price: '', max_price: '', sort: '' });

  const handleApply = () => { onApply(filters); onClose(); };
  const handleClear = () => { setFilters({ category: '', status: '', min_price: '', max_price: '', sort: '' }); onApply({}); onClose(); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-form" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Filters</h2>
          <button className="action-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <label className="filter-label">Category</label>
        <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label className="filter-label">Stock Status</label>
        <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          <option value="in_stock">In Stock (&gt;5)</option>
          <option value="low_stock">Low Stock (1-5)</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>

        <label className="filter-label">Price Range (₹)</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Min" type="number" value={filters.min_price} onChange={e => setFilters({ ...filters, min_price: e.target.value })} />
          <input placeholder="Max" type="number" value={filters.max_price} onChange={e => setFilters({ ...filters, max_price: e.target.value })} />
        </div>

        <label className="filter-label">Sort By</label>
        <select value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value })}>
          <option value="">Newest First</option>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
          <option value="quantity_asc">Stock Low to High</option>
          <option value="quantity_desc">Stock High to Low</option>
        </select>

        <div className="modal-actions">
          <button type="button" className="btn-outline" onClick={handleClear}>Clear</button>
          <button type="button" className="btn-primary" onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
