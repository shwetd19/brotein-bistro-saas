import { Link, useLocation } from "react-router-dom";
import { BsLayoutSidebarInset } from "react-icons/bs";

import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [showText, setShowText] = useState(true);

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

  return (
    <nav
      className={`md:h-screen lg:h-screen sm:h-min sm:w-full md:w-fit lg:w-fit transition-all duration-300 flex md:flex-col lg:flex-col sm:flex-row sticky  left-0 top-0 p-2  pt-24 rounded-sm shadow-md border ${
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
          <Link
            to="/subscriptionse-requests"
            className={`${getLinkClasses("/subscriptionse-requests")} flex `}
          >
            <img alt="requests" className="w-6 mr-4" src="request.svg" />
            {expanded && showText && <p className="duration-300">Requests</p>}
          </Link>
        </li>
        <li>
          <Link
            to="/active-subscriptions"
            className={`${getLinkClasses("/active-subscriptions")} flex`}
          >
            <img alt="requests" className="w-6 mr-4" src="active.svg" />
            {expanded && showText && <p>Active</p>}
          </Link>
        </li>
        <li>
          <Link
            to="/meal-records"
            className={`${getLinkClasses("/meal-records")} flex`}
          >
            <img alt="requests" className="w-6 mr-4" src="records.svg" />
            {expanded && showText && <p>Records</p>}
          </Link>
        </li>
        <li>
          <Link
            to="/upload-add"
            className={`${getLinkClasses("/upload-add")} flex`}
          >
            <img alt="requests" className="w-6 mr-4" src="records.svg" />
            {expanded && showText && <p className="">Upload Add</p>}
          </Link>
        </li>
        <li>
          <Link
            to="/feedback-responses"
            className={`${getLinkClasses("/feedback-responses")} flex`}
          >
            <img alt="requests" className="w-6 mr-4" src="active.svg" />
            {expanded && showText && <p>feedback</p>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
