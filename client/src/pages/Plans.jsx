import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: 1,
    name: "Basic Mini Bowl",
    price: "3899 + delivery extra",
    meals: "26 (one time a day, Sunday off)",
    protein: "70 grams per meal",
    customization: "Customizable",
  },
  {
    id: 2,
    name: "Platinum",
    price: "11499",
    meals: "60 (two times a day, any preparation from menu)",
    protein: "100 grams per meal",
    customization: "Customizable",
    highlight: true,
  },
  {
    id: 3,
    name: "Two Times Mini Bowl",
    price: "6899 + delivery",
    meals: "52 (two times a day, Sunday off)",
    protein: "70 grams per meal",
    customization: "Customizable",
  },
  {
    id: 4,
    name: "Premium",
    price: "6499 (free delivery within 3km)",
    meals: "30 (one time a day, can redeem up to two meals a day)",
    protein: "100 grams per meal, 30 grams guaranteed",
    customization: "Customizable",
  },
  {
    id: 5,
    name: "150 Grams Protein Source",
    price: "7499",
    meals: "30",
    protein: "150 grams per meal",
    customization: "Customizable",
  },
  {
    id: 6,
    name: "200 Grams Protein Source",
    price: "8499",
    meals: "30",
    protein: "200 grams per meal",
    customization: "Customizable",
  },
];

const Plans = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    navigate("/subscription", { state: { selectedPlan: plan } });
  };

  return (
    <div className="container mx-auto pt-20 px-10 bg-[#F8F5F2]">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Choose Your Perfect Meal Plan
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border p-4 rounded-lg shadow-md bg-white grid ${
              plan.highlight ? "bg-red-100 border-red-500 shadow-red-300" : ""
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-lg mb-2">
              <strong>Price:</strong> <br /> {plan.price}
            </p>
            <p className="text-lg mb-2">
              <strong>Meals:</strong> <br /> {plan.meals}
            </p>
            <p className="text-lg mb-2">
              <strong>Protein:</strong> <br /> {plan.protein}
            </p>
            <p className="text-lg mb-4">
              <strong>Customization:</strong> <br /> {plan.customization}
            </p>
            <button
              className="w-full py-2 bg-[#FF6F61] text-white font-bold rounded hover:bg-red-500"
              onClick={() => handleSelectPlan(plan)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
