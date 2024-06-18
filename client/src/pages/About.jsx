import React, { useState, useEffect } from "react";
import axios from "axios";

function About() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("/api/subs/subscriptions");
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`/api/active/subs/approve/${id}`);
      console.log("Subscription approved successfully:", response.data);

      // Update local state to reflect the approval
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub._id === id? {...sub, approved: true } : sub
        )
      );
    } catch (error) {
      console.error("Error approving subscription:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.delete(`/api/subs/subscriptions/${id}`);
      console.log(`Subscription with ID: ${id} declined successfully.`);

      // Update local state to remove the declined subscription
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub._id!== id)
      );
    } catch (error) {
      console.error("Error declining subscription:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-5">Subscriptions</h1>
      <table className="w-full border-collapse">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Index</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Username</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Date</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Plan</th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={subscription._id} className={`hover:bg-gray-200 transition duration-150 ease-in-out`}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{subscription.username}</td>
              <td className="px-4 py-2">{new Date(subscription.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{subscription.plan}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleApprove(subscription._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecline(subscription._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default About;
