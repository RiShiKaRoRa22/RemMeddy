import React, { useState } from 'react';
import MedicineForm from '../components/Medicine/MedicineForm';
import MedicineList from '../components/Medicine/MedicineList';
import { useMedicines } from '../hooks/useMedicines';

export default function Dashboard() {
  const { medicines, addMedicine, removeMedicine } = useMedicines();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Medications</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Medicine
        </button>
      </div>

      {showForm && (
        <MedicineForm 
          onSubmit={addMedicine}
          onCancel={() => setShowForm(false)}
        />
      )}

      <MedicineList 
        medicines={medicines} 
        onRemove={removeMedicine} 
      />
    </div>
  );
}