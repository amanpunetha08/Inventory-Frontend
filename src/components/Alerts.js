import { useState, useEffect } from 'react';
import { AlertTriangle, XCircle, Info } from 'lucide-react';
import { getAlerts } from '../api';

function Alerts() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => { getAlerts().then(res => setData(res.data)).catch(() => {}); }, []);

  if (!data) return <div className="page-section"><p>Loading...</p></div>;

  const { alerts, summary } = data;

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  const getIcon = (type) => {
    if (type === 'critical') return <XCircle size={18} color="#ef4444" />;
    if (type === 'warning') return <AlertTriangle size={18} color="#f97316" />;
    return <Info size={18} color="#3b82f6" />;
  };

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div><h1>Alerts</h1><p>Stock and order alerts</p></div>
      </div>

      <div className="stats-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon red"><XCircle size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Critical</span>
            <span className="stat-value">{summary.critical}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><AlertTriangle size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Warnings</span>
            <span className="stat-value">{summary.warning}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Info size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Info</span>
            <span className="stat-value">{summary.info}</span>
          </div>
        </div>
      </div>

      <div className="product-table-container">
        <div className="table-header">
          <div className="table-filters">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({alerts.length})</button>
            <button className={`filter-btn ${filter === 'critical' ? 'active' : ''}`} onClick={() => setFilter('critical')}>Critical ({summary.critical})</button>
            <button className={`filter-btn ${filter === 'warning' ? 'active' : ''}`} onClick={() => setFilter('warning')}>Warnings ({summary.warning})</button>
            <button className={`filter-btn ${filter === 'info' ? 'active' : ''}`} onClick={() => setFilter('info')}>Info ({summary.info})</button>
          </div>
        </div>
        <div className="alerts-list">
          {filtered.length === 0 && <p style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No alerts</p>}
          {filtered.map((alert, i) => (
            <div key={i} className={`alert-item alert-${alert.type}`}>
              {getIcon(alert.type)}
              <div className="alert-content">
                <strong>{alert.title}</strong>
                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
