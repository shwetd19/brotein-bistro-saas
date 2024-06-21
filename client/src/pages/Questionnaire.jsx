import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is your Goal?",
    options: [
      { text: "Loose Weight", image: "/public/lose-weight.svg" },
      { text: "Healthy Eating", image: "/public/healthy.svg" },
      { text: "Gain Muscle", image: "/public/muscle.svg" },
      { text: "Gain Weight", image: "/public/gain-w.svg" },
    ],
  },
  // {
  //   question: "what is your gender?",
  //   options: [
  //     { text: "male", image: "https://via.placeholder.com/50" },
  //     { text: "female", image: "https://via.placeholder.com/50" },
  //     //   { text: "30", image: "https://via.placeholder.com/50" },
  //     //   { text: "40", image: "https://via.placeholder.com/50" },
  //   ],
  // },
  {
    question: "diet type?",
    options: [
      { text: "nutritional", image: "/public/nutrition.svg" },
      { text: "ketogenic", image: "/public/keto.svg" },
      { text: "balanced", image: "/public/balanced.svg" },
      { text: "vegan", image: "/public/vegan.svg" },
    ],
  },
  // {
  //   question: "food type?",
  //   options: [
  //     { text: "veg", image: "https://via.placeholder.com/50" },
  //     { text: "nonveg", image: "https://via.placeholder.com/50" },
  //     { text: "eggs", image: "https://via.placeholder.com/50" },
  //     //   { text: "Gaming", image: "https://via.placeholder.com/50" },
  //   ],
  // },
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
    } else {
      // alert("This is best fit plan for you !");
      navigate("/bmi");
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-login pt-10 bg-[#f8f5f2] ">
      <div className="text-center glass  shadow-lg p-3 rounded-xl lg:w-1/3 md:w-1/3">
        {/* <div className="text-center p-6 rounded-2xl bg-white lg:w-1/3 md:w-1/3 "> */}
        <h1 className="text-3xl font-semibold mb-4">Get Personalized Plan</h1>
        <div>
          <p className="mb-4 text-lg">{questions[currentQuestion].question}</p>
          <div className="grid grid-cols-2 gap-2 mb-4 ">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className="mb-2 flex flex-col items-center cursor-pointer "
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option.text}
                  checked={answers[currentQuestion] === option.text}
                  onChange={() => handleAnswerChange(option.text)}
                  className="hidden "
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
