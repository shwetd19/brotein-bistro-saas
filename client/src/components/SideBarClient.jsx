import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

const SideBarClient = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        setShowText(true);
      }, 300);
      return () => {
        clearTimeout(timeout);
        setShowText(false);
      };
    }
  }, [expanded]);

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-lg bg-[#F6F6F6] p-2 shadow-sm border rounded-lg"
      : "text-lg p-2 m-1";
  };

  const handleUserSubscribedPlanClick = () => {
    if (currentUser) {
      navigate(`/user-subscribed-plan/${currentUser._id}`);
    }
  };
  const handleUserSubscribedPlanClickk = () => {
    if (currentUser) {
      navigate(`/user-profile/${currentUser._id}`);
    }
  };

  return (
    <nav
      className={`md:h-screen lg:h-screen sm:h-min sm:w-full md:w-fit lg:w-fit transition-all duration-300 flex md:flex-col lg:flex-col sm:flex-row sticky  left-0 top-0 p-2  pt-24 rounded-sm shadow-sm border ${
        expanded ? "sm:w-full md:w-56 lg:w-52" : ""
      }`}
    >
      <div
        onClick={() => setExpanded((p) => !p)}
        className="w-8 h-8 p-2 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
      >
        <BsLayoutSidebarInset size={18} fill="#444" />
      </div>
      <ul className="flex md:flex-col lg:flex-col sm:flex-row w-full ">
        <li>
          <button
            // to="/subscriptionse-requests"
            onClick={handleUserSubscribedPlanClick}
            // className="flex"
            className={`${getLinkClasses(
              `/user-subscribed-plan/${currentUser._id}`
            )} flex `}
          >
            <img alt="requests" className="w-6 mr-4" src="/dash.svg" />
            {expanded && showText && <p className="duration-300">Dashboard</p>}
          </button>
        </li>
        <li>
          <Link
            to="/feedback-from"
            className={`${getLinkClasses("/feedback-from")} flex`}
          >
            <img alt="requests" className="w-6 mr-4" src="/feedback.svg" />
            {expanded && showText && <p>Feedback</p>}
          </Link>
        </li>
        <li>
          <Link to="/events" className={`${getLinkClasses("/events")} flex`}>
            <img alt="requests" className="w-6 mr-4" src="/events.svg" />
            {expanded && showText && <p>Events</p>}
          </Link>
        </li>
        <li>
          <Link
            to="/know-more"
            className={`${getLinkClasses("/know-more")} flex`}
          >
            <img alt="requests" className="w-6 mr-4" src="/knowmore.svg" />
            {expanded && showText && <p className="">Know More</p>}
          </Link>
        </li>
        <li>
          <button
            // to="/feedback-responses"
            onClick={handleUserSubscribedPlanClickk}
            // className="flex"
            className={`${getLinkClasses(
              `/user-profile/${currentUser._id}`
            )} flex `}
            // className={`${getLinkClasses("/feedback-responses")} flex`}
          >
            <img alt="requests" className="w-6 mr-4" src="/user.svg" />
            {expanded && showText && <p>user details</p>}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SideBarClient;
