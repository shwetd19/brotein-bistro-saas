import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import Sidebar from "../components/Sidebar";

const MealRecords = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("/api/active/subs/getAllActiveSubs");
        if (response.data && Array.isArray(response.data)) {
          setSubscriptions(response.data);
        } else {
          console.error(
            "Unexpected data structure in response:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2  ">
      <div className="">
        <Sidebar />
      </div>
      <div className="container mx-auto p-10 pt-20">
        <h1 className="text-2xl font-bold mb-4">Meal Records</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.map((sub) => (
            <div
              key={sub._id}
              className="glass shadow-lg rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold">{sub.username}</h2>
                <p className="mt-2">Plan: {sub.selectedPlan}</p>
                <p className="mt-2">Meals Left: {sub.totalMealsLeft}</p>
                <p className="mt-2">Days Left: {sub.DaysLeft}</p>
              </div>
              <div className="border-t border-gray-200"></div>
              {/* <ul className="px-6 py-4">
              {sub.mealsTaken.map((meal, index) => (
                <li key={index} className="mt-2">
                  {meal.date} - {meal.plan}
                </li>
              ))}
            </ul> */}
              <div className="px-6 py-4 mt-4">
                <Link to={`/meal-records/${sub._id}`} className="button">
                  View Meal Records
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealRecords;
