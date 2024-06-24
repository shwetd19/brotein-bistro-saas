import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBarAdmin from "../components/SideBarAdmin";

const MealRecordDetails = () => {
  const { id } = useParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState({});
  const [meals, setMeals] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [totalMealsLeft, setTotalMealsLeft] = useState("");

  const plans = [
    "Basic Mini Bowl",
    "Platinum",
    "Two Times Mini Bowl",
    "Premium",
    "150 Grams Protein Source",
    "200 Grams Protein Source",
  ];

  const fetchDetailsAndMealRecords = async () => {
    try {
      const response = await axios.get(`/api/active/subs/${id}`);
      setSubscriptionDetails(response.data);
      setMeals(response.data.mealsTaken);
    } catch (error) {
      console.error("Error fetching details and meal records:", error);
    }
  };

  useEffect(() => {
    fetchDetailsAndMealRecords();
  }, [id]);

  const handleUpdate = async (field, value) => {
    try {
      await axios.patch(`/api/active/subs/${id}`, {
        [field]: value,
      });
      fetchDetailsAndMealRecords();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleDeleteMeal = async (mealRecordId) => {
    try {
      await axios.post("/api/active/subs/deleteMeal/", {
        username: subscriptionDetails.username,
        mealRecordId,
      });
      fetchDetailsAndMealRecords();
    } catch (error) {
      console.error("Error deleting meal record:", error);
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

          <div className="overflow-x-auto mt-4">
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Actions
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteMeal(meal._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 mt-4 p-3 rounded-xl border overflow-hidden">
            <div className="flex items-center space-x-2">
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="input"
              >
                <option value="">Select Plan</option>
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleUpdate("selectedPlan", selectedPlan)}
                className="button"
              >
                Update Plan
              </button>
            </div>
            <div className="flex items-center space-x-2 ">
              <input
                type="text"
                placeholder="Update Meals Left"
                value={totalMealsLeft}
                onChange={(e) => setTotalMealsLeft(e.target.value)}
                className="input "
              />
              <button
                onClick={() => handleUpdate("totalMealsLeft", totalMealsLeft)}
                className="button"
              >
                Update Meals Left
              </button>
            </div>
            {/* Add more input fields and buttons as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealRecordDetails;
