import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function SubscriptionseRequests() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("/api/subs/subscriptions");
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleApprove = async (id) => {
    try {
      const subscription = subscriptions.find((sub) => sub._id === id);
      if (!subscription) {
        throw new Error("Subscription not found");
      }

      const {
        phoneNumber,
        address,
        selectedPlan,
        startDate,
        selectedBranch,
        userId,
      } = subscription; // Destructure userId from the subscription object

      const response = await axios.put(`/api/active/subs/approve/${id}`, {
        phoneNumber,
        address,
        selectedPlan,
        startDate,
        selectedBranch,
        userId, // Include userId in the request body
      });

      console.log("Subscription approved successfully:", response.data);
      // Remove the approved subscription from the local state
      setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Error approving subscription:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.delete(`/api/subs/subscriptions/${id}`);
      console.log(`Subscription with ID: ${id} declined successfully.`);
      // Update local state to remove the declined subscription
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub._id !== id)
      );
    } catch (error) {
      console.error("Error declining subscription:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2  ">
      <div className="">
        <Sidebar />
      </div>
      <div className="pt-20 p-10  ">
        {/* <h1 className="text-2xl font-bold mb-5">Subscriptions</h1> */}
        <div className="w-full  rounded-xl border ">
          <thead className=" bg-[#F6F6F6]  rounded-xl ">
            <tr>
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
                Selected Plan
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Starting Date
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Selected Branch
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-tr-xl border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="border">
            {subscriptions.map((subscription, index) => (
              <tr
                key={subscription._id}
                className="hover:bg-[#F6F6F6] transition duration-150 ease-in-out"
              >
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{subscription.username}</td>
                <td className="px-4 py-2 border-b">
                  {subscription.phoneNumber}
                </td>
                <td className="px-4 py-2 border-b">{subscription.address}</td>
                <td className="px-4 py-2 border-b">
                  {subscription.selectedPlan}
                </td>
                <td className="px-4 py-2 border-b">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {subscription.selectedBranch}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleApprove(subscription._id)}
                    className="border bg-[#F6F6F6]  font-semibold py-2 px-4 rounded mr-2 w-full mb-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(subscription._id)}
                    className="border bg-[#F6F6F6]  font-semibold py-2 px-4 rounded mr-2 w-full mb-1"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionseRequests;
