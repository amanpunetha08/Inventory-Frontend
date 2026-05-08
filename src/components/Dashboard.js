import { useState, useEffect } from 'react';
import { Package, Box, AlertTriangle, XCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { getDashboard } from '../api';
import { useCurrency } from '../CurrencyContext';

const CHART_DATA = [
  { day: 'May 12', inStock: 15200, lowStock: 4800, outOfStock: 2100 },
  { day: 'May 13', inStock: 16800, lowStock: 5200, outOfStock: 2300 },
  { day: 'May 14', inStock: 18200, lowStock: 4600, outOfStock: 1900 },
  { day: 'May 15', inStock: 17500, lowStock: 5100, outOfStock: 2200 },
  { day: 'May 16', inStock: 19800, lowStock: 4900, outOfStock: 2000 },
  { day: 'May 17', inStock: 20500, lowStock: 5400, outOfStock: 2400 },
  { day: 'May 18', inStock: 21200, lowStock: 5000, outOfStock: 2100 },
];

const CATEGORIES = [
  { name: 'Electronics', pct: 45, count: 8429, color: '#3b82f6' },
  { name: 'Accessories', pct: 25, count: 4687, color: '#22c55e' },
  { name: 'Clothing', pct: 15, count: 2812, color: '#f59e0b' },
  { name: 'Home & Living', pct: 10, count: 1874, color: '#8b5cf6' },
  { name: 'Others', pct: 5, count: 940, color: '#9ca3af' },
];

const ACTIVITIES = [
  { icon: '📦', text: 'Wireless Headphones stock updated', time: '2 mins ago' },
  { icon: '🛒', text: 'New order #ORD-00123 received', time: '15 mins ago' },
  { icon: '🚫', text: 'USB-C Cable marked as out of stock', time: '1 hour ago' },
  { icon: '📦', text: 'Smart Watch Series 8 stock updated', time: '2 hours ago' },
  { icon: '✨', text: 'New product Laptop Stand added', time: '3 hours ago' },
];

const TOP_PRODUCTS = [
  { name: 'Wireless Headphones', sold: 320, revenue: 31968, status: 'In Stock' },
  { name: 'Smart Watch Series 8', sold: 280, revenue: 55972, status: 'In Stock' },
  { name: 'USB-C Cable', sold: 510, revenue: 5099, status: 'Out of Stock' },
  { name: 'Laptop Stand', sold: 190, revenue: 9499, status: 'In Stock' },
  { name: 'Bluetooth Speaker', sold: 160, revenue: 12792, status: 'Low Stock' },
];

const STOCK_ALERTS = [
  { type: 'Low Stock', product: 'Smart Watch Series 8', detail: 'Only 2 left in stock' },
  { type: 'Low Stock', product: 'Bluetooth Speaker', detail: 'Only 1 left in stock' },
  { type: 'Out of Stock', product: 'USB-C Cable', detail: 'Currently out of stock' },
];

const WAREHOUSES = [
  { name: 'Main Warehouse', stock: 12430, pct: 68 },
  { name: 'East Warehouse', stock: 3280, pct: 18 },
  { name: 'West Warehouse', stock: 2190, pct: 12 },
  { name: 'South Warehouse', stock: 842, pct: 4 },
];

function MiniLineChart() {
  const max = 25000;
  const h = 180, w = 500, px = 40, py = 20;
  const cw = w - px * 2, ch = h - py * 2;
  const toPath = (key, data) => data.map((d, i) => `${i === 0 ? 'M' : 'L'}${px + (i / (data.length - 1)) * cw},${py + ch - (d[key] / max) * ch}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="dash-line-chart">
      {[0, 5000, 10000, 15000, 20000, 25000].map((v, i) => (
        <g key={i}>
          <line x1={px} x2={w - px} y1={py + ch - (v / max) * ch} y2={py + ch - (v / max) * ch} stroke="#e8ecf0" strokeWidth="0.5" />
          <text x={px - 8} y={py + ch - (v / max) * ch + 4} textAnchor="end" fontSize="10" fill="#999">{v >= 1000 ? `${v / 1000}K` : v}</text>
        </g>
      ))}
      <path d={toPath('inStock', CHART_DATA)} fill="none" stroke="#22c55e" strokeWidth="2" />
      <path d={toPath('lowStock', CHART_DATA)} fill="none" stroke="#f59e0b" strokeWidth="2" />
      <path d={toPath('outOfStock', CHART_DATA)} fill="none" stroke="#ef4444" strokeWidth="2" />
      {CHART_DATA.map((d, i) => (
        <text key={i} x={px + (i / (CHART_DATA.length - 1)) * cw} y={h - 4} textAnchor="middle" fontSize="10" fill="#999">{d.day}</text>
      ))}
    </svg>
  );
}

function DonutChart() {
  const size = 160, cx = size / 2, cy = size / 2, r = 58, sw = 18;
  let offset = 0;
  const circumference = 2 * Math.PI * r;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {CATEGORIES.map((cat, i) => {
        const dash = (cat.pct / 100) * circumference;
        const gap = circumference - dash;
        const rotation = (offset / 100) * 360 - 90;
        offset += cat.pct;
        return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={cat.color} strokeWidth={sw} strokeDasharray={`${dash} ${gap}`} transform={`rotate(${rotation} ${cx} ${cy})`} />;
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">18,742</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="11" fill="#999">Total</text>
    </svg>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  const { format } = useCurrency();

  useEffect(() => { getDashboard().then(r => setData(r.data)).catch(() => {}); }, []);

  const stats = data ? [
    { label: 'Total Products', value: data.summary.total_products?.toLocaleString() || '1,248', icon: Package, color: 'blue', change: '12.5%', up: true },
    { label: 'Total Stock', value: '18,742', icon: Box, color: 'green', change: '8.3%', up: true },
    { label: 'Low Stock Items', value: data.summary.low_stock || 23, icon: AlertTriangle, color: 'orange', change: '4', up: true },
    { label: 'Out of Stock', value: data.summary.out_of_stock || 7, icon: XCircle, color: 'red', change: '2', up: false },
    { label: 'Total Value', value: format(data.summary.total_value || 98765), icon: DollarSign, color: 'green', change: '9.2%', up: true },
  ] : [
    { label: 'Total Products', value: '1,248', icon: Package, color: 'blue', change: '12.5%', up: true },
    { label: 'Total Stock', value: '18,742', icon: Box, color: 'green', change: '8.3%', up: true },
    { label: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'orange', change: '4', up: true },
    { label: 'Out of Stock', value: '7', icon: XCircle, color: 'red', change: '2', up: false },
    { label: 'Total Value', value: '$98,765', icon: DollarSign, color: 'green', change: '9.2%', up: true },
  ];

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Dashboard</h1><p>Overview of your inventory performance</p></div>
        <div className="dash-date-badge">📅 May 12 – May 18, 2024</div>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        {stats.map(({ label, value, icon: Icon, color, change, up }) => (
          <div key={label} className="stat-card">
            <div className={`stat-icon ${color}`}><Icon size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">{label}</span>
              <span className="stat-value">{value}</span>
              <span className={`stat-change ${up ? 'up' : 'down'}`}>
                {up ? '↑' : '↓'} {change} <span className="stat-period">vs last week</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Line Chart + Donut + Activity */}
      <div className="dash-mid-row">
        <div className="dash-panel dash-chart-panel">
          <div className="dash-panel-header">
            <h3>Inventory Overview</h3>
            <select className="dash-select"><option>This Week</option><option>Last Week</option><option>This Month</option></select>
          </div>
          <MiniLineChart />
          <div className="dash-legend">
            <span><i style={{ background: '#22c55e' }} /> In Stock</span>
            <span><i style={{ background: '#f59e0b' }} /> Low Stock</span>
            <span><i style={{ background: '#ef4444' }} /> Out of Stock</span>
          </div>
        </div>

        <div className="dash-panel dash-donut-panel">
          <h3>Stock by Category</h3>
          <div className="dash-donut-wrap">
            <DonutChart />
            <div className="dash-donut-legend">
              {CATEGORIES.map(c => (
                <div key={c.name}><i style={{ background: c.color }} />{c.name} <span>{c.pct}% ({c.count.toLocaleString()})</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-panel dash-activity-panel">
          <div className="dash-panel-header"><h3>Recent Activity</h3><button className="dash-view-all">View All</button></div>
          <div className="dash-activity-list">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="dash-activity-item">
                <span className="dash-activity-icon">{a.icon}</span>
                <div><p>{a.text}</p><span>{a.time}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Products + Stock Alerts + Warehouse */}
      <div className="dash-bottom-row">
        <div className="dash-panel dash-products-panel">
          <div className="dash-panel-header"><h3>Top Selling Products</h3><button className="dash-view-all">View All</button></div>
          <table className="dash-table">
            <thead><tr><th>Product</th><th>Sold</th><th>Revenue</th><th>Status</th></tr></thead>
            <tbody>
              {TOP_PRODUCTS.map(p => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.sold}</td>
                  <td>{format(p.revenue)}</td>
                  <td><span className={`status-badge ${p.status === 'In Stock' ? 'in' : p.status === 'Low Stock' ? 'low' : 'out'}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-panel dash-alerts-panel">
          <div className="dash-panel-header"><h3>Stock Alerts</h3><button className="dash-view-all">View All</button></div>
          <div className="dash-alerts-list">
            {STOCK_ALERTS.map((a, i) => (
              <div key={i} className={`dash-alert-item ${a.type === 'Out of Stock' ? 'critical' : 'warning'}`}>
                <div className={`dash-alert-icon ${a.type === 'Out of Stock' ? 'red' : 'orange'}`}>⚠️</div>
                <div>
                  <span className={`dash-alert-type ${a.type === 'Out of Stock' ? 'red' : 'orange'}`}>{a.type}</span>
                  <strong>{a.product}</strong>
                  <p>{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-panel dash-warehouse-panel">
          <h3>Warehouse Summary</h3>
          <div className="dash-warehouse-list">
            {WAREHOUSES.map(w => (
              <div key={w.name} className="dash-warehouse-item">
                <span>{w.name}</span>
                <span className="dash-warehouse-stock">{w.stock.toLocaleString()}</span>
                <div className="dash-warehouse-bar"><div style={{ width: `${w.pct}%` }} /></div>
                <span className="dash-warehouse-pct">{w.pct}%</span>
              </div>
            ))}
            <div className="dash-warehouse-total">
              <span>Total Stock</span><span>18,742</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
