// components/SubscriptionRow.jsx
import React from 'react';

function SubscriptionRow({ subscription, index, onApprove, onDecline }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{index}</td>
      <td className="px-6 py-4 whitespace-nowrap">{subscription.username}</td>
      <td className="px-6 py-4 whitespace-nowrap">{subscription.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">{subscription.plan}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Approve
        </button>
        <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Decline
        </button>
      </td>
    </tr>
  );
}

export default SubscriptionRow;
