import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DonorsPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donors');
      setDonors(response.data);
    } catch (err) {
      console.error('Failed to fetch donors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blood Donors</h1>
      
      {loading ? (
        <p>Loading donors...</p>
      ) : (
        <ul className="space-y-3">
          {donors.map((donor) => (
            <li key={donor._id} className="p-3 border rounded-lg">
              <h3 className="font-semibold">{donor.name}</h3>
              <p>Blood Group: {donor.bloodGroup}</p>
              <p>Location: {donor.location}</p>
            </li>
          ))}
        </ul>
      )}

      <button 
        onClick={fetchDonors}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refresh
      </button>
    </div>
  );
}