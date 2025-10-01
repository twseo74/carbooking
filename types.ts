
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: string;
  role: UserRole;
}

export interface Booking {
  id: string;
  userId: string;
  date: Date;
  title: string;
}

export interface DrivingLog {
  id: string;
  date: Date;
  driver: string;
  purpose: string;
  startOdometer: number;
  endOdometer: number;
}

export interface FuelLog {
  id: string;
  date: Date;
  odometer: number;
  fuelAmount: number; // in Liters
  pricePerLiter: number;
  totalCost: number;
}
