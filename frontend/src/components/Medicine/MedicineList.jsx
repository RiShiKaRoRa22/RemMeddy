import React from 'react';
import MedicineCard from './MedicineCard';

export default function MedicineList({ medicines, onRemove }) {
  if (medicines.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-4xl mb-4">💊</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No medications yet
        </h3>
        <p className="text-gray-600">
          Add your first medication to get started with reminders
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {medicines.map(medicine => (
        <MedicineCard 
          key={medicine._id} 
          medicine={medicine} 
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}