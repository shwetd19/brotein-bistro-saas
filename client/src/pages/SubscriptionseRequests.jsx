import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function SubscriptionRequests() {
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
      <div className="flex flex-col items-center justify-center pt-20 p-10">
        {/* <h1 className="text-2xl font-bold mb-5">Subscriptions</h1> */}
        <table className="w-full  rounded-lg ">
          <thead className=" bg-white shadow-sm ">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-tl-xl ">
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
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-tr-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="border">
            {subscriptions.map((subscription, index) => (
              <tr
                key={subscription._id}
                className="hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                <td>{index + 1}</td>
                <td>{subscription.username}</td>
                <td>{subscription.phoneNumber}</td>
                <td>{subscription.address}</td>
                <td>{subscription.selectedPlan}</td>
                <td>{new Date(subscription.startDate).toLocaleDateString()}</td>
                <td>{subscription.selectedBranch}</td>
                <td>
                  <button
                    onClick={() => handleApprove(subscription._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 w-full mb-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(subscription._id)}
                    className="button text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionRequests;
