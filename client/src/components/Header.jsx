import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleUserProfileClick = () => {
    if (currentUser) {
      navigate(`/user-profile/${currentUser._id}`);
    }
  };

  const handleUserSubscribedPlanClick = () => {
    if (currentUser) {
      navigate(`/user-subscribed-plan/${currentUser._id}`);
    }
  };

  return (
    <div className="w-screen max-h-20 backdrop-blur-md shadow-md fixed grid grid-flow-col z-20">
      <div className="flex justify-start items-center">
        <Link to="/">
          <img src="logo.png" alt="logo" className="h-14 max-h-16 m-1" />
        </Link>
      </div>
      <div className="flex justify-end">
        <ul className="flex justify-end items-center lg:mx-5 md:mx-5 sm:mx-3">
          {/* <Link
            to="/"
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
          >
            Home
          </Link> */}

          <Link
            to="/subscriptionse-requests"
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
          >
            Subscriptions Requests
          </Link>
          <button
            onClick={handleUserSubscribedPlanClick}
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
          >
            Dashboard
          </button>
          <Link
            to="/feedback-from"
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
          >
            Feedback From
          </Link>
          {/* <Link
            to="/meal-records"
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
          >
            Meal Records
          </Link> */}
          {/* <Link
            to="/get-your-meal"
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
          >
            Get Your Meal
          </Link> */}

          <button
            onClick={handleUserProfileClick}
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
          >
            User Profile
          </button>
          <Link
            className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
            to="/profile"
          >
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
