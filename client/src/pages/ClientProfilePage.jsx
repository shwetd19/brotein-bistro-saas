// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/active/subs/users/${id}/meals`);

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data[0]);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
        <h1 className="text-xl font-bold mb-4">User Profile</h1>
        <table className="w-full text-left">
          <tbody>
            <tr>
              <td className="font-semibold">ID:</td>
              <td>{userData.userId}</td>
            </tr>
            <tr>
              <td className="font-semibold">Username:</td>
              <td>{userData.username}</td>
            </tr>
            <tr>
              <td className="font-semibold">Phone Number:</td>
              <td>{userData.phoneNumber}</td>
            </tr>
            <tr>
              <td className="font-semibold">Address:</td>
              <td>{userData.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
