import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">Doctor App</span>
          </div>
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;