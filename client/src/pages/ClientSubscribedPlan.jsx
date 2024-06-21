// SubscribedPlan.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SubscribedPlan = () => {
  const { id } = useParams();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/active/subs/users/${id}/meals`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch subscription data:", errorText);
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        setSubscriptionData(data[0]);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        setError(error.message);
      }
    };

    fetchData();

    // Polling to fetch updated data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Error: {error}
      </div>
    );
  }

  if (!subscriptionData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen  text-2xl capitalize ">
        <img placeholder="records" src="/records.svg" className="w-10" />
        <h1>
          Hang on a sec... <br />
          Our Admin Will Provide You Access.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen w-full p-10 pt-20">
      <div>
        <Link
          to="/get-your-meal"
          className=" capitalize bg-[#F6F6F6] hover:bg-[#f1f0f0] px-2 py-3 rounded-lg border text-lg my-2 block "
        >
          get your meal now
        </Link>
      </div>
      <div className="grid gap-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          {/* <div className="backdrop-blur-sm   p-2 rounded-xl w-full h-44 bg-[#FFEFE2] border ">
            <img alt="meal" className="w-10" src="/getmeal.svg" />
            <h1 className="text-xl md:text-2xl mb-6 capitalize">
              get your meal
            </h1>
          </div> */}

          <div className=" p-2 rounded-xl w-full h-44   bg-[#EFFCEF] border ">
            <img alt="meal" className="w-10" src="/taken.svg" />
            <h1 className="text-xl text-center md:text-xl mb-2 capitalize">
              Meals Left:
            </h1>
            <h1 className="font-semibold text-center text-4xl ">
              {subscriptionData.totalMealsLeft} /{" "}
              {subscriptionData.totalMealsOfThatPlan}
            </h1>
          </div>
          <div className="   p-2 rounded-xl w-full h-44  bg-[#F4F6FA] border ">
            <img alt="meal" className="w-10" src="/daysleft.svg" />{" "}
            <h1 className="text-xl text-center md:text-xl mb-2  capitalize">
              Days Left:
            </h1>
            <h1 className="font-semibold text-4xl  text-center">
              {subscriptionData.totalMealsLeft}
            </h1>
          </div>
          <div className="   p-2 rounded-xl w-full bg-[#FFEFE2] border ">
            <img alt="meal" className="w-10" src="/plans.svg" />{" "}
            <div className="text-xl text-center md:text-xl mb-2 capitalize ">
              Selected Plan:
            </div>
            <div className="font-semibold text-4xl text-center">
              {subscriptionData.selectedPlan}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="   p-2 rounded-xl w-full h-44 bg-[#F6F6F6] border">
            <img alt="meal" className="w-10" src="/date.svg" />{" "}
            <div className="text-xl text-center md:text-2xl mb-2 capitalize">
              Start Date:
            </div>
            <div className="font-semibold text-4xl text-center">
              {new Date(subscriptionData.startDate).toLocaleDateString()}
            </div>
          </div>
          <div className="   p-2 rounded-xl w-full h-44 bg-[#F6F6F6] border">
            <img alt="meal" className="w-10" src="/branch.svg" />{" "}
            <div>
              <div className="text-xl text-center md:text-2xl mb-2 capitalize">
                Selected Branch:
              </div>
              <div className="font-semibold text-4xl text-center">
                {subscriptionData.selectedBranch}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <div className="   p-2 rounded-xl w-full col-span-2 bg-[#F6F6F6] border">
            <img alt="meal" className="w-10" src="/meal.svg" />{" "}
            <h1 className="text-xl text-center md:text-xl mb-2 capitalize">
              Meals Taken
            </h1>
            <ul>
              {subscriptionData.mealsTaken.map((meal, index) => (
                <li key={index} className="mb-2 font-semibold  text-center">
                  Date: {new Date(meal.date).toLocaleDateString()} | Plan:{" "}
                  {meal.plan}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribedPlan;
