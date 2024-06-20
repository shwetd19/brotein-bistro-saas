import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealRecordDetails = () => {
  const { id } = useParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchDetailsAndMealRecords = async () => {
      try {
        const response = await axios.get(`/api/active/subs/${id}`);
        setSubscriptionDetails(response.data);
        setMeals(response.data.mealsTaken);
      } catch (error) {
        console.error("Error fetching details and meal records:", error);
      }
    };

    fetchDetailsAndMealRecords();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Records</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {subscriptionDetails.username}
        </h2>
        <p>Plan: {subscriptionDetails.selectedPlan}</p>
        <p>Meals Left: {subscriptionDetails.totalMealsLeft}</p>
        <p>Days Left: {subscriptionDetails.DaysLeft}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Selected Plan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meals.map((meal, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {meal.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {meal.plan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealRecordDetails;