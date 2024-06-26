import { useState, useEffect } from "react";
import axios from "axios";
import SideBarAdmin from "../components/SideBarAdmin";

function ActiveSubscriptions() {
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  });

  useEffect(() => {
    const fetchActiveSubscriptions = async () => {
      try {
        const response = await axios.get("/api/active/subs/getAllActiveSubs");
        if (Array.isArray(response.data)) {
          setActiveSubscriptions(response.data);
        } else {
          console.error("Expected an array, got:", response.data);
          setActiveSubscriptions([]); // Set to an empty array or handle as needed
        }
      } catch (error) {
        console.error("Error fetching active subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveSubscriptions();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredSubscriptions = activeSubscriptions.filter(
    (subscription) =>
      subscription.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;

  const handleAdminRecordMeal = async (subscription) => {
    try {
      await axios.post(
        `/api/active/subs/admin/recordMeal/${subscription.username}`,
        {
          username: subscription.username,
          selectedPlan: subscription.selectedPlan,
          date: selectedDate,
          userId: subscription.userId, // Assuming `userId` is available in the subscription object
        }
      );
      alert("Meal recorded successfully");
    } catch (error) {
      console.error("Error recording meal:", error);
      alert("Failed to record meal");
    }
  };

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2">
      <SideBarAdmin />
      <div className="pt-20 p-2 w-full">
        <div className="rounded-xl border">
          <div className="p-4 flex">
            <div className="border shadow-md px-3 py-2 flex rounded-full w-min">
              <input
                type="text"
                placeholder="Search by username or phone number"
                value={searchQuery}
                onChange={handleSearchChange}
                className=" rounded px-3 py-2"
              />
              <img
                src="/images/search.svg"
                className="w-10 pr-5"
                alt="Search"
              />
            </div>
            <div className="flex items-center justify-end">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border rounded px-3 py-2 ml-2"
              />
            </div>
          </div>
          <table className="w-full divide-y divide-gray-200 text-center">
            <thead className="bg-[#F6F6F6]">
              <tr>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Username
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Phone Number
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Address
                </th>
                <th className="px-4 py-2 text-semibold text-gray-700">Plan</th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Starting Date
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Branch
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Days Left
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
                <tr
                  key={subscription._id}
                  className="hover:bg-[#F6F6F6] transition duration-150 ease-in-out"
                >
                  <td className="px-4 py-2 text-center">
                    {subscription.username}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {subscription.phoneNumber}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {subscription.address}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {subscription.selectedPlan}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {subscription.selectedBranch}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {subscription.DaysLeft}/50
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleAdminRecordMeal(subscription)}
                      className="button shadow-md text-center text-xs"
                    >
                      Record Meal
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

export default ActiveSubscriptions;
