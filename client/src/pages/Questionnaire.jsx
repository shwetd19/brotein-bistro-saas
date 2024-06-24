// src/components/Questionnaire.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is your Goal?",
    options: [
      { text: "Loose Weight", image: "/lose-weight.svg" },
      { text: "Healthy Eating", image: "/healthy.svg" },
      { text: "Gain Muscle", image: "/muscle.svg" },
      { text: "Gain Weight", image: "/gain-w.svg" },
    ],
  },
  {
    question: "diet type?",
    options: [
      { text: "nutritional", image: "/nutrition.svg" },
      { text: "ketogenic", image: "/keto.svg" },
      { text: "balanced", image: "/balanced.svg" },
      { text: "vegan", image: "/vegan.svg" },
    ],
  },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const navigate = useNavigate();

  const handleAnswerChange = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-login pt-10 bg-[#f8f5f2]">
      <div className="text-center border p-5 rounded-xl backdrop-blur-2xl shadow-lg lg:w-1/3 md:w-1/3">
        <h1 className="text-3xl font-semibold mb-4">Get Personalized Plan</h1>
        <div>
          <p className="mb-4 text-lg">{questions[currentQuestion].question}</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className="mb-2 flex flex-col items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option.text}
                  checked={answers[currentQuestion] === option.text}
                  onChange={() => handleAnswerChange(option.text)}
                  className="hidden"
                />
                <div
                  className={`border rounded-lg p-2 w-full flex flex-col items-center ${
                    answers[currentQuestion] === option.text
                      ? "bg-blue-100 border-blue-500"
                      : ""
                  }`}
                >
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.text}
                      className="w-20 h-20 mb-2"
                    />
                  )}
                  <span>{option.text}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="button text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() =>
                currentQuestion < questions.length - 1
                  ? setCurrentQuestion(currentQuestion + 1)
                  : navigate("/bmi")
              }
              className="button bg-blue-500 text-white px-4 py-2 rounded"
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
