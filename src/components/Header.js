import { useState, useEffect } from 'react';
import { Search, Sun, Moon, Bell, ChevronDown } from 'lucide-react';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../api';
import { useCurrency } from '../CurrencyContext';

function Header({ user, onLogout, onSearch, darkMode, setDarkMode }) {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const { currency, changeCurrency } = useCurrency();

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data.notifications);
      setUnread(res.data.unread_count);
    } catch (e) {}
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead();
    fetchNotifications();
  };

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    fetchNotifications();
  };

  return (
    <header className="header">
      <div className="search-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search products, SKU, categories..."
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className="header-actions">
        <select className="currency-selector" value={currency} onChange={e => changeCurrency(e.target.value)}>
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>
        <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="notification-wrapper">
          <button className="icon-btn notification-btn" onClick={() => setShowPanel(!showPanel)}>
            <Bell size={20} />
            {unread > 0 && <span className="notification-badge">{unread}</span>}
          </button>
          {showPanel && (
            <div className="notification-panel">
              <div className="notification-panel-header">
                <strong>Notifications</strong>
                {unread > 0 && <button onClick={handleMarkAllRead}>Mark all read</button>}
              </div>
              <div className="notification-list">
                {notifications.length === 0 && <p className="no-notifications">No notifications</p>}
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item ${n.read ? '' : 'unread'}`} onClick={() => !n.read && handleMarkRead(n.id)}>
                    <div className={`notification-dot ${n.type}`}></div>
                    <div className="notification-content">
                      <p>{n.message}</p>
                      <span>{new Date(n.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="user-profile-wrapper">
          <div className="user-profile" onClick={(e) => { e.currentTarget.parentElement.classList.toggle('open'); }}>
            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="avatar" />
            <div>
              <span className="user-name">{user.name}</span>
              <span className="user-role">Admin</span>
            </div>
            <ChevronDown size={16} />
          </div>
          <div className="user-dropdown">
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
