import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Calculator, Info, FileText, PenTool as Tool, User } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAdminStore();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Calculator', icon: Calculator },
    { path: '/about', label: 'About', icon: Info },
    { path: '/factors', label: 'Factors', icon: FileText },
    { path: '/tools', label: 'Tools', icon: Tool },
    { path: '/resources', label: 'Resources', icon: Building2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Construction Calculator
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive('/admin')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}