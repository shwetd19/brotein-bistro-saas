import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const GetMeal = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [date, setDate] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const username = currentUser ? currentUser.username : "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/active/subs/recordMeal", {
        username,
        selectedPlan,
        date,
      });

      alert("Meal recorded successfully");
    } catch (error) {
      console.error("Error recording meal:", error);
      alert("Failed to record meal");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="glass  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="plan"
          >
            Selected Plan
          </label>
          <select
            id="plan"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Plan</option>
            <option value="Basic Mini Bowl">Basic Mini Bowl</option>
            <option value="Platinum">Platinum</option>
            <option value="Two Times Mini Bowl">Two Times Mini Bowl</option>
            <option value="150 Grams Protein Source">
              150 Grams Protein Source
            </option>
            <option value="Premium">Premium</option>
            <option value="200 Grams Protein Source">
              200 Grams Protein Source
            </option>
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Record Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetMeal;
