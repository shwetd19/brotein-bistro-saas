import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Wait = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleUserSubscribedPlanClick = () => {
  //     if (currentUser) {
  //       navigate(`/user-subscribed-plan/${currentUser._id}`);
  //     }
  //   };
  return (
    <div className="flex flex-col justify-center items-center p-20 bg-login h-screen ">
      <div className=" flex flex-col justify-center items-center border p-5 rounded-xl backdrop-blur-2xl shadow-md w-fit ">
        <h1 className="text-center p-3 text-4xl capitalize">
          Hang on a sec... <br />
          admin will approve your request soon.
        </h1>
        <p className="capitalize">sign in again after approval.</p>
        <button
          onClick={handleSignOut}
          className="rounded-full font-semibold py-2 px-4 md:mr-5 lg:mr-5 sm:mr-1 border-black border shadow-md"
        >
          Sign In Again
        </button>
      </div>
    </div>
  );
};

export default Wait;
