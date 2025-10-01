
import { User, UserRole, Booking, DrivingLog, FuelLog } from './types';

export const USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: '1qazxsw2',
    user: { id: 'admin', role: UserRole.ADMIN },
  },
  user: {
    password: '1qazxsw2',
    user: { id: 'user', role: UserRole.USER },
  },
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

export const INITIAL_BOOKINGS: Booking[] = [
  { id: '1', userId: 'admin', date: today, title: 'Admin - Project Meeting' },
  { id: '2', userId: 'user', date: tomorrow, title: 'User - Client Visit' },
  { id: '3', userId: 'user', date: yesterday, title: 'User - Site Inspection' },
];

export const INITIAL_DRIVING_LOGS: DrivingLog[] = [
    { id: 'd1', date: yesterday, driver: 'user', purpose: 'Site Inspection', startOdometer: 15000, endOdometer: 15120 },
    { id: 'd2', date: new Date(yesterday.getTime() - 86400000 * 2), driver: 'admin', purpose: 'Supplier Visit', startOdometer: 14850, endOdometer: 15000 },
];

export const INITIAL_FUEL_LOGS: FuelLog[] = [
    { id: 'f1', date: new Date(yesterday.getTime() - 86400000 * 5), odometer: 14500, fuelAmount: 45, pricePerLiter: 1700, totalCost: 76500 },
];
