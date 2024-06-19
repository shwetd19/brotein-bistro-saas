import React, { useState, useEffect } from "react";
import axios from "axios";

function ActiveSubscriptions() {
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveSubscriptions = async () => {
      try {
        const response = await axios.get("/api/active/subs/getAllActiveSubs");
        setActiveSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching active subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveSubscriptions();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-5">Active Subscriptions</h1>
      <table className="w-full border-collapse">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Index
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Username
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Phone Number
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Address
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Selected Plan
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Starting Date
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Selected Branch
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700">
              Days Left
            </th>
          </tr>
        </thead>
        <tbody>
          {activeSubscriptions.map((subscription, index) => (
            <tr
              key={subscription._id}
              className="hover:bg-gray-200 transition duration-150 ease-in-out"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{subscription.username}</td>
              <td className="px-4 py-2">{subscription.phoneNumber}</td>
              <td className="px-4 py-2">{subscription.address}</td>
              <td className="px-4 py-2">{subscription.selectedPlan}</td>
              <td className="px-4 py-2">
                {new Date(subscription.startDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{subscription.selectedBranch}</td>
              <td className="px-4 py-2">{subscription.DaysLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveSubscriptions;
