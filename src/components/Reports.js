import { useState, useEffect } from 'react';
import { BarChart3, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { getReports } from '../api';
import { useCurrency } from '../CurrencyContext';

function Reports() {
  const [data, setData] = useState(null);
  const { format } = useCurrency();

  useEffect(() => { getReports().then(res => setData(res.data)).catch(() => {}); }, []);

  if (!data) return <div className="page-section"><p>Loading...</p></div>;

  const { inventory, stock_distribution, category_report, top_items, orders } = data;

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Reports</h1><p>Inventory and order analytics</p></div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Package size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Items</span>
            <span className="stat-value">{inventory.total_items}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Quantity</span>
            <span className="stat-value">{inventory.total_quantity}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><BarChart3 size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Inventory Value</span>
            <span className="stat-value">{format(inventory.total_value)}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><ShoppingCart size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Orders Value</span>
            <span className="stat-value">{format(orders.total_value)}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-panels">
        <div className="dashboard-panel">
          <h3>Stock Distribution</h3>
          <div className="breakdown-list">
            <div className="breakdown-item"><span>In Stock (&gt;5)</span><span className="status-badge in">{stock_distribution.in_stock}</span></div>
            <div className="breakdown-item"><span>Low Stock (1-5)</span><span className="status-badge low">{stock_distribution.low_stock}</span></div>
            <div className="breakdown-item"><span>Out of Stock (0)</span><span className="status-badge out">{stock_distribution.out_of_stock}</span></div>
          </div>
          <div className="stock-bar">
            <div className="stock-bar-segment in" style={{ width: `${(stock_distribution.in_stock / inventory.total_items) * 100}%` }}></div>
            <div className="stock-bar-segment low" style={{ width: `${(stock_distribution.low_stock / inventory.total_items) * 100}%` }}></div>
            <div className="stock-bar-segment out" style={{ width: `${(stock_distribution.out_of_stock / inventory.total_items) * 100}%` }}></div>
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Orders by Status</h3>
          <div className="breakdown-list">
            {Object.entries(orders.by_status).map(([status, count]) => (
              <div key={status} className="breakdown-item">
                <span>{status}</span>
                <span className={`status-badge ${status === 'Delivered' ? 'in' : status === 'Shipped' ? 'low' : 'out'}`}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Category Report</h3>
          <div className="breakdown-list">
            {Object.entries(category_report).map(([cat, stats]) => (
              <div key={cat} className="breakdown-item">
                <span>{cat}</span>
                <span>{stats.items} items · {stats.quantity} units · {format(stats.value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Top Items by Value</h3>
          <div className="breakdown-list">
            {top_items.map((item, i) => (
              <div key={i} className="breakdown-item">
                <span>{item.name}</span>
                <span>{format(item.value)} ({item.quantity} units)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
