import { useState, useEffect } from "react";
import axios from "axios";
import SideBarAdmin from "../components/SideBarAdmin";

function SubscriptionseRequests() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      } = subscription;

      const response = await axios.put(`/api/active/subs/approve/${id}`, {
        phoneNumber,
        address,
        selectedPlan,
        startDate,
        selectedBranch,
        userId,
      });

      console.log("Subscription approved successfully:", response.data);
      setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Error approving subscription:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.delete(`/api/subs/subscriptions/${id}`);
      console.log(`Subscription with ID: ${id} declined successfully.`);
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub._id !== id)
      );
    } catch (error) {
      console.error("Error declining subscription:", error);
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
                placeholder="Search by username or phone number"
                value={searchQuery}
                onChange={handleSearchChange}
                className="rounded px-3 py-2"
              />
              <img src="search.svg" className="w-10 pr-5" />
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
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Selected Plan
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Starting Date
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Selected Branch
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
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
                  <td className="px-4 py-2 ">
                    <button
                      onClick={() => handleApprove(subscription._id)}
                      className="border bg-black text-white font-semibold py-2 px-1 rounded mr-3 m-2 w-full mb-1 flex justify-center items-center shadow-inner"
                    >
                      <img
                        src="/approve.svg"
                        alt="Approve"
                        className="w-5 text-white m-0.5"
                      />
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(subscription._id)}
                      className="border bg-[#DE443B] text-white font-semibold py-2 px-1 rounded mr-2 m-2 w-full mb-1 flex justify-center items-center shadow-inner"
                    >
                      <img
                        src="/decline.svg"
                        alt="Decline"
                        className="w-5 text-white m-0.5"
                      />
                      Decline
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

export default SubscriptionseRequests;
