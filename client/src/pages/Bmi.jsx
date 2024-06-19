// Bmi.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bmi = () => {
  // const [name, setName] = useState("Guest");
  const [weight, setWeight] = useState(90);
  const [height, setHeight] = useState(180);
  const [bmi, setBMI] = useState(27);
  const [message, setMessage] = useState("");
  const [optimalWeight, setOptimalWeight] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const navigate = useNavigate();

  const heightChange = (e) => {
    setHeight(e.target.value);
  };

  const weightChange = (e) => {
    setWeight(e.target.value);
  };

  const calculateBMI = () => {
    const heightSquared = ((height / 100) * height) / 100;
    const bmiValue = weight / heightSquared;
    const low = Math.round(18.5 * heightSquared);
    const high = Math.round(24.99 * heightSquared);
    let messageText = "";
    if (bmiValue >= 18.5 && bmiValue <= 24.99) {
      messageText = "You are in a healthy weight range";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      messageText = "You are overweight";
    } else if (bmiValue >= 30) {
      messageText = "You are obese";
    } else if (bmiValue < 18.5) {
      messageText = "You are under weight";
    }
    setMessage(messageText);
    setOptimalWeight(`Your suggested weight range is between ${low} - ${high}`);
    setBMI(Math.round(bmiValue * 100) / 100);
  };

  const submitForm = (e) => {
    e.preventDefault();
    calculateBMI();
    navigate("/plans", { state: { bmi, message, optimalWeight } });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-login ">
      <div className=" backdrop-blur-3xl shadow-lg p-6 rounded-2xl lg:w-1/3 md:w-1/3">
        <h2 className="text-3xl text-center font-bold mb-4">BMI Calculator</h2>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label className="block mb-2">Enter your height in cm:</label>
            <input
              type="text"
              name="height"
              value={height}
              onBlur={calculateBMI}
              onChange={heightChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-2">Enter your weight in kg:</label>
            <input
              type="text"
              name="weight"
              value={weight}
              onChange={weightChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="text-center">
            <label className="block mb-2">Your BMI is {bmi}</label>
            <label className="block mb-2">{message}</label>
            <label className="block mb-2">{optimalWeight}</label>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bmi;
