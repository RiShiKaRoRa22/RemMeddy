import { useState, useEffect } from 'react';
import { authHeader } from '../utils/auth';

export function useMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/medicines', {
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch medicines');
      }
      
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Failed to fetch medicines:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addMedicine = async (medicineData) => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/medicines', {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(medicineData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add medicine');
      }
      
      const data = await response.json();
      setMedicines(prev => [...prev, data.medicine]);
      return data;
    } catch (error) {
      console.error('Failed to add medicine:', error);
      setError(error.message);
      throw error;
    }
  };

  const removeMedicine = async (medicineId) => {
    try {
      setError(null);
      const response = await fetch(`http://localhost:5000/medicines/${medicineId}`, {
        method: 'DELETE',
        headers: authHeader()
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove medicine');
      }
      
      setMedicines(prev => prev.filter(med => med._id !== medicineId));
    } catch (error) {
      console.error('Failed to remove medicine:', error);
      setError(error.message);
      throw error;
    }
  };

  return {
    medicines,
    loading,
    error,
    addMedicine,
    removeMedicine,
    refreshMedicines: fetchMedicines
  };
}