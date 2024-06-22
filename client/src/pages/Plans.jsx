// import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: 1,
    name: "Basic Mini Bowl",
    price: "3899 ",
    price2: "+ delivery",
    meals: "26 (one time a day, Sunday off)",
    protein: "70 grams per meal",
    customization: "Customizable",
  },
  {
    id: 2,
    name: "Platinum",
    price: "11499",
    price2: "",
    meals: "60 (two times a day, any preparation from menu)",
    protein: "100 grams per meal",
    customization: "Customizable",
    highlight: true,
  },
  {
    id: 3,
    name: "Two Times Mini Bowl",
    price: "6899 ",
    price2: "+ delivery",
    meals: "52 (two times a day, Sunday off)",
    protein: "70 grams per meal",
    customization: "Customizable",
  },
  {
    id: 4,
    name: "Premium",
    price: "6499 ",
    price2: "free delivery in 3km",
    meals: "30 (one time a day, can redeem up to two meals a day)",
    protein: "100 grams per meal, 30 grams guaranteed",
    customization: "Customizable",
  },
  {
    id: 5,
    name: "150 Grams Protein Source",
    price: "7499",
    price2: "",
    meals: "30",
    protein: "150 grams per meal",
    customization: "Customizable",
  },
  {
    id: 6,
    name: "200 Grams Protein Source",
    price: "8499",
    price2: "",
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
    <div className="mx-auto pt-20 px-10  ">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Choose Your Perfect Meal Plan
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-card p-6 rounded-lg shadow-sm border border-gray-300 grid ${
              plan.highlight ? "bg-red-50 border-red-400  " : ""
            }`}
          >
            <div className="grid gap-4">
              <div>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="">Meals: {plan.meals}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold ">₹ {plan.price}</span>
                {/* <p className="text-4xl font-bold"></p> */}
                <span className="">{plan.price2}</span>
              </div>

              <ul className="grid gap-2 ">
                <li className="flex items-center gap-2">
                  {/* <CheckIcon className="w-4 h-4 text-green-500" />1 user */}
                  <div className="flex">
                    <img src="/tick.svg" alt="" className="w-6 mr-2" />
                    <p className="">Protein: {plan.protein}</p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  {/* <CheckIcon className="w-4 h-4 text-green-500" />1 user */}
                  <div className="flex">
                    <img src="/tick.svg" alt="" className="w-6 mr-2" />
                    <p className="">{plan.customization}</p>
                  </div>
                </li>
              </ul>

              <button
                className="w-full py-2 font-bold rounded-lg hover:bg-[#F6F6F6] border"
                onClick={() => handleSelectPlan(plan)}
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
