import React from 'react';

export default function MedicineCard({ medicine, onRemove }) {
  return (
    <div className="card p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {medicine.name}
          </h3>
          {medicine.dose && (
            <p className="text-gray-600 mt-1">Dose: {medicine.dose}</p>
          )}
          {medicine.notes && (
            <p className="text-sm text-gray-500 mt-2">{medicine.notes}</p>
          )}
        </div>
        <button 
          onClick={() => onRemove(medicine._id)}
          className="text-red-500 hover:text-red-700 ml-4 transition-colors"
        >
          🗑️
        </button>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700">Reminder Times:</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {medicine.schedule?.times?.map((time, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
            >
              {time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}