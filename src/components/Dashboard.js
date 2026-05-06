import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, Grid3X3, TrendingDown, XCircle, DollarSign, AlertTriangle } from 'lucide-react';
import { getDashboard } from '../api';
import { useCurrency } from '../CurrencyContext';

function Dashboard() {
  const [data, setData] = useState(null);
  const { format } = useCurrency();

  useEffect(() => {
    getDashboard().then(res => setData(res.data)).catch(() => {});
  }, []);

  if (!data) return <div className="page-section"><p>Loading...</p></div>;

  const { summary, orders_breakdown, category_stats, recent_orders, low_stock_items } = data;

  const summaryCards = [
    { label: 'Total Products', value: summary.total_products, icon: Package, color: 'blue' },
    { label: 'Total Orders', value: summary.total_orders, icon: ShoppingCart, color: 'orange' },
    { label: 'Suppliers', value: summary.total_suppliers, icon: Users, color: 'green' },
    { label: 'Categories', value: summary.total_categories, icon: Grid3X3, color: 'blue' },
    { label: 'Low Stock', value: summary.low_stock, icon: TrendingDown, color: 'orange' },
    { label: 'Out of Stock', value: summary.out_of_stock, icon: XCircle, color: 'red' },
    { label: 'Pending Orders', value: summary.pending_orders, icon: AlertTriangle, color: 'orange' },
    { label: 'Inventory Value', value: format(summary.total_value), icon: DollarSign, color: 'green' },
  ];

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Dashboard</h1><p>Overview of your inventory</p></div>
      </div>

      <div className="dashboard-grid">
        {summaryCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div className={`stat-icon ${color}`}><Icon size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">{label}</span>
              <span className="stat-value">{value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-panels">
        <div className="dashboard-panel">
          <h3>Orders Breakdown</h3>
          <div className="breakdown-list">
            <div className="breakdown-item"><span>Pending</span><span className="status-badge out">{orders_breakdown.pending}</span></div>
            <div className="breakdown-item"><span>Shipped</span><span className="status-badge low">{orders_breakdown.shipped}</span></div>
            <div className="breakdown-item"><span>Delivered</span><span className="status-badge in">{orders_breakdown.delivered}</span></div>
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Category Breakdown</h3>
          <div className="breakdown-list">
            {Object.entries(category_stats).map(([cat, stats]) => (
              <div key={cat} className="breakdown-item">
                <span>{cat}</span>
                <span>{stats.count} items — {format(stats.value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Low Stock Alerts</h3>
          <div className="breakdown-list">
            {low_stock_items.length === 0 && <p style={{ color: 'var(--text-muted)' }}>All items well stocked</p>}
            {low_stock_items.map(item => (
              <div key={item.name} className="breakdown-item">
                <span>{item.name} <small style={{ color: 'var(--text-muted)' }}>{item.sku}</small></span>
                <span className="status-badge low">{item.quantity} left</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Recent Orders</h3>
          <div className="breakdown-list">
            {recent_orders.map(o => (
              <div key={o.id} className="breakdown-item">
                <span>{o.product}</span>
                <span className={`status-badge ${o.status === 'Delivered' ? 'in' : o.status === 'Shipped' ? 'low' : 'out'}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
