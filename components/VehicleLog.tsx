
import React, { useState } from 'react';
import { DrivingLog, FuelLog, UserRole } from '../types';
import Modal from './Modal';
import { useAuth } from '../hooks/useAuth';
import { PlusIcon } from './icons';

interface VehicleLogProps {
  drivingLogs: DrivingLog[];
  fuelLogs: FuelLog[];
  onAddDrivingLog: (log: Omit<DrivingLog, 'id'>) => void;
  onAddFuelLog: (log: Omit<FuelLog, 'id'>) => void;
}

type LogType = 'driving' | 'fuel';

const VehicleLog: React.FC<VehicleLogProps> = ({ drivingLogs, fuelLogs, onAddDrivingLog, onAddFuelLog }) => {
  const [activeTab, setActiveTab] = useState<LogType>('driving');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  
  // Driving Log Form State
  const [driveDate, setDriveDate] = useState(new Date().toISOString().split('T')[0]);
  const [purpose, setPurpose] = useState('');
  const [startOdometer, setStartOdometer] = useState('');
  const [endOdometer, setEndOdometer] = useState('');

  // Fuel Log Form State
  const [fuelDate, setFuelDate] = useState(new Date().toISOString().split('T')[0]);
  const [fuelOdometer, setFuelOdometer] = useState('');
  const [fuelAmount, setFuelAmount] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');

  const handleAddDrivingLog = () => {
    if (purpose && startOdometer && endOdometer && user) {
      onAddDrivingLog({
        date: new Date(driveDate),
        driver: user.id,
        purpose,
        startOdometer: Number(startOdometer),
        endOdometer: Number(endOdometer)
      });
      setIsModalOpen(false);
      setPurpose(''); setStartOdometer(''); setEndOdometer('');
    }
  };
  
  const handleAddFuelLog = () => {
    if (fuelOdometer && fuelAmount && pricePerLiter) {
      onAddFuelLog({
        date: new Date(fuelDate),
        odometer: Number(fuelOdometer),
        fuelAmount: Number(fuelAmount),
        pricePerLiter: Number(pricePerLiter),
        totalCost: Number(fuelAmount) * Number(pricePerLiter),
      });
      setIsModalOpen(false);
      setFuelOdometer(''); setFuelAmount(''); setPricePerLiter('');
    }
  };

  const TabButton: React.FC<{ type: LogType, label: string }> = ({ type, label }) => (
    <button
      onClick={() => setActiveTab(type)}
      className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${activeTab === type ? 'bg-white border-b-2 border-brand-blue text-brand-blue' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex border-b border-gray-200 px-4 pt-2">
        <TabButton type="driving" label="Driving Log" />
        <TabButton type="fuel" label="Fuel Log" />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{activeTab === 'driving' ? 'Driving History' : 'Fueling History'}</h3>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-800 transition-colors text-sm font-medium">
                <PlusIcon className="w-5 h-5 mr-1"/>
                Add {activeTab === 'driving' ? 'Driving' : 'Fuel'} Record
            </button>
        </div>
        <div className="overflow-x-auto">
          {activeTab === 'driving' ? (
            <DrivingLogTable logs={drivingLogs} />
          ) : (
            <FuelLogTable logs={fuelLogs} />
          )}
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add ${activeTab === 'driving' ? 'Driving' : 'Fuel'} Record`}>
        {activeTab === 'driving' ? (
          <div className="space-y-4">
            <input type="date" value={driveDate} onChange={e => setDriveDate(e.target.value)} className="w-full mt-1 input-style" />
            <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Purpose of trip" className="w-full mt-1 input-style" />
            <input type="number" value={startOdometer} onChange={e => setStartOdometer(e.target.value)} placeholder="Start Odometer (km)" className="w-full mt-1 input-style" />
            <input type="number" value={endOdometer} onChange={e => setEndOdometer(e.target.value)} placeholder="End Odometer (km)" className="w-full mt-1 input-style" />
            <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button onClick={handleAddDrivingLog} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-800">Save</button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input type="date" value={fuelDate} onChange={e => setFuelDate(e.target.value)} className="w-full mt-1 input-style" />
            <input type="number" value={fuelOdometer} onChange={e => setFuelOdometer(e.target.value)} placeholder="Odometer (km)" className="w-full mt-1 input-style" />
            <input type="number" value={fuelAmount} onChange={e => setFuelAmount(e.target.value)} placeholder="Fuel Amount (Liters)" className="w-full mt-1 input-style" />
            <input type="number" value={pricePerLiter} onChange={e => setPricePerLiter(e.target.value)} placeholder="Price per Liter (KRW)" className="w-full mt-1 input-style" />
            <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button onClick={handleAddFuelLog} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-800">Save</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const DrivingLogTable: React.FC<{ logs: DrivingLog[] }> = ({ logs }) => (
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50"><tr>
            <th className="th-style">Date</th><th className="th-style">Driver</th><th className="th-style">Purpose</th>
            <th className="th-style text-right">Start (km)</th><th className="th-style text-right">End (km)</th><th className="th-style text-right">Distance (km)</th>
        </tr></thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {logs.map(log => (
                <tr key={log.id}>
                    <td className="td-style">{log.date.toLocaleDateString()}</td><td className="td-style">{log.driver}</td><td className="td-style">{log.purpose}</td>
                    <td className="td-style text-right">{log.startOdometer.toLocaleString()}</td><td className="td-style text-right">{log.endOdometer.toLocaleString()}</td>
                    <td className="td-style text-right font-medium text-gray-900">{(log.endOdometer - log.startOdometer).toLocaleString()}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const FuelLogTable: React.FC<{ logs: FuelLog[] }> = ({ logs }) => (
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50"><tr>
            <th className="th-style">Date</th><th className="th-style text-right">Odometer (km)</th><th className="th-style text-right">Amount (L)</th>
            <th className="th-style text-right">Price/Liter (₩)</th><th className="th-style text-right">Total Cost (₩)</th>
        </tr></thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {logs.map(log => (
                <tr key={log.id}>
                    <td className="td-style">{log.date.toLocaleDateString()}</td><td className="td-style text-right">{log.odometer.toLocaleString()}</td>
                    <td className="td-style text-right">{log.fuelAmount.toFixed(2)}</td><td className="td-style text-right">{log.pricePerLiter.toLocaleString()}</td>
                    <td className="td-style text-right font-medium text-gray-900">{log.totalCost.toLocaleString()}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

// Add these utility classes to a global scope or tailwind config if needed, here just for component encapsulation.
const _ = `
.th-style { @apply px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider; }
.td-style { @apply px-4 py-3 whitespace-nowrap text-sm text-gray-700; }
.input-style { @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm; }
`;

export default VehicleLog;
