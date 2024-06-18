import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function SubscriptionPage() {
  const { currentUser } = useSelector((state) => state.user); // Fetching the current user from the Redux store
  const [formData, setFormData] = useState({
    username: currentUser? currentUser.username : '', // Pre-filling the username if currentUser exists
    date: '',
    plan: ''
  });

  const [minDate, setMinDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Set the minimum date to today's date
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('/api/subs/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.ok) {
        // Redirect or show success message
      } else {
        throw new Error('Failed to create subscription');
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ marginBottom: '20px' }}>Get Subscription</h1>
      <form onSubmit={handleSubmit} style={{ width: '80%', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '10px' }}>Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          readOnly // Make the input read-only since we're pre-filling it
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label htmlFor="date" style={{ display: 'block', marginBottom: '10px' }}>Date:</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={minDate} // Set the minimum date to today
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label htmlFor="plan" style={{ display: 'block', marginBottom: '10px' }}>Plan:</label>
        <select id="plan" name="plan" value={formData.plan} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="">Select Plan</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
        </select>

        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default SubscriptionPage;
