import React, { useState } from 'react';

export default function MedicineForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    dose: '',
    notes: '',
    schedule: { times: ['09:00'] },
    notificationType: 'sms' // Default to SMS
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', dose: '', notes: '', schedule: { times: ['09:00'] } });
  };

  const addTime = () => {
    setForm({
      ...form,
      schedule: { times: [...form.schedule.times, '09:00'] }
    });
  };

  const removeTime = (index) => {
    const newTimes = form.schedule.times.filter((_, i) => i !== index);
    setForm({
      ...form,
      schedule: { times: newTimes }
    });
  };

  const updateTime = (index, newTime) => {
    const newTimes = [...form.schedule.times];
    newTimes[index] = newTime;
    setForm({
      ...form,
      schedule: { times: newTimes }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicine Name *
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="e.g., Aspirin"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dose
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={form.dose}
            onChange={(e) => setForm({...form, dose: e.target.value})}
            placeholder="e.g., 500mg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            value={form.notes}
            onChange={(e) => setForm({...form, notes: e.target.value})}
            placeholder="Any additional instructions..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reminder Times *
          </label>
          {form.schedule.times.map((time, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input 
                type="time"
                required
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={time}
                onChange={(e) => updateTime(index, e.target.value)}
              />
              {form.schedule.times.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeTime(index)}
                  className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addTime}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            + Add Another Time
          </button>
        </div>
        
        <div className="flex gap-2 pt-4">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Medicine
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setForm({...form, notificationType: 'sms'})}
              className={`p-3 border rounded-lg text-center transition-colors ${
                form.notificationType === 'sms' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-lg mb-1">📱</div>
              <div className="text-sm font-medium">SMS</div>
            </button>
            
            <button
              type="button"
              onClick={() => setForm({...form, notificationType: 'whatsapp'})}
              className={`p-3 border rounded-lg text-center transition-colors ${
                form.notificationType === 'whatsapp' 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-lg mb-1">💚</div>
              <div className="text-sm font-medium">WhatsApp</div>
            </button>
            
            <button
              type="button"
              onClick={() => setForm({...form, notificationType: 'call'})}
              className={`p-3 border rounded-lg text-center transition-colors ${
                form.notificationType === 'call' 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-lg mb-1">📞</div>
              <div className="text-sm font-medium">Phone Call</div>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            How would you like to receive reminders?
          </p>
        </div>

      </form>
    </div>
  );
}