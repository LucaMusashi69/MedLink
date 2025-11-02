import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Doctor App</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Iniciar Sesión
          </button>
          <div className="flex items-center justify-between text-sm">
            <button type="button" className="text-gray-600 hover:text-gray-800">¿Olvidaste tu contraseña?</button>
            <button type="button" className="text-primary hover:text-primary-dark">Registrarse</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-gray-400 text-xs">o</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Continuar con Facebook
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;