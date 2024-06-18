// pages/About.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscriptionRow from "../components/SubscriptionRow";

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
          sub._id === id ? { ...sub, approved: true } : sub
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
        prevSubscriptions.filter((sub) => sub._id !== id)
      );
    } catch (error) {
      console.error("Error declining subscription:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Index
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subscriptions.map((subscription, index) => (
            <SubscriptionRow
              key={subscription._id}
              subscription={subscription}
              index={index + 1}
              onApprove={() => handleApprove(subscription._id)}
              onDecline={() => handleDecline(subscription._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default About;
