import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'All Users', href: '/list', icon: '👥' },
    { name: 'Add User', href: '/create', icon: '➕' },
    { name: 'Roles & Permissions', href: '/roles', icon: '🛡️' },
  ];

  return (
    <div className="sidebar-layout">
      <aside className="sidebar">
        <h3>Users</h3>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href}
                className={location.pathname === item.href ? 'active' : ''}
              >
                <span style={{ marginRight: '8px' }}>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
