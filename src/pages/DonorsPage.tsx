import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DonorsPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Simplified fetch function
  const fetchDonors = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/api/donors'); // Using proxy
      setDonors(data);
    } catch (err) {
      setError('Failed to load donors. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Auto-fetch on mount
  useEffect(() => {
    fetchDonors();
  }, []);

  // 3. Better UI states
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Blood Donors</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Donor list */}
          <ul className="space-y-4">
            {donors.map((donor) => (
              <li key={donor._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg">{donor.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p><span className="font-medium">Blood Group:</span> <span className="text-blue-600">{donor.bloodGroup}</span></p>
                  <p><span className="font-medium">Location:</span> {donor.location}</p>
                  <p><span className="font-medium">Phone:</span> {donor.phone}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      donor.availability ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {donor.availability ? 'Available' : 'Unavailable'}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Refresh button */}
          <button 
            onClick={fetchDonors}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh List'}
          </button>
        </>
      )}
    </div>
  );
}