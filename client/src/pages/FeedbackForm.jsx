import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import axios from "axios"; // Use axios for HTTP requests

const FeedbackForm = () => {
  const [satisfactionLevel, setSatisfactionLevel] = useState("");
  const [valueForMoney, setValueForMoney] = useState("");
  const [qualityOfMeals, setQualityOfMeals] = useState("");
  const [deliveryExperience, setDeliveryExperience] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState(""); // Declare and initialize subscriptionPlan

  // Access the current user's information from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const username = currentUser ? currentUser.username : "";
  const userId = currentUser ? currentUser._id : ""; // Assuming _id is the ObjectId

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the feedback data
    const feedbackData = {
      userId,
      username,
      satisfactionLevel,
      valueForMoney,
      qualityOfMeals,
      deliveryExperience,
      suggestions,
    };

    try {
      // Send the feedback data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/feedback/give/feedback",
        feedbackData
      );

      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-md rounded-lg mx-auto w-custom"
    >
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="subscriptionPlan"
        >
          Subscription Plan Selected:
        </label>
        <select
          id="subscriptionPlan"
          value={subscriptionPlan} // Use subscriptionPlan here
          onChange={(e) => setSubscriptionPlan(e.target.value)} // Update subscriptionPlan on change
          className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

      <div>
        <p className="font-semibold mb-2">Satisfaction Level:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSatisfactionLevel("Very Unsatisfied")}
            className={`px-4 py-2 ${
              satisfactionLevel === "Very Unsatisfied"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Very Unsatisfied
          </button>
          <button
            type="button"
            onClick={() => setSatisfactionLevel("Unsatisfied")}
            className={`px-4 py-2 ${
              satisfactionLevel === "Unsatisfied"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Unsatisfied
          </button>
          <button
            type="button"
            onClick={() => setSatisfactionLevel("Neutral")}
            className={`px-4 py-2 ${
              satisfactionLevel === "Neutral"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Neutral
          </button>
          <button
            type="button"
            onClick={() => setSatisfactionLevel("Satisfied")}
            className={`px-4 py-2 ${
              satisfactionLevel === "Satisfied"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Satisfied
          </button>
          <button
            type="button"
            onClick={() => setSatisfactionLevel("Very Satisfied")}
            className={`px-4 py-2 ${
              satisfactionLevel === "Very Satisfied"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Very Satisfied
          </button>
        </div>
      </div>
      <div>
        <p className="font-semibold mb-2">Value for Money:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setValueForMoney("Very Unsatisfied")}
            className={`px-4 py-2 ${
              valueForMoney === "Very Unsatisfied"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Very Unsatisfied
          </button>
          <button
            type="button"
            onClick={() => setValueForMoney("Unsatisfied")}
            className={`px-4 py-2 ${
              valueForMoney === "Unsatisfied"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Unsatisfied
          </button>
          <button
            type="button"
            onClick={() => setValueForMoney("Neutral")}
            className={`px-4 py-2 ${
              valueForMoney === "Neutral"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Neutral
          </button>
          <button
            type="button"
            onClick={() => setValueForMoney("Satisfied")}
            className={`px-4 py-2 ${
              valueForMoney === "Satisfied"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Satisfied
          </button>
          <button
            type="button"
            onClick={() => setValueForMoney("Very Satisfied")}
            className={`px-4 py-2 ${
              valueForMoney === "Very Satisfied"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Very Satisfied
          </button>
        </div>
      </div>
      <div>
        <p className="font-semibold mb-2">Quality of Meals:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setQualityOfMeals("Very Unsatisfied")}
            className={`px-4 py-2 ${
              qualityOfMeals === "Very Unsatisfied"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Very Unsatisfied
          </button>
          <button
            type="button"
            onClick={() => setQualityOfMeals("Unsatisfied")}
            className={`px-4 py-2 ${
              qualityOfMeals === "Unsatisfied"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Unsatisfied
          </button>
          <button
            type="button"
            onClick={() => setQualityOfMeals("Neutral")}
            className={`px-4 py-2 ${
              qualityOfMeals === "Neutral"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Neutral
          </button>
          <button
            type="button"
            onClick={() => setQualityOfMeals("Satisfied")}
            className={`px-4 py-2 ${
              qualityOfMeals === "Satisfied"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Satisfied
          </button>
          <button
            type="button"
            onClick={() => setQualityOfMeals("Very Satisfied")}
            className={`px-4 py-2 ${
              qualityOfMeals === "Very Satisfied"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            Very Satisfied
          </button>
        </div>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="deliveryExperience"
        >
          Delivery Experience:
        </label>
        <textarea
          id="deliveryExperience"
          value={deliveryExperience}
          onChange={(e) => setDeliveryExperience(e.target.value)}
          rows="3"
          placeholder="Describe your delivery experience"
          className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="suggestions"
        >
          Suggestions for Improvement:
        </label>
        <textarea
          id="suggestions"
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          rows="3"
          placeholder="Any suggestions?"
          className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-auto"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
