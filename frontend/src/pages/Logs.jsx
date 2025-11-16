import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsTaken = async (logId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/logs/${logId}/confirm`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchLogs(); // Refresh logs
    } catch (error) {
      console.error('Failed to mark as taken:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading logs...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reminder History</h2>
      
      {logs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No reminder logs yet
          </h3>
          <p className="text-gray-600">
            Your reminder history will appear here once reminders are sent
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {log.medicine?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Sent: {new Date(log.sentAt).toLocaleString()}
                  </p>
                  {log.confirmed ? (
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm mt-2">
                      ✅ Confirmed taken
                    </span>
                  ) : (
                    <button
                      onClick={() => markAsTaken(log._id)}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm mt-2 hover:bg-blue-200"
                    >
                      Mark as taken
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}