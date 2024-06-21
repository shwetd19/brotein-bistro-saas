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
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2  ">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex flex-col items-center justify-center pt-20 p-10">
        {/* <h1 className="text-2xl font-bold mb-5">Active Subscriptions</h1> */}
        <table className="w-full border-collapse border rounded-lg block">
          <thead className=" bg-white  border-t rounded-t-lg  block">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                Index
              </th>
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
                Selected Plan
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                Starting Date
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                Selected Branch
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 ">
                Days Left
              </th>
            </tr>
          </thead>
          <tbody>
            {activeSubscriptions.map((subscription, index) => (
              <tr
                key={subscription._id}
                className="hover:bg-white transition duration-150 ease-in-out"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{subscription.username}</td>
                <td className="px-4 py-2">{subscription.phoneNumber}</td>
                <td className="px-4 py-2 ">{subscription.address}</td>
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
  );
}

export default ActiveSubscriptions;
