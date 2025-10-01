
import React, { useState } from 'react';
import { Booking, UserRole } from '../types';
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';
import { ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon } from './icons';

interface BookingCalendarProps {
  bookings: Booking[];
  onAddBooking: (newBooking: Omit<Booking, 'id'>) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings, onAddBooking }) => {
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookingTitle, setBookingTitle] = useState('');
    
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    const endDate = new Date(endOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

    const days = [];
    let day = new Date(startDate);
    while (day <= endDate) {
        days.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }
    
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    
    const openBookingModal = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = () => {
        if (bookingTitle && selectedDate && user) {
            onAddBooking({ userId: user.id, date: selectedDate, title: bookingTitle });
            setBookingTitle('');
            setIsModalOpen(false);
            setSelectedDate(null);
        }
    };
    
    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon className="w-6 h-6 text-gray-600" /></button>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon className="w-6 h-6 text-gray-600" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-500 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {days.map((d, i) => {
                    const bookingsForDay = bookings.filter(b => isSameDay(b.date, d));
                    const isCurrentMonth = d.getMonth() === currentDate.getMonth();
                    const isToday = isSameDay(d, new Date());
                    
                    return (
                        <div key={i} className={`p-2 border rounded-lg min-h-[100px] sm:min-h-[120px] flex flex-col transition-colors ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}>
                            <div className="flex justify-between items-center">
                                <span className={`text-sm font-semibold ${isToday ? 'bg-brand-blue text-white rounded-full flex items-center justify-center w-6 h-6' : 'text-gray-700'}`}>{d.getDate()}</span>
                                <button onClick={() => openBookingModal(d)} className="text-gray-400 hover:text-brand-blue transition-colors">
                                    <PlusCircleIcon className="w-5 h-5"/>
                                </button>
                            </div>
                            <div className="mt-1 space-y-1 overflow-y-auto text-xs">
                                {bookingsForDay.map(b => (
                                    <div key={b.id} className={`p-1 rounded ${b.userId === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                       <span className="font-bold">{b.userId}:</span> {b.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Booking">
                <div className="space-y-4">
                    <p>Booking for: <span className="font-semibold">{selectedDate?.toLocaleDateString()}</span></p>
                    <div>
                        <label htmlFor="bookingTitle" className="block text-sm font-medium text-gray-700">Booking Purpose</label>
                        <input
                            type="text"
                            id="bookingTitle"
                            value={bookingTitle}
                            onChange={(e) => setBookingTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            placeholder="e.g., Client Meeting"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                         <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button onClick={handleBookingSubmit} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-800">Add Booking</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BookingCalendar;
