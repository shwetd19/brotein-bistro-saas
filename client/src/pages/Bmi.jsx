// // src/Bmi.jsx
// import React, { useState } from "react";

// const Bmi = () => {
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [bmi, setBMI] = useState(null);
//   const [message, setMessage] = useState("");

//   const calculateBMI = (e) => {
//     e.preventDefault();

//     if (height === "" || weight === "" || age === "" || gender === "") {
//       setMessage("Please fill in all fields");
//       return;
//     }

//     const heightInMeters = height / 100;
//     const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
//     setBMI(bmiValue);

//     if (bmiValue < 18.5) {
//       setMessage("You are underweight");
//     } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
//       setMessage("You have a normal weight");
//     } else if (bmiValue >= 25 && bmiValue < 29.9) {
//       setMessage("You are overweight");
//     } else {
//       setMessage("You are obese");
//     }
//   };

//   return (
//     <div className="p-20 h-screen bg-[#F8F5F2]">
//       <div className="grid grid-flow-col grid-cols-2">
//         <div className=" p-6 rounded w-full max-w-md">
//           <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
//           <form onSubmit={calculateBMI}>
//             <div className="mb-4">
//               <label className="block mb-2">Height (cm):</label>
//               <input
//                 type="number"
//                 value={height}
//                 onChange={(e) => setHeight(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Weight (kg):</label>
//               <input
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Age:</label>
//               <input
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Gender:</label>
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 required
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//             >
//               Calculate BMI
//             </button>
//           </form>
//         </div>
//         <div>
//           {bmi && (
//             <div className="mt-4">
//               <h2 className="text-xl font-bold">Your BMI: {bmi}</h2>
//               <p>{message}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bmi;

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
