import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

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
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2">
      <Sidebar />
      <div className="pt-20 p-10">
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full divide-y divide-gray-200">
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
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Plan
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Starting Date
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Branch
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Days Left
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeSubscriptions.map((subscription) => (
                <tr
                  key={subscription._id}
                  className="hover:bg-[#F6F6F6] transition duration-150 ease-in-out"
                >
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
      </div>
    </div>
  );
}

export default ActiveSubscriptions;
