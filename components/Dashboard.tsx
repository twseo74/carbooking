
import React, { useState } from 'react';
import Header from './Header';
import BookingCalendar from './BookingCalendar';
import VehicleLog from './VehicleLog';
import { INITIAL_BOOKINGS, INITIAL_DRIVING_LOGS, INITIAL_FUEL_LOGS } from '../constants';
import { Booking, DrivingLog, FuelLog } from '../types';

type View = 'booking' | 'logs';

const Dashboard: React.FC = () => {
    const [view, setView] = useState<View>('booking');
    const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
    const [drivingLogs, setDrivingLogs] = useState<DrivingLog[]>(INITIAL_DRIVING_LOGS);
    const [fuelLogs, setFuelLogs] = useState<FuelLog[]>(INITIAL_FUEL_LOGS);

    const addBooking = (newBooking: Omit<Booking, 'id'>) => {
        setBookings(prev => [...prev, { ...newBooking, id: Date.now().toString() }]);
    };
    
    const addDrivingLog = (newLog: Omit<DrivingLog, 'id'>) => {
        setDrivingLogs(prev => [...prev, { ...newLog, id: Date.now().toString() }].sort((a,b) => b.date.getTime() - a.date.getTime()));
    };

    const addFuelLog = (newLog: Omit<FuelLog, 'id'>) => {
        setFuelLogs(prev => [...prev, { ...newLog, id: Date.now().toString() }].sort((a,b) => b.date.getTime() - a.date.getTime()));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header currentView={view} setView={setView} />
            <main className="flex-grow p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {view === 'booking' && <BookingCalendar bookings={bookings} onAddBooking={addBooking} />}
                    {view === 'logs' && <VehicleLog drivingLogs={drivingLogs} fuelLogs={fuelLogs} onAddDrivingLog={addDrivingLog} onAddFuelLog={addFuelLog}/>}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
