import { useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurrency } from '../CurrencyContext';

function ProductTable({ items, onEdit, onDelete }) {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const { format } = useCurrency();

  const filtered = items.filter(item => {
    if (filter === 'low') return item.quantity > 0 && item.quantity <= 5;
    if (filter === 'out') return item.quantity === 0;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const getStatus = (qty) => {
    if (qty === 0) return <span className="status-badge out">Out of Stock</span>;
    if (qty <= 5) return <span className="status-badge low">Low Stock</span>;
    return <span className="status-badge in">In Stock</span>;
  };

  return (
    <div className="product-table-container">
      <div className="table-header">
        <div className="table-filters">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => { setFilter('all'); setPage(1); }}>All Products</button>
          <button className={`filter-btn ${filter === 'low' ? 'active' : ''}`} onClick={() => { setFilter('low'); setPage(1); }}>Low Stock</button>
          <button className={`filter-btn ${filter === 'out' ? 'active' : ''}`} onClick={() => { setFilter('out'); setPage(1); }}>Out of Stock</button>
        </div>
        <div className="table-pagination-top">
          <select value={perPage} readOnly>
            <option>10 per page</option>
          </select>
          <div className="pagination">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={16} /></button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
              <button key={i + 1} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            {totalPages > 3 && <span>...</span>}
            {totalPages > 3 && <button className={`page-btn ${page === totalPages ? 'active' : ''}`} onClick={() => setPage(totalPages)}>{totalPages}</button>}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <table className="product-table">
        <colgroup>
          <col style={{ width: '3%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '17%' }} />
        </colgroup>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(item => (
            <tr key={item.id}>
              <td><input type="checkbox" /></td>
              <td className="product-cell">{item.name}</td>
              <td>{item.sku || '—'}</td>
              <td>{item.category || '—'}</td>
              <td>{item.quantity}</td>
              <td>{getStatus(item.quantity)}</td>
              <td>{format(item.price)}</td>
              <td className="actions-cell">
                <button className="action-btn edit" onClick={() => onEdit(item)}><Pencil size={16} /></button>
                <button className="action-btn delete" onClick={() => onDelete(item.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} results
      </div>
    </div>
  );
}

export default ProductTable;
