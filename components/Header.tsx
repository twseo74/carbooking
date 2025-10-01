
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { CarIcon, CalendarIcon, ClipboardListIcon, LogoutIcon } from './icons';

interface HeaderProps {
    currentView: 'booking' | 'logs';
    setView: (view: 'booking' | 'logs') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
    const { user, logout } = useAuth();

    const navButtonClasses = (view: 'booking' | 'logs') => 
        `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentView === view 
            ? 'bg-brand-blue text-white' 
            : 'text-gray-600 hover:bg-brand-lightblue hover:text-brand-blue'
        }`;

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <CarIcon className="h-8 w-8 text-brand-blue" />
                        <h1 className="ml-3 text-xl font-bold text-gray-900">Company Car</h1>
                    </div>
                    <nav className="hidden md:flex items-center space-x-4">
                        <button onClick={() => setView('booking')} className={navButtonClasses('booking')}>
                            <CalendarIcon className="w-5 h-5 mr-2"/>
                            Booking
                        </button>
                        <button onClick={() => setView('logs')} className={navButtonClasses('logs')}>
                            <ClipboardListIcon className="w-5 h-5 mr-2"/>
                            Vehicle Log
                        </button>
                    </nav>
                    <div className="flex items-center">
                        <span className="text-gray-600 text-sm font-medium mr-4">
                            Welcome, <span className="font-bold text-brand-blue">{user?.id} ({user?.role})</span>
                        </span>
                        <button 
                            onClick={logout}
                            className="flex items-center p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            aria-label="Logout"
                        >
                           <LogoutIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
                 <div className="md:hidden flex items-center justify-center pb-2 space-x-2">
                    <button onClick={() => setView('booking')} className={navButtonClasses('booking')}>
                        <CalendarIcon className="w-5 h-5 mr-2"/>
                        Booking
                    </button>
                    <button onClick={() => setView('logs')} className={navButtonClasses('logs')}>
                        <ClipboardListIcon className="w-5 h-5 mr-2"/>
                        Vehicle Log
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
