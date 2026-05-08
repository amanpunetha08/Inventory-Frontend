import { LayoutDashboard, Package, ShoppingCart, Users, Grid3X3, Warehouse, BarChart3, Bell, Settings, Crown } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: Package, label: 'Products', key: 'inventory' },
  { icon: ShoppingCart, label: 'Orders', key: 'orders' },
  { icon: Users, label: 'Suppliers', key: 'suppliers' },
  { icon: Grid3X3, label: 'Categories', key: 'categories' },
  { icon: Warehouse, label: 'Warehouses', key: 'warehouses' },
  { icon: BarChart3, label: 'Reports', key: 'reports' },
  { icon: Bell, label: 'Alerts', key: 'alerts' },
  { icon: Settings, label: 'Settings', key: 'settings' },
];

function Sidebar({ lowStockItems, activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Package size={24} />
        <div>
          <h2>DukanStore</h2>
          <span>INVENTORY</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ icon: Icon, label, key }) => (
          <button key={key} className={`nav-item ${activePage === key ? 'active' : ''}`} onClick={() => onNavigate(key)}>
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="low-stock-section">
        <h4>LOW STOCK ALERTS</h4>
        {lowStockItems.map((item) => (
          <div key={item.name} className="low-stock-item">
            <span>{item.name}</span>
            <span className="low-stock-badge">{item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="upgrade-card">
        <div className="upgrade-header">
          <Crown size={20} color="#f59e0b" />
          <strong>Upgrade to Pro</strong>
        </div>
        <p>Unlock advanced features, reports and priority support.</p>
        <button className="upgrade-btn">Upgrade Now</button>
      </div>
    </aside>
  );
}

export default Sidebar;
