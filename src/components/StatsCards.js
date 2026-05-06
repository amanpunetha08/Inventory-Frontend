import { Package, TrendingDown, XCircle, DollarSign } from 'lucide-react';
import { useCurrency } from '../CurrencyContext';

function StatsCards({ items }) {
  const { format } = useCurrency();
  const totalProducts = items.length;
  const lowStock = items.filter(i => i.quantity > 0 && i.quantity <= 5).length;
  const outOfStock = items.filter(i => i.quantity === 0).length;
  const totalValue = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  const cards = [
    { label: 'Total Products', value: totalProducts.toLocaleString(), icon: Package, color: 'blue', change: '+12.5%', up: true },
    { label: 'Low Stock', value: lowStock, icon: TrendingDown, color: 'orange', change: '+8.3%', up: true },
    { label: 'Out of Stock', value: outOfStock, icon: XCircle, color: 'red', change: '-3.1%', up: false },
    { label: 'Total Value', value: format(totalValue), icon: DollarSign, color: 'green', change: '+9.2%', up: true },
  ];

  return (
    <div className="stats-cards">
      {cards.map(({ label, value, icon: Icon, color, change, up }) => (
        <div key={label} className="stat-card">
          <div className={`stat-icon ${color}`}><Icon size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
            <span className={`stat-change ${up ? 'up' : 'down'}`}>
              {up ? '↑' : '↓'} {change} <span className="stat-period">vs last month</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
