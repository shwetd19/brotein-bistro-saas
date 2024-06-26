// HeroSection.jsx
// import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#e6dada] to-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-between">
          <div className="lg:w-2/3 mb-10 lg:mb-0 ">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Simplify Your Meal Plans with Our SaaS Platform
            </h1>
            <p className="text-xl mb-6">
              Manage your meal subscriptions effortlessly, keep track of meals,
              and never worry about running out of days or meals. Our platform
              provides real-time updates and easy access to all your
              subscription details.
            </p>
            <a
              href="/sign-up"
              className="bg-white  font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
            >
              Sign Up Now
            </a>
          </div>
          {/* <div className="lg:w-1/2">
            <img
              src="/logo.png"
              alt="Hero"
              className="w- rounded-lg shadow-lg"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

// Add this component to your main component file (e.g., App.js or MainPage.js)
// import React from 'react';
// import HeroSection from './HeroSection';
// import SubscribedPlan from './SubscribedPlan';

// const MainPage = () => {
//   return (
//     <div>
//       <HeroSection />
//       <SubscribedPlan />
//     </div>
//   );
// };

// export default MainPage;
