import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Building, Layout as LayoutIcon, MessageSquare } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label, isActive }) => (
  <Link to={to} className={`flex flex-col items-center p-2 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`}>
    <Icon size={24} />
    <span className="text-sm mt-1">{label}</span>
  </Link>
);

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { to: '/maps', icon: MapPin, label: 'Maps' },
    { to: '/building', icon: Building, label: 'Building' },
    { to: '/spaces', icon: LayoutIcon, label: 'Spaces' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
  ];

  return (
    <div className="min-h-screen pb-16 bg-gray-100">
      {children}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-xl mx-6 mb-4">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
