
import React from 'react';
import { useAuth } from './hooks/useAuth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { CarIcon } from './components/icons';

const App: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Dashboard />
    </div>
  );
};

export default App;
