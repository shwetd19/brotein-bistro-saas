import React, { useState } from "react";
import { Link } from "react-router-dom";

const Bmi = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setBmiCategory("underweight");
    } else if (bmiValue < 24.9) {
      setBmiCategory("normal weight");
    } else if (bmiValue < 29.9) {
      setBmiCategory("overweight");
    } else {
      setBmiCategory("obese");
    }
  };

  return (
    <div className=" bg-[#F8F5F2] min-h-screen p-10 pt-20">
      <div className="grid md:grid-flow-col lg:grid-flow-col sm:grid-flow-row md:grid-cols-2 lg:grid-cols-2  gap-6">
        <div className=" sm:p-6 lg:px-20 md:px-14  ">
          <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
          <div className="mb-4">
            <label className="block mb-2">Gender</label>
            <div>
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-2"
              />{" "}
              Female
              <input
                type="radio"
                name="gender"
                value="male"
                className="ml-4 mr-2"
              />{" "}
              Male
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={calculateBMI}
            className="w-full bg-[#FF6F61] text-white p-2 rounded"
          >
            Calculate
          </button>
          <div className="mt-4 flex items-center justify-center">
            {/* <Link
                role="button"
                to="/plans"
                className="w-full bg-[#FF6F61] text-white p-2 rounded"
              >
                go to plans
              </Link> */}
          </div>
        </div>
        <div className="p-6 lg:px-20 md:px-14  rounded-2xl bg-white">
          {/* <div> */}
          {/* <h1 className="text-xl font-semibold mb-2">Your Results</h1> */}
          {bmi && (
            <div className="mt-6">
              <h2 className="text-xl font-bold">Your results</h2>
              <p>BMI: {bmi}</p>
              <div className="grid grid-flow-col col-span-2  ">
                <div>
                  <p
                    className={` p-2 ${
                      bmiCategory === "underweight"
                        ? "text-blue-500"
                        : bmiCategory === "normal weight"
                        ? "text-green-500"
                        : bmiCategory === "overweight"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {bmiCategory}
                  </p>
                </div>
                <div className="my-2">
                  <Link
                    to="/Plans"
                    className="w-full bg-[#FF6F61] text-white p-2 rounded"
                  >
                    go to plans
                  </Link>
                </div>
              </div>
            </div>
          )}
          <hr />
          <p className="mt-2">
            A BMI between 18.5 and 24.9 is considered normal weight, reducing
            the risk of weight-related health issues.
          </p>
          <img placeholder="bmi" src="bmi.png" />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Bmi;
