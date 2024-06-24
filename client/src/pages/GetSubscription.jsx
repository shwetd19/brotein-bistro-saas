import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SubscriptionPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan } = location.state || {};

  const [formData, setFormData] = useState({
    username: currentUser ? currentUser.username : "",
    phoneNumber: "",
    address: "",
    selectedPlan: selectedPlan ? selectedPlan.name : "",
    startDate: "",
    selectedBranch: "",
    userId: currentUser ? currentUser._id : "",
  });

  const [minDate, setMinDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/subs/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        // navigate(`/user-subscribed-plan/${currentUser._id}`);
        navigate(`/wait`);
      } else {
        throw new Error("Failed to create subscription");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 flex items-center justify-center bg-login h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 max-w-md border-gray-300  border p-5 rounded-xl backdrop-blur-2xl shadow-sm"
      >
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block w-full mb-1 text-2xl font-bold"
          >
            Hello, {formData.username}
          </label>
          <label
            className="block w-full mb-1 text-2xl font-semibold"
            id="selectedPlan"
            type="text"
            name="selectedPlan"
            value={formData.selectedPlan}
            readOnly
          >
            {formData.selectedPlan} is a great choice!
          </label>
          <h1 className="mb-1">You are one step away!</h1>
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number:
          </label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 mb-1 border border-gray-300 rounded"
          />
          <label htmlFor="address" className="block mb-1">
            Address:
          </label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 mb-1 border border-gray-300 rounded"
          />
        </div>
        <label htmlFor="startDate" className="block mb-1">
          When do you want to start?
        </label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          min={minDate}
          className="w-full p-2 mb-1 border border-gray-300 rounded"
        />
        <label htmlFor="selectedBranch" className="block mb-1">
          Selected Branch:
        </label>
        <select
          id="selectedBranch"
          name="selectedBranch"
          value={formData.selectedBranch}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Branch</option>
          <option value="nashik-1">Nashik-1</option>
          <option value="nashik-2">Nashik-2</option>
        </select>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubscriptionPage;
