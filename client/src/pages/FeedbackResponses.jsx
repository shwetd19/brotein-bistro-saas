import { useState, useEffect } from "react";
import axios from "axios";
import SideBarAdmin from "../components/SideBarAdmin";

function FeedbackFormResponse() {
  const [feedbackResponses, setFeedbackResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeedbackResponses = async () => {
      try {
        const response = await axios.get("/api/feedback/readAll/feedback");
        setFeedbackResponses(response.data);
      } catch (error) {
        console.error("Error fetching feedback responses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackResponses();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFeedbackResponses = feedbackResponses.filter((feedback) =>
    feedback.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`/api/feedback/delete/feedback/${feedbackId}`);
      setFeedbackResponses(
        feedbackResponses.filter((feedback) => feedback._id !== feedbackId)
      );
      alert("Feedback deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2">
      <SideBarAdmin />
      <div className="pt-20 p-2 w-full">
        <div className="rounded-xl border">
          <div className="p-4 flex">
            <div className="border shadow-md px-3 py-2 flex rounded-full w-min">
              <input
                type="text"
                placeholder="Search by username"
                value={searchQuery}
                onChange={handleSearchChange}
                className="rounded px-3 py-2"
              />
              <img src="/search.svg" className="w-10 pr-5" />
            </div>
          </div>
          <table className="w-full divide-y divide-gray-200 mt-8 text-center">
            <thead className="bg-[#F6F6F6]">
              <tr>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Username
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Satisfaction Level
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Value for Money
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Quality of Meals
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Delivery Experience
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Suggestions
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeedbackResponses.map((feedback) => (
                <tr
                  key={feedback._id}
                  className="hover:bg-[#F6F6F6] transition duration-150 ease-in-out"
                >
                  <td className="px-4 py-2 text-center">{feedback.username}</td>
                  <td className="px-4 py-2 text-center">
                    {feedback.satisfactionLevel}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {feedback.valueForMoney}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {feedback.qualityOfMeals}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {feedback.deliveryExperience}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {feedback.suggestions}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteFeedback(feedback._id)}
                      className="button shadow-md text-center text-xs"
                    >
                      Delete Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeedbackFormResponse;
