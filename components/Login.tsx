
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CarIcon } from './icons';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!login(username, password)) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-lightblue">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center mx-auto mb-4 text-brand-blue">
                <CarIcon className="w-16 h-16"/>
            </div>
          <h1 className="text-3xl font-bold text-gray-900">Company Car Manager</h1>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full px-4 py-3 text-lg border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 text-lg border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-brand-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition duration-150"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-500">
            <p>Admin: admin / 1qazxsw2</p>
            <p>User: user / 1qazxsw2</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
