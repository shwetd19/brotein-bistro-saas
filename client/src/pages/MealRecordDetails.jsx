import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBarAdmin from "../components/SideBarAdmin";

const MealRecordDetails = () => {
  const { id } = useParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState({});
  const [meals, setMeals] = useState([]);
  const [updateField, setUpdateField] = useState("");
  const [newValue, setNewValue] = useState("");

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

  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/active/subs/${id}`, {
        [updateField]: newValue,
      });
      // Refresh the subscription details after successful update
      fetchDetailsAndMealRecords();
    } catch (error) {
      console.error("Error updating subscription details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/active/subs/${id}`);
      // Redirect or navigate away after deletion
      window.location.href = "/"; // Adjust based on your routing setup
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2">
      <SideBarAdmin />
      <div className="pt-20 p-2 w-full col-span-12">
        <div className="container mx-auto p-4 pt-20">
          <h1 className="text-2xl font-bold mb-4">Meal Records</h1>
          <div className="bg-[#F6F6F6] rounded-lg border overflow-hidden p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {subscriptionDetails.username}
            </h2>
            <p>Plan: {subscriptionDetails.selectedPlan}</p>
            <p>
              Meals Left: {subscriptionDetails.totalMealsLeft} /{" "}
              {subscriptionDetails.totalMeals}
            </p>
            <p>Days Left: {subscriptionDetails.DaysLeft}</p>
          </div>
          {/* Interactive Update/Delete Section */}
          <div className="flex justify-end mt-4">
            <select
              onChange={(e) => setUpdateField(e.target.value)}
              className="mr-2"
            >
              <option value="">Select Field to Edit</option>
              <option value="selectedPlan">Selected Plan</option>
              <option value="totalMealsLeft">Total Meals Left</option>
              {/* Add more options as needed */}
            </select>
            <input type="text" onChange={(e) => setNewValue(e.target.value)} />
            <button onClick={handleUpdate} className="ml-2">
              Update
            </button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          {/* Existing Table Display */}
          <div className="overflow-x-auto">
            <div className="rounded-xl border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F6F6F6]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Selected Plan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {meals.map((meal, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Intl.DateTimeFormat("en-GB").format(
                          new Date(meal.date)
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {meal.plan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealRecordDetails;
