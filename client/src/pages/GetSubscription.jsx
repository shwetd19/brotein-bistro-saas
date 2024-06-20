import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function SubscriptionPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser ? currentUser.username : "",
    phoneNumber: "",
    address: "",
    selectedPlan: "",
    startDate: "",
    selectedBranch: "",
    userId: currentUser ? currentUser._id : "", // Include the user's ObjectId in formData
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
        body: JSON.stringify(formData), // formData now includes the user's ObjectId
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.ok) {
        // Handle success
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Get Subscription</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "80%",
          maxWidth: "400px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "10px" }}>Personal Details</h2>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            readOnly
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label
            htmlFor="phoneNumber"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Phone Number:
          </label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label
            htmlFor="address"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Address:
          </label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "10px" }}>Subscription Details</h2>
          <label
            htmlFor="selectedPlan"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Selected Plan:
          </label>
          <select
            id="selectedPlan"
            name="selectedPlan"
            value={formData.selectedPlan}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Plan</option>
            <option value="Basic Mini Bowl">Basic Mini Bowl</option>
            <option value="Two Times Mini Bowl">Two Times Mini Bowl</option>
            <option value="Premium">Premium</option>
            <option value="Platinum">Platinum</option>
            <option value="150 Grams Protein Source">
              150 Grams Protein Source
            </option>
            <option value="200 Grams Protein Source">
              200 Grams Protein Source
            </option>
          </select>
          <label
            htmlFor="startDate"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Start Date:
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            min={minDate}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label
            htmlFor="selectedBranch"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Selected Branch:
          </label>
          <select
            id="selectedBranch"
            name="selectedBranch"
            value={formData.selectedBranch}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Branch</option>
            <option value="nashik-1">Nashik-1</option>
            <option value="nashik-2">Nashik-2</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubscriptionPage;
