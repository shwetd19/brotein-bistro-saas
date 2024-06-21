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
      <div className="pt-20 p-10  ">
        {/* <h1 className="text-2xl font-bold mb-5">Active Subscriptions</h1> */}
        <div className="w-full  rounded-xl border ">
          <thead className=" bg-[#F6F6F6]  rounded-xl ">
            <tr className=" ">
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-tl-xl border-b">
                Index
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Username
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Phone Number
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Address
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Plan
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Starting Date
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Branch
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-tr-xl border-b">
                Days Left
              </th>
            </tr>
          </thead>
          <tbody className="border">
            {activeSubscriptions.map((subscription, index) => (
              <tr
                key={subscription._id}
                className="hover:bg-[#F6F6F6] transition duration-150 ease-in-out"
              >
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{subscription.username}</td>
                <td className="px-4 py-2 border-b">{subscription.phoneNumber}</td>
                <td className="px-4 py-2 border-b">{subscription.address}</td>
                <td className="px-4 py-2 border-b">{subscription.selectedPlan}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">{subscription.selectedBranch}</td>
                <td className="px-4 py-2 border-b">{subscription.DaysLeft}</td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </div>
  );
}

export default ActiveSubscriptions;
