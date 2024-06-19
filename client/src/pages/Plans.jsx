// Plans.jsx
import { useLocation } from "react-router-dom";

const plans = [
  {
    title: "Basic Plan",
    price: "$19.99/month",
    description: "A basic diet plan with essential nutrition.",
    features: ["Personalized Diet", "Email Support", "Weekly Check-ins"],
  },
  {
    title: "Standard Plan",
    price: "$49.99/month",
    description: "A comprehensive diet plan for balanced nutrition.",
    features: [
      "Personalized Diet",
      "Priority Email Support",
      "Bi-weekly Check-ins",
      "Access to Recipes",
    ],
  },
  {
    title: "Premium Plan",
    price: "$99.99/month",
    description: "An advanced diet plan for optimal nutrition and performance.",
    features: [
      "Personalized Diet",
      "24/7 Support",
      "Weekly Check-ins",
      "Access to Premium Recipes",
      "One-on-One Coaching",
    ],
  },
];

export default function Plans() {
  const location = useLocation();
  const { bmi, message, optimalWeight } = location.state || { bmi: "N/A" };

  return (
    <div className="flex flex-col items-center p-20 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Our Diet Plans</h1>
      <p className="text-xl font-semibold ">Your BMI is {bmi}</p>
      <label className="text-xl font-semibold ">{message}</label>
      <label className="text-xl font-semibold mb-8">{optimalWeight}</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.title} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{plan.title}</h2>
            <p className="text-xl text-gray-700 mb-4">{plan.price}</p>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <ul className="text-gray-600 mb-4">
              {plan.features.map((feature) => (
                <li key={feature} className="mb-2">
                  • {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
