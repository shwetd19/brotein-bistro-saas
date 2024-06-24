// pages/SignIn.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { checkActiveSubscription } from "../redux/actions";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data)); // Dispatch signInSuccess with user data

      // Check for active subscription and update user
      const updatedUser = await dispatch(checkActiveSubscription(data._id));

      // Redirect based on user role and subscription status
      if (updatedUser.isAdmin) {
        navigate("/subscriptionse-requests");
      } else if (updatedUser.isActiveSubscriber) {
        navigate(`/user-subscribed-plan/${updatedUser._id}`);
      } else {
        navigate("/questionnaire");
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAdmin) {
        navigate("/subscriptionse-requests");
      } else if (currentUser.isActiveSubscriber) {
        navigate(`/user-subscribed-plan/${currentUser._id}`);
      } else {
        navigate("/questionnaire");
      }
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-login pt-10 bg-[#f8f5f2]">
      <div className="text-center  border p-5 rounded-xl backdrop-blur-2xl shadow-lg lg:w-1/3 md:w-1/3">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full p-2 bg-slate-100 border border-gray-300 shadow-sm rounded-md mt-1"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full p-2 bg-slate-100 border border-gray-300 shadow-sm rounded-md mt-1"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="w-full p-2 border border-gray-300 shadow-sm rounded-md mt-1 px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't Have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
}
