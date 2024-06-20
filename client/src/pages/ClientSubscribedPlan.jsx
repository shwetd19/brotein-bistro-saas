// SubscribedPlan.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SubscribedPlan = () => {
  const { id } = useParams();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/active/subs/users/${id}/meals`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch subscription data:", errorText);
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        setSubscriptionData(data[0]);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Error: {error}</div>;
  }

  if (!subscriptionData) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
        <h1 className="text-xl font-bold mb-4">Subscribed Plan Details</h1>
        <table className="w-full text-left">
          <tbody>
            <tr>
              <td className="font-semibold">Selected Plan:</td>
              <td>{subscriptionData.selectedPlan}</td>
            </tr>
            <tr>
              <td className="font-semibold">Start Date:</td>
              <td>{new Date(subscriptionData.startDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="font-semibold">Selected Branch:</td>
              <td>{subscriptionData.selectedBranch}</td>
            </tr>
            <tr>
              <td className="font-semibold">Total Meals Left:</td>
              <td>{subscriptionData.totalMealsLeft}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="mt-4 font-bold">Meals Taken</h2>
        <ul>
          {subscriptionData.mealsTaken.map((meal, index) => (
            <li key={index} className="mb-2">
              Date: {new Date(meal.date).toLocaleDateString()} | Plan: {meal.plan}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscribedPlan;
