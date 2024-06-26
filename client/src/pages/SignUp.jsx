import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("https://brotein-bistro-01am.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-login bg-[#f8f5f2] ">
      <div className="text-center border p-5 rounded-xl backdrop-blur-2xl shadow-lg lg:w-1/3 md:w-1/3">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="w-full p-2 bg-slate-100 border  border-gray-300 shadow-sm rounded-md mt-1"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full p-2 bg-slate-100 border  border-gray-300 shadow-sm rounded-md mt-1"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full p-2 bg-slate-100 border  border-gray-300 shadow-sm rounded-md mt-1"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="w-full p-2 border border-gray-300 shadow-sm rounded-md mt-1  px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      </div>
    </div>
  );
}
